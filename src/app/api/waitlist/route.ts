import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { waitlistService } from '../../../lib/supabase';
import { EmailService, emailTemplates } from '../../../lib/email-service';

// Rate limiting store (in-memory, per server instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Validation schema
const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Formato de email inválido')
    .max(255, 'Email demasiado largo')
    .transform(val => val.toLowerCase().trim()),
  full_name: z
    .string()
    .min(1, 'Nombre completo es requerido')
    .max(100, 'Nombre demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/, 'Nombre contiene caracteres no válidos')
    .transform(val => val.trim().replace(/\s+/g, ' ')),
  company_name: z
    .string()
    .min(1, 'Nombre de empresa es requerido')
    .max(100, 'Nombre de empresa demasiado largo')
    .transform(val => val.trim().replace(/\s+/g, ' ')),
  industry_id: z
    .string()
    .min(1, 'ID de industria es requerido')
    .uuid('ID de industria debe ser un UUID válido'),
  country: z
    .string()
    .min(2, 'País es requerido')
    .max(100, 'Nombre de país demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/, 'País contiene caracteres no válidos')
    .transform(val => val.trim()),
  company_size: z
    .enum(['1-10', '11-50', '51-200', '201-1000', '1000+'])
    .refine(val => ['1-10', '11-50', '51-200', '201-1000', '1000+'].includes(val), {
      message: 'Tamaño de empresa no válido'
    }),
  expected_volume: z
    .enum(['<100', '100-500', '500-1000', '1000-5000', '5000+'])
    .refine(val => ['<100', '100-500', '500-1000', '1000-5000', '5000+'].includes(val), {
      message: 'Volumen esperado no válido'
    }),
  chatbot_type: z
    .enum(['customer_service', 'sales', 'lead_generation', 'internal_operations', 'other'])
    .refine(val => ['customer_service', 'sales', 'lead_generation', 'internal_operations', 'other'].includes(val), {
      message: 'Tipo de chatbot no válido'
    }),
  phone: z
    .string()
    .max(20, 'Teléfono demasiado largo')
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),
  website: z
    .string()
    .max(255, 'Website demasiado largo')
    .optional()
    .nullable()
    .transform(val => val?.trim() || null),
  comments: z
    .string()
    .max(500, 'Comentarios demasiado largos')
    .optional()
    .nullable()
    .transform(val => val?.trim() || null)
});

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    // New window or expired window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

