'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
// import { zodResolver } from '@hookform/resolvers/zod';
import { WaitlistFormSchema, type WaitlistFormData, transformForDatabase } from '@/lib/validations/waitlist';

export type FormStep = 'basic' | 'company' | 'interests';

interface UseWaitlistFormReturn {
  // Form state
  form: ReturnType<typeof useForm<WaitlistFormData>>;
  currentStep: FormStep;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;

  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: FormStep) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastStep: boolean;

  // Form actions
  handleSubmit: () => Promise<void>;
  resetForm: () => void;

  // Progress
  stepProgress: number;
  stepTitles: Record<FormStep, string>;
}

const STEP_ORDER: FormStep[] = ['basic', 'company', 'interests'];

const STEP_TITLES: Record<FormStep, string> = {
  basic: 'Información Personal',
  company: 'Información de Empresa',
  interests: 'Intereses y Necesidades'
};

// Fields required for each step
const STEP_FIELDS: Record<FormStep, (keyof WaitlistFormData)[]> = {
  basic: ['fullName', 'email', 'country'],
  company: ['companyName', 'companySize', 'industryId'],
  interests: ['chatbotType', 'expectedVolume']
};

export function useWaitlistForm(): UseWaitlistFormReturn {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<WaitlistFormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      country: '',
      companyName: '',
      companySize: 'small',
      chatbotType: 'customer_support',
      expectedVolume: 'medium',
      industryId: '',
      phone: '',
      website: '',
      comments: ''
    }
  });

  // Navigation helpers
  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const canGoNext = currentStepIndex < STEP_ORDER.length - 1;
  const canGoPrev = currentStepIndex > 0;
  const isLastStep = currentStepIndex === STEP_ORDER.length - 1;

  // Progress calculation
  const stepProgress = ((currentStepIndex + 1) / STEP_ORDER.length) * 100;

  // Simple validation - this was causing issues
  // const validateCurrentStep = async (): Promise<boolean> => {
  //   // Will be used by nextStep function directly
  //   return true;
  // };

  // Navigation functions
  const nextStep = async () => {
    // Simplified validation - just check if required fields have values
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const currentValues = form.getValues();
    
    let hasEmptyFields = false;
    
    for (const field of fieldsToValidate) {
      const value = currentValues[field];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        form.setError(field, { 
          type: 'required',
          message: 'Este campo es requerido' 
        });
        hasEmptyFields = true;
      } else {
        form.clearErrors(field);
      }
    }
    
    if (hasEmptyFields) {
      // Show toast for step validation errors
      const stepNames: Record<FormStep, string> = {
        basic: 'información personal',
        company: 'información de empresa', 
        interests: 'intereses y necesidades'
      };
      
      toast.error('Campos requeridos', {
        description: `Por favor, completa todos los campos de ${stepNames[currentStep]}`,
        duration: 4000,
      });
      
      return;
    }

    if (canGoNext) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStep(STEP_ORDER[nextIndex]);
      
      // Track analytics for step completion
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (command: string, eventName: string, params?: Record<string, unknown>) => void }).gtag;
        gtag('event', 'form_step_completed', {
          step_name: currentStep,
          step_number: currentStepIndex + 1
        });
      }
    }
  };

  const prevStep = () => {
    if (canGoPrev) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStep(STEP_ORDER[prevIndex]);
    }
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  // Form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Final validation of all fields
      const formData = form.getValues();
      console.log('Form data for validation:', formData);
      console.log('Comments field length:', (formData.comments || '').length);
      
      try {
        WaitlistFormSchema.parse(formData);
      } catch (error) {
        console.error('Validation error:', error);
        if (error instanceof Error && 'issues' in error) {
          const issues = (error as any).issues;
          console.error('Validation issues:', issues);
          
          // Show specific validation errors via toast
          const firstIssue = issues[0];
          if (firstIssue) {
            const fieldLabels: Record<string, string> = {
              fullName: 'Nombre completo',
              email: 'Correo electrónico',
              country: 'País',
              companyName: 'Nombre de la empresa',
              companySize: 'Tamaño de la empresa',
              chatbotType: 'Tipo de chatbot',
              expectedVolume: 'Volumen esperado',
              industryId: 'Industria',
              comments: 'Comentarios'
            };
            
            const fieldName = fieldLabels[firstIssue.path[0]] || firstIssue.path[0];
            toast.error(`Error en ${fieldName}`, {
              description: firstIssue.message,
              duration: 5000,
            });
          } else {
            toast.error('Error de validación', {
              description: 'Por favor, revisa todos los campos requeridos',
              duration: 5000,
            });
          }
        }
        setSubmitError('Por favor, revisa todos los campos requeridos');
        return;
      }
      
      // Transform data for API
      const apiData = transformForDatabase(formData, {
        // Add UTM and tracking data if available
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
        referralSource: document.referrer || undefined
      });

      console.log('Form data before transform:', formData);
      console.log('API data after transform:', apiData);

      // Submit to API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      console.log('API response:', { status: response.status, result });

      if (!response.ok) {
        const errorMessage = result.message || 'Error al enviar el formulario';
        
        // Show specific error messages via toast
        if (response.status === 400) {
          if (result.code === 'EMAIL_EXISTS') {
            toast.error('Email ya registrado', {
              description: 'Este email ya está en nuestra lista de espera',
              duration: 6000,
            });
          } else if (result.code === 'VALIDATION_ERROR') {
            toast.error('Datos inválidos', {
              description: 'Por favor, revisa la información ingresada',
              duration: 5000,
            });
          } else {
            toast.error('Error de validación', {
              description: errorMessage,
              duration: 5000,
            });
          }
        } else if (response.status === 429) {
          toast.error('Demasiadas solicitudes', {
            description: 'Has excedido el límite. Intenta de nuevo más tarde',
            duration: 8000,
          });
        } else if (response.status >= 500) {
          toast.error('Error del servidor', {
            description: 'Problema temporal en nuestros servidores. Intenta de nuevo',
            duration: 6000,
          });
        } else {
          toast.error('Error inesperado', {
            description: errorMessage,
            duration: 5000,
          });
        }
        
        throw new Error(errorMessage);
      }

      // Success
      setSubmitSuccess(true);
      
      // Show success toast
      toast.success('¡Registro exitoso!', {
        description: 'Te contactaremos pronto. Revisa tu email para más información.',
        duration: 8000,
      });
      
      // Track analytics for form completion
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (command: string, eventName: string, params?: Record<string, unknown>) => void }).gtag;
        gtag('event', 'form_submitted', {
          form_name: 'waitlist',
          company_size: formData.companySize,
          chatbot_type: formData.chatbotType,
          country: formData.country
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error inesperado. Inténtalo de nuevo.';
      
      // Show error toast for unexpected errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error('Error de conexión', {
          description: 'Verifica tu conexión a internet e intenta de nuevo',
          duration: 6000,
        });
      } else if (!error instanceof Error || !error.message.includes('servidor')) {
        // Don't show toast for server errors (already handled above)
        toast.error('Error inesperado', {
          description: errorMessage,
          duration: 5000,
        });
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    form.reset();
    setCurrentStep('basic');
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  return {
    form,
    currentStep,
    isSubmitting,
    submitSuccess,
    submitError,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isLastStep,
    handleSubmit,
    resetForm,
    stepProgress,
    stepTitles: STEP_TITLES
  };
}

