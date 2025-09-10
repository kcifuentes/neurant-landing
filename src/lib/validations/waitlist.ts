import { z } from 'zod';

// Enums for company size options
export const CompanySize = {
  STARTUP: 'startup',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ENTERPRISE: 'enterprise'
} as const;

// Enums for chatbot type options
export const ChatbotType = {
  CUSTOMER_SUPPORT: 'customer_support',
  SALES: 'sales',
  LEAD_GENERATION: 'lead_generation',
  FAQ: 'faq',
  BOOKING: 'booking',
  ECOMMERCE: 'ecommerce',
  OTHER: 'other'
} as const;

// Enums for expected volume options
export const ExpectedVolume = {
  LOW: 'low',        // < 100 mensajes/mes
  MEDIUM: 'medium',  // 100-1000 mensajes/mes
  HIGH: 'high',      // 1000-10000 mensajes/mes
  VERY_HIGH: 'very_high' // > 10000 mensajes/mes
} as const;

// Regex for email validation (more comprehensive)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex for international phone validation (optional format: +1234567890)
const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;

// Main waitlist registration schema
export const WaitlistRegistrationSchema = z.object({
  // Full name validation
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/, 'El nombre solo puede contener letras y espacios'),

  // Email validation with regex and lowercase transformation
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(100, 'El email no puede exceder 100 caracteres')
    .regex(emailRegex, 'Formato de email inválido'),

  // Country code validation (ISO 3166-1 alpha-2)
  country: z
    .string()
    .length(2, 'El código de país debe tener exactamente 2 caracteres')
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, 'Código de país inválido'),

  // Company name validation
  companyName: z
    .string()
    .trim()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres'),

  // Company size enum validation
  companySize: z
    .enum(Object.values(CompanySize) as [string, ...string[]])
    .refine(val => Object.values(CompanySize).includes(val as typeof CompanySize[keyof typeof CompanySize]), {
      message: 'Selecciona un tamaño de empresa válido'
    }),

  // Chatbot type enum validation
  chatbotType: z
    .enum(Object.values(ChatbotType) as [string, ...string[]])
    .refine(val => Object.values(ChatbotType).includes(val as typeof ChatbotType[keyof typeof ChatbotType]), {
      message: 'Selecciona un tipo de chatbot válido'
    }),

  // Expected volume enum validation
  expectedVolume: z
    .enum(Object.values(ExpectedVolume) as [string, ...string[]])
    .refine(val => Object.values(ExpectedVolume).includes(val as typeof ExpectedVolume[keyof typeof ExpectedVolume]), {
      message: 'Selecciona un volumen esperado válido'
    }),

  // Industry ID validation (UUID format)
  industryId: z
    .string()
    .uuid('ID de industria inválido'),

  // Optional phone validation
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Formato de teléfono inválido. Usa formato internacional (+1234567890)')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .optional()
    .or(z.literal('')),

  // Optional website URL validation
  website: z
    .string()
    .trim()
    .url('Formato de URL inválido. Debe incluir http:// o https://')
    .max(200, 'La URL no puede exceder 200 caracteres')
    .optional()
    .or(z.literal('')),

  // Optional comments validation
  comments: z
    .string()
    .trim()
    .max(500, 'Los comentarios no pueden exceder 500 caracteres')
    .optional()
    .or(z.literal('')),

  // Optional UTM parameters for marketing tracking
  utmSource: z
    .string()
    .trim()
    .max(50, 'UTM Source no puede exceder 50 caracteres')
    .optional()
    .or(z.literal('')),

  utmMedium: z
    .string()
    .trim()
    .max(50, 'UTM Medium no puede exceder 50 caracteres')
    .optional()
    .or(z.literal('')),

  utmCampaign: z
    .string()
    .trim()
    .max(50, 'UTM Campaign no puede exceder 50 caracteres')
    .optional()
    .or(z.literal('')),

  // Optional referral source
  referralSource: z
    .string()
    .trim()
    .max(100, 'La fuente de referencia no puede exceder 100 caracteres')
    .optional()
    .or(z.literal('')),
});

// Schema for form validation (without backend-only fields)
export const WaitlistFormSchema = WaitlistRegistrationSchema.pick({
  fullName: true,
  email: true,
  country: true,
  companyName: true,
  companySize: true,
  chatbotType: true,
  expectedVolume: true,
  industryId: true,
  phone: true,
  website: true,
  comments: true,
});

// TypeScript types inferred from Zod schemas
export type WaitlistRegistrationData = z.infer<typeof WaitlistRegistrationSchema>;
export type WaitlistFormData = z.infer<typeof WaitlistFormSchema>;

