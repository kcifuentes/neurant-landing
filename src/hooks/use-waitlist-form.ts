'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  // Validate current step fields
  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const currentValues = form.getValues();
    
    // Crear un objeto con solo los campos del step actual
    const stepData = fieldsToValidate.reduce((acc, field) => {
      acc[field] = currentValues[field];
      return acc;
    }, {} as Partial<WaitlistFormData>);
    
    try {
      // Validar solo los campos necesarios del step actual
      WaitlistFormSchema.pick(
        fieldsToValidate.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {} as Record<keyof WaitlistFormData, true>)
      ).parse(stepData);
      
      // Si la validación pasa, limpiar errores
      fieldsToValidate.forEach(field => {
        form.clearErrors(field);
      });
      
      return true;
    } catch (error) {
      // Establecer errores en el formulario
      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        zodError.errors.forEach((err) => {
          const field = err.path[0] as keyof WaitlistFormData;
          if (fieldsToValidate.includes(field)) {
            form.setError(field, { message: err.message });
          }
        });
      }
      return false;
    }
  };

  // Navigation functions
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

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
      try {
        WaitlistFormSchema.parse(formData);
      } catch (error) {
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

      // Submit to API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el formulario');
      }

      // Success
      setSubmitSuccess(true);
      
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
      setSubmitError(error instanceof Error ? error.message : 'Error inesperado. Inténtalo de nuevo.');
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

