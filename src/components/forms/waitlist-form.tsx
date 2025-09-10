'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWaitlistForm, type FormStep } from '@/hooks/use-waitlist-form';
import { BasicInfoStep } from './steps/basic-info-step';
import { CompanyInfoStep } from './steps/company-info-step';
import { InterestsStep } from './steps/interests-step';
import { SuccessStep } from './steps/success-step';

interface WaitlistFormProps {
  className?: string;
  onSuccess?: () => void;
}

interface StepComponentProps {
  form: ReturnType<typeof useWaitlistForm>['form'];
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

const STEP_COMPONENTS: Record<FormStep, React.ComponentType<StepComponentProps>> = {
  basic: BasicInfoStep,
  company: CompanyInfoStep,
  interests: InterestsStep
};

export function WaitlistForm({ className, onSuccess }: WaitlistFormProps) {
  const {
    form,
    currentStep,
    isSubmitting,
    submitSuccess,
    submitError,
    nextStep,
    prevStep,
    canGoPrev,
    isLastStep,
    handleSubmit,
    resetForm,
    stepProgress,
    stepTitles
  } = useWaitlistForm();

  // Auto-format phone number as user types
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
    const subscription = form.watch((value) => {
      const phone = value.phone;
      if (phone) {
        // Simple phone formatting for international numbers
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 0) {
          setFormattedPhone('');
        } else if (cleaned.length <= 3) {
          setFormattedPhone(`+${cleaned}`);
        } else {
          setFormattedPhone(`+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle successful submission
  useEffect(() => {
    if (submitSuccess && onSuccess) {
      onSuccess();
    }
  }, [submitSuccess, onSuccess]);

  if (submitSuccess) {
    return <SuccessStep onReset={resetForm} />;
  }

  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className={className}>
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Únete a la Lista de Espera
            </CardTitle>
            <CardDescription className="text-base">
              Sé de los primeros en experimentar el futuro de la atención al cliente con IA
            </CardDescription>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Paso {['basic', 'company', 'interests'].indexOf(currentStep) + 1} de 3</span>
              <span>{Math.round(stepProgress)}% completado</span>
            </div>
            <Progress 
              value={stepProgress} 
              className="h-2"
            />
          </div>

          {/* Step indicator */}
          <div className="flex justify-center space-x-4">
            {(['basic', 'company', 'interests'] as FormStep[]).map((step, index) => {
              const isActive = step === currentStep;
              const isCompleted = ['basic', 'company', 'interests'].indexOf(currentStep) > index;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  {index < 2 && (
                    <div className={`
                      w-8 h-0.5 mx-2 transition-colors
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="font-semibold text-lg">{stepTitles[currentStep]}</h3>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{submitError}</span>
            </motion.div>
          )}

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepComponent 
                form={form} 
                formattedPhone={formattedPhone}
                setFormattedPhone={setFormattedPhone}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={!canGoPrev || isSubmitting}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            {isLastStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Completar Registro</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <span>Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground text-center pt-4 border-t">
            Al enviar este formulario, aceptas que podemos contactarte sobre NeurAnt. 
            Puedes cancelar la suscripción en cualquier momento. 
            <br />
            Consulta nuestra política de privacidad para más información.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}