'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 relative overflow-hidden">
            {/* Premium Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-400/30 rounded-full pointer-events-none"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + i * 8}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            
        <CardHeader className="text-center space-y-6 relative">
          {/* Premium Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-t-lg pointer-events-none" />
          <motion.div 
            className="absolute top-0 left-1/4 w-32 h-32 bg-orange-400/20 rounded-full blur-xl pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-24 h-24 bg-red-400/20 rounded-full blur-lg pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
          />
          
          <div className="relative space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Únete a la Lista de Espera
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <CardDescription className="text-lg text-slate-300">
                Sé de los primeros en experimentar el futuro de la atención al cliente con IA
              </CardDescription>
            </motion.div>
          </div>

          {/* Premium Progress Bar */}
          <motion.div 
            className="relative space-y-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex justify-between text-sm text-slate-400">
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Paso {['basic', 'company', 'interests'].indexOf(currentStep) + 1} de 3
              </motion.span>
              <motion.span 
                className="text-orange-400 font-semibold"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                key={stepProgress}
              >
                {Math.round(stepProgress)}% completado
              </motion.span>
            </div>
            <div className="relative">
              <div className="w-full bg-slate-700/50 rounded-full h-3 shadow-inner overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full shadow-lg relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${stepProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={stepProgress}
                >
                  <motion.div 
                    className="h-full w-full bg-gradient-to-r from-orange-300/50 to-red-400/50 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full bg-white/20 rounded-full"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Premium Step Indicators */}
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            {(['basic', 'company', 'interests'] as FormStep[]).map((step, index) => {
              const isActive = step === currentStep;
              const isCompleted = ['basic', 'company', 'interests'].indexOf(currentStep) > index;
              
              return (
                <motion.div 
                  key={step} 
                  className="flex items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-400/50' 
                      : isActive 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-orange-400/50 scale-110' 
                        : 'bg-slate-700 text-slate-400 shadow-slate-700/50'
                    }
                  `}>
                    {isCompleted ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-lg"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 animate-ping opacity-20" />
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`
                      w-12 h-1 mx-3 rounded-full transition-all duration-500
                      ${isCompleted 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-md shadow-green-400/25' 
                        : 'bg-slate-700'
                      }
                    `} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.h3 
            className="relative text-2xl font-bold text-white tracking-wide"
            key={currentStep}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            {stepTitles[currentStep]}
          </motion.h3>
        </CardHeader>

        <CardContent className="space-y-8 relative">
          {/* Content Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-900/20 rounded-b-lg pointer-events-none" />
          {/* Premium Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-200 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl pointer-events-none" />
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
              <span className="relative text-sm font-medium">{submitError}</span>
            </motion.div>
          )}

          {/* Premium Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative z-10">
                <StepComponent 
                  form={form} 
                  formattedPhone={formattedPhone}
                  setFormattedPhone={setFormattedPhone}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Premium Navigation Buttons */}
          <div className="flex justify-between pt-8 relative z-10">
            <div>
              <button
                type="button"
                onClick={prevStep}
                disabled={!canGoPrev || isSubmitting}
                style={{ cursor: 'pointer' }}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-800/50 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500/50 disabled:opacity-30 transition-all duration-300 disabled:cursor-not-allowed rounded-xl hover:scale-105 transform relative z-20"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Anterior</span>
              </button>
            </div>

            {isLastStep ? (
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{ cursor: 'pointer' }}
                  className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 transform relative z-20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Completar Registro</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('BUTTON CLICKED! Current step:', currentStep);
                    nextStep();
                  }}
                  disabled={isSubmitting}
                  style={{ cursor: 'pointer' }}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform relative z-20"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Premium Privacy Notice */}
          <div className="relative text-xs text-slate-400 text-center pt-6 border-t border-slate-700/50">
            <div className="relative space-y-2">
              <p className="leading-relaxed">
                Al enviar este formulario, aceptas que podemos contactarte sobre NeurAnt. 
                Puedes cancelar la suscripción en cualquier momento.
              </p>
              <p className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
                Consulta nuestra política de privacidad para más información.
              </p>
            </div>
          </div>
        </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}