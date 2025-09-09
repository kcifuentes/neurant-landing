import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EmailService } from '../../../lib/email-service';

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

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10; // 10 requests per hour for notifications

  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (current.count >= maxRequests) {
    return { 
      allowed: false, 
      retryAfter: Math.ceil((current.resetTime - now) / 1000) 
    };
  }

  current.count++;
  return { allowed: true };
}

// Validation schemas
const testEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Formato de email inválido')
    .max(255, 'Email demasiado largo'),
});

const statusCheckSchema = z.object({
  jobId: z
    .string()
    .min(1, 'Job ID es requerido')
    .regex(/^email_\d+_[a-z0-9]+$/, 'Formato de Job ID inválido'),
});

const manualNotificationSchema = z.object({
  type: z.enum(['welcome', 'internal'], {
    message: 'Tipo debe ser "welcome" o "internal"'
  }),
  userData: z.object({
    email: z.string().email('Email inválido'),
    full_name: z.string().min(1, 'Nombre requerido'),
    company_name: z.string().min(1, 'Empresa requerida'),
    industry: z.string().min(1, 'Industria requerida'),
    company_size: z.string().min(1, 'Tamaño de empresa requerido'),
    country: z.string().min(1, 'País requerido'),
    chatbot_type: z.string().min(1, 'Tipo de chatbot requerido'),
    expected_volume: z.string().min(1, 'Volumen esperado requerido'),
    phone: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    additional_info: z.string().optional(),
  }),
});

// GET: Get email service metrics and status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    // If jobId is provided, return job status
    if (jobId) {
      const validation = statusCheckSchema.safeParse({ jobId });
      
      if (!validation.success) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'VALIDATION_ERROR',
            message: validation.error.issues[0]?.message || 'Job ID inválido',
            details: validation.error.issues 
          },
          { status: 400 }
        );
      }

      const jobStatus = EmailService.getJobStatus(jobId);
      
      if (!jobStatus) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'JOB_NOT_FOUND',
            message: 'Job no encontrado o expirado' 
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        job: {
          id: jobStatus.id,
          status: jobStatus.status,
          attempts: jobStatus.attempts,
          maxAttempts: jobStatus.maxAttempts,
          createdAt: jobStatus.createdAt.toISOString(),
          sentAt: jobStatus.sentAt?.toISOString(),
          error: jobStatus.error
        }
      });
    }

    // Return service metrics
    const metrics = EmailService.getMetrics();
    
    return NextResponse.json({
      success: true,
      metrics: {
        totalSent: metrics.totalSent,
        totalFailed: metrics.totalFailed,
        pending: metrics.pending,
        lastSentAt: metrics.lastSentAt?.toISOString(),
      },
      service: {
        status: 'operational',
        version: '1.0.0',
        uptime: process.uptime()
      }
    });

  } catch (error) {
    console.error('[NotificationsAPI] GET Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'INTERNAL_ERROR',
        message: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}

// POST: Send notifications or test emails
export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();
  
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Límite de requests excedido. Intenta más tarde.',
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429,
          headers: { 'Retry-After': rateLimit.retryAfter?.toString() || '3600' }
        }
      );
    }

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'manual';

    console.log(`[NotificationsAPI] ${requestId} - Processing ${action} action from ${ip}`);

    switch (action) {
      case 'test': {
        const validation = testEmailSchema.safeParse(body);
        
        if (!validation.success) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'VALIDATION_ERROR',
              message: validation.error.issues[0]?.message || 'Datos inválidos',
              details: validation.error.issues 
            },
            { status: 400 }
          );
        }

        const { email } = validation.data;
        const jobId = await EmailService.sendTestEmail(email);

        console.log(`[NotificationsAPI] ${requestId} - Test email queued: ${jobId} for ${email}`);

        return NextResponse.json({
          success: true,
          message: 'Email de prueba enviado a la cola',
          jobId,
          requestId,
          processingTime: Date.now() - startTime
        });
      }

      case 'manual': {
        const validation = manualNotificationSchema.safeParse(body);
        
        if (!validation.success) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'VALIDATION_ERROR',
              message: validation.error.issues[0]?.message || 'Datos inválidos',
              details: validation.error.issues 
            },
            { status: 400 }
          );
        }

        const { type, userData } = validation.data;
        let jobId: string;

        if (type === 'welcome') {
          jobId = await EmailService.sendWelcomeEmail(userData);
          console.log(`[NotificationsAPI] ${requestId} - Welcome email queued: ${jobId}`);
        } else if (type === 'internal') {
          jobId = await EmailService.sendInternalNotification({
            ...userData,
            user_ip: ip,
          });
          console.log(`[NotificationsAPI] ${requestId} - Internal notification queued: ${jobId}`);
        } else {
          return NextResponse.json(
            { 
              success: false, 
              error: 'INVALID_TYPE',
              message: 'Tipo de notificación inválido' 
            },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          message: `Notificación ${type} enviada a la cola`,
          jobId,
          requestId,
          processingTime: Date.now() - startTime
        });
      }

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'INVALID_ACTION',
            message: 'Acción no válida. Use: test, manual' 
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error(`[NotificationsAPI] ${requestId} - POST Error:`, error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'INVALID_JSON',
          message: 'JSON inválido en el body de la request',
          requestId 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'INTERNAL_ERROR',
        message: 'Error interno del servidor',
        requestId,
        processingTime: Date.now() - startTime
      },
      { status: 500 }
    );
  }
}

// PUT: Update notification settings (future feature)
export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'NOT_IMPLEMENTED',
      message: 'Endpoint no implementado aún' 
    },
    { status: 501 }
  );
}

// DELETE: Cancel pending email job
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'MISSING_JOB_ID',
          message: 'Job ID es requerido' 
        },
        { status: 400 }
      );
    }

    const validation = statusCheckSchema.safeParse({ jobId });
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'VALIDATION_ERROR',
          message: validation.error.issues[0]?.message || 'Job ID inválido' 
        },
        { status: 400 }
      );
    }

    const jobStatus = EmailService.getJobStatus(jobId);
    
    if (!jobStatus) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'JOB_NOT_FOUND',
          message: 'Job no encontrado' 
        },
        { status: 404 }
      );
    }

    if (jobStatus.status !== 'pending') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'JOB_NOT_CANCELLABLE',
          message: `Job no se puede cancelar (estado: ${jobStatus.status})` 
        },
        { status: 400 }
      );
    }

    // Note: Actual cancellation logic would be implemented here
    // For now, we just return the status
    return NextResponse.json({
      success: false,
      error: 'NOT_IMPLEMENTED',
      message: 'Cancelación de jobs no implementada aún'
    }, { status: 501 });

  } catch (error) {
    console.error('[NotificationsAPI] DELETE Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'INTERNAL_ERROR',
        message: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
}