// Map frontend enum values to API expected values
const mapCompanySize = (size: string): string => {
  const sizeMap: Record<string, string> = {
    'startup': '1-10',
    'small': '11-50',
    'medium': '51-200',
    'large': '201-500',
    'enterprise': '500+'
  };
  return sizeMap[size] || size;
};

const mapExpectedVolume = (volume: string): string => {
  const volumeMap: Record<string, string> = {
    'low': '<100',
    'medium': '100-500',
    'high': '500-1000',
    'very_high': '1000-5000'
  };
  return volumeMap[volume] || volume;
};

const mapChatbotType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'customer_support': 'customer_service',
    'lead_generation': 'lead_generation', 
    'sales': 'sales',
    'faq': 'internal_operations',
    'booking': 'internal_operations', 
    'ecommerce': 'sales',
    'other': 'other'
  };
  return typeMap[type] || 'other';
};

// Transform function to prepare data for database insertion
export const transformForDatabase = (formData: WaitlistFormData, additionalData?: {
  ipAddress?: string;
  userAgent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referralSource?: string;
}) => {
  return {
    // Map field names to API expected format
    full_name: formData.fullName,
    email: formData.email,
    country: formData.country,
    company_name: formData.companyName,
    company_size: mapCompanySize(formData.companySize),
    chatbot_type: mapChatbotType(formData.chatbotType),
    expected_volume: mapExpectedVolume(formData.expectedVolume),
    industry_id: formData.industryId,
    // Convert empty strings to null for optional fields and ensure limits
    phone: formData.phone === '' ? undefined : formData.phone,
    website: formData.website === '' ? undefined : formData.website,
    comments: !formData.comments || formData.comments === '' ? undefined : 
              formData.comments.length > 500 ? formData.comments.substring(0, 500) : formData.comments,
    // Add additional tracking data
    utm_source: additionalData?.utmSource || undefined,
    utm_medium: additionalData?.utmMedium || undefined,
    utm_campaign: additionalData?.utmCampaign || undefined,
    referral_source: additionalData?.referralSource || undefined,
  };
};

// Validation helper function
export const validateWaitlistData = (data: unknown) => {
  try {
    return WaitlistFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Transform Zod errors to user-friendly format
      const fieldErrors = error.issues.reduce((acc: Record<string, string>, err) => {
        const field = err.path.join('.');
        acc[field] = err.message;
        return acc;
      }, {} as Record<string, string>);
      
      return { success: false, errors: fieldErrors };
    }
    throw error;
  }
};

// Constants for UI labels (in Spanish)
export const FIELD_LABELS = {
  fullName: 'Nombre completo',
  email: 'Correo electrónico',
  country: 'País',
  companyName: 'Nombre de la empresa',
  companySize: 'Tamaño de la empresa',
  chatbotType: 'Tipo de chatbot',
  expectedVolume: 'Volumen esperado',
  industryId: 'Industria',
  phone: 'Teléfono',
  website: 'Sitio web',
  comments: 'Comentarios adicionales',
} as const;

// Options for select fields (in Spanish)
export const COMPANY_SIZE_OPTIONS = [
  { value: CompanySize.STARTUP, label: 'Startup (1-10 empleados)' },
  { value: CompanySize.SMALL, label: 'Pequeña (11-50 empleados)' },
  { value: CompanySize.MEDIUM, label: 'Mediana (51-200 empleados)' },
  { value: CompanySize.LARGE, label: 'Grande (201-1000 empleados)' },
  { value: CompanySize.ENTERPRISE, label: 'Empresa (1000+ empleados)' },
] as const;

export const CHATBOT_TYPE_OPTIONS = [
  { value: ChatbotType.CUSTOMER_SUPPORT, label: 'Atención al cliente' },
  { value: ChatbotType.SALES, label: 'Ventas' },
  { value: ChatbotType.LEAD_GENERATION, label: 'Generación de leads' },
  { value: ChatbotType.FAQ, label: 'Preguntas frecuentes' },
  { value: ChatbotType.BOOKING, label: 'Reservas y citas' },
  { value: ChatbotType.ECOMMERCE, label: 'E-commerce' },
  { value: ChatbotType.OTHER, label: 'Otro' },
] as const;

export const EXPECTED_VOLUME_OPTIONS = [
  { value: ExpectedVolume.LOW, label: 'Bajo (menos de 100 mensajes/mes)' },
  { value: ExpectedVolume.MEDIUM, label: 'Medio (100-1,000 mensajes/mes)' },
  { value: ExpectedVolume.HIGH, label: 'Alto (1,000-10,000 mensajes/mes)' },
  { value: ExpectedVolume.VERY_HIGH, label: 'Muy alto (más de 10,000 mensajes/mes)' },
] as const;