// Sanitize and log request
function sanitizeForLogging(data: Record<string, unknown>) {
  return {
    ...data,
    email: typeof data.email === 'string' ? data.email.replace(/(.{2}).*(@.*)/, '$1***$2') : data.email, // Partially mask email for logging
    full_name: typeof data.full_name === 'string' ? data.full_name.replace(/^(\S+).*/, '$1***') : data.full_name, // Partially mask name for logging
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let clientIP = '';
  let requestId = '';

  try {
    // Generate request ID for tracking
    requestId = `waitlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get client IP for rate limiting
    clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
              request.headers.get('x-real-ip') ||
              'unknown';

    console.log(`[${requestId}] Waitlist registration attempt from IP: ${clientIP}`);

    // Rate limiting check
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      const resetTimeString = rateLimitResult.resetTime 
        ? new Date(rateLimitResult.resetTime).toISOString()
        : 'unknown';
      
      console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}, reset time: ${resetTimeString}`);
      
      return NextResponse.json(
        { 
          error: 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.',
          code: 'RATE_LIMIT_EXCEEDED',
          resetTime: rateLimitResult.resetTime
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.resetTime 
              ? Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
              : '3600'
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error(`[${requestId}] Invalid JSON in request body:`, error);
      return NextResponse.json(
        { 
          error: 'Formato de datos inválido',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    const validationResult = waitlistSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      console.warn(`[${requestId}] Validation failed:`, { 
        errors,
        body: sanitizeForLogging(body)
      });
      
      return NextResponse.json(
        { 
          error: 'Datos de entrada inválidos',
          code: 'VALIDATION_ERROR',
          details: errors
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;
    console.log(`[${requestId}] Data validated successfully:`, sanitizeForLogging(validData));

    // Check if email already exists
    const emailCheckResult = await waitlistService.checkEmailExists(validData.email);
    if (emailCheckResult.error) {
      console.error(`[${requestId}] Error checking email existence:`, emailCheckResult.error);
      return NextResponse.json(
        { 
          error: 'Error interno del servidor',
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

    if (emailCheckResult.exists) {
      console.warn(`[${requestId}] Email already exists: ${sanitizeForLogging({ email: validData.email }).email}`);
      return NextResponse.json(
        { 
          error: 'Este email ya está registrado en nuestra lista de espera',
          code: 'EMAIL_EXISTS'
        },
        { status: 400 }
      );
    }

    // Prepare data for database insertion
    const dbData = {
      ...validData,
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || null,
      // Ensure optional fields are properly handled
      phone: validData.phone || null,
      website: validData.website || null,
      comments: validData.comments || null
    };

    console.log(`[${requestId}] Database data prepared:`, {
      ...sanitizeForLogging(dbData),
      hasPhone: !!dbData.phone,
      hasWebsite: !!dbData.website,
      hasComments: !!dbData.comments
    });

    // Add to waitlist
    const insertResult = await waitlistService.addEntry(dbData);
    if (insertResult.error || !insertResult.data) {
      console.error(`[${requestId}] Error adding entry to waitlist:`, insertResult.error);
      return NextResponse.json(
        { 
          error: 'Error al procesar tu registro. Por favor intenta de nuevo.',
          code: 'DATABASE_INSERT_ERROR'
        },
        { status: 500 }
      );
    }

    const processingTime = Date.now() - startTime;
    
    // Log successful registration
    console.log(`[${requestId}] Waitlist registration successful:`, {
      id: insertResult.data.id,
      email: sanitizeForLogging(validData).email,
      company: validData.company_name,
      country: validData.country,
      industry_id: validData.industry_id,
      processing_time_ms: processingTime,
      ip: clientIP,
      user_agent: request.headers.get('user-agent')?.substring(0, 100)
    });

    // Send email notifications (async, non-blocking)
    // Note: We don't await these to avoid blocking the response
    try {
      // Get industry name for email
      const { industriesService } = await import('../../../lib/supabase');
      const industriesResult = await industriesService.getActiveIndustries();
      
      let industryName = 'No especificada';
      if (industriesResult.data && !industriesResult.error) {
        const industry = industriesResult.data.find(ind => ind.id === validData.industry_id);
        industryName = industry?.name || 'No especificada';
      }

      // Map values to user-friendly text
      const companySizeMap: Record<string, string> = {
        '1-10': 'Startup (1-10 empleados)',
        '11-50': 'Pequeña (11-50 empleados)',
        '51-200': 'Mediana (51-200 empleados)',
        '201-1000': 'Grande (201-1000 empleados)',
        '1000+': 'Empresa (1000+ empleados)'
      };

      const chatbotTypeMap: Record<string, string> = {
        'customer_service': 'Atención al cliente',
        'sales': 'Ventas',
        'lead_generation': 'Generación de leads',
        'internal_operations': 'Operaciones internas',
        'other': 'Otro'
      };

      const expectedVolumeMap: Record<string, string> = {
        '<100': 'Bajo (menos de 100 mensajes/mes)',
        '100-500': 'Medio (100-500 mensajes/mes)',
        '500-1000': 'Alto (500-1,000 mensajes/mes)',
        '1000-5000': 'Muy alto (1,000-5,000 mensajes/mes)',
        '5000+': 'Extremo (más de 5,000 mensajes/mes)'
      };

      // Prepare email data with proper handling of optional fields
      const emailData = {
        ...validData,
        industry: industryName,
        company_size: companySizeMap[validData.company_size] || validData.company_size,
        chatbot_type: chatbotTypeMap[validData.chatbot_type] || validData.chatbot_type,
        expected_volume: expectedVolumeMap[validData.expected_volume] || validData.expected_volume,
        // Ensure optional fields have proper values
        phone: validData.phone || 'No proporcionado',
        website: validData.website || 'No proporcionado',
        comments: validData.comments || 'Sin comentarios adicionales',
        user_ip: clientIP,
        created_at: insertResult.data.created_at
      };

      console.log(`[${requestId}] Email data prepared:`, {
        ...emailData,
        email: emailData.email.replace(/(.{2}).*(@.*)/, '$1***$2') // Mask email for logging
      });

      // Send emails directly via Resend (serverless-friendly)
      console.log(`[${requestId}] Sending emails directly via Resend...`);
      
      // Send welcome email directly
      await EmailService.sendDirectEmail(
        emailData.email,
        emailTemplates.welcomeUser,
        emailData
      );
      console.log(`[${requestId}] Welcome email sent directly to ${emailData.email}`);

      // Send internal notification directly  
      const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'innovarting.info@gmail.com';
      await EmailService.sendDirectEmail(
        internalEmail,
        emailTemplates.internalNotification,
        {
          ...emailData,
          created_at: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      );
      console.log(`[${requestId}] Internal notification sent directly to ${internalEmail}`);

    } catch (emailError) {
      // Log email errors but don't fail the registration
      console.error(`[${requestId}] Email notification error (non-blocking):`, {
        error: emailError instanceof Error ? emailError.message : 'Unknown email error',
        stack: emailError instanceof Error ? emailError.stack : undefined
      });
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: '¡Registro exitoso! Te contactaremos pronto.',
        data: {
          id: insertResult.data.id,
          email: validData.email,
          created_at: insertResult.data.created_at
        }
      },
      { status: 200 }
    );

  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error(`[${requestId}] Unexpected error in waitlist registration:`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      processing_time_ms: processingTime,
      ip: clientIP
    });

    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido', code: 'METHOD_NOT_ALLOWED' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Método no permitido', code: 'METHOD_NOT_ALLOWED' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Método no permitido', code: 'METHOD_NOT_ALLOWED' },
    { status: 405 }
  );
}