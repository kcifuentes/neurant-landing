'use client';

import { UseFormReturn } from 'react-hook-form';
import { Bot, BarChart3, MessageSquare, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  WaitlistFormData, 
  CHATBOT_TYPE_OPTIONS, 
  EXPECTED_VOLUME_OPTIONS 
} from '@/lib/validations/waitlist';

interface InterestsStepProps {
  form: UseFormReturn<WaitlistFormData>;
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

export function InterestsStep({ form }: InterestsStepProps) {
  const [commentLength, setCommentLength] = useState(0);
  const maxLength = 500;

  useEffect(() => {
    const subscription = form.watch((value) => {
      setCommentLength((value.comments || '').length);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-xl blur-xl" />
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-300 text-base leading-relaxed">
            Ayúdanos a entender cómo planeas usar <span className="text-orange-400 font-semibold">NeurAnt</span> para preparar la mejor experiencia personalizada.
          </p>
        </div>
      </div>

      <Form {...form}>
        <div className="grid gap-8">
          {/* Chatbot Type */}
          <FormField
            control={form.control}
            name="chatbotType"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span>Tipo de chatbot principal *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white data-[placeholder]:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Selecciona el uso principal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {CHATBOT_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span>Podemos configurar múltiples tipos, pero esto nos ayuda a priorizar funcionalidades.</span>
                </div>
              </FormItem>
            )}
          />

          {/* Expected Volume */}
          <FormField
            control={form.control}
            name="expectedVolume"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <span>Volumen esperado de mensajes *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white data-[placeholder]:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Selecciona el volumen esperado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {EXPECTED_VOLUME_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span>Nos ayuda a dimensionar correctamente tu plan y infraestructura.</span>
                </div>
              </FormItem>
            )}
          />

          {/* Comments */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <span>Comentarios adicionales <span className="text-slate-400 font-normal">(opcional)</span></span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Cuéntanos más sobre tu caso de uso específico, integraciones que necesitas, o cualquier pregunta que tengas..."
                      className={`min-h-[100px] px-4 py-3 bg-slate-800/50 text-white placeholder:text-slate-400 rounded-xl transition-all duration-300 resize-none ${
                        commentLength >= maxLength
                          ? 'border-red-500/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                          : commentLength > maxLength * 0.9
                            ? 'border-orange-500/70 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                            : 'border-slate-600/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                      }`}
                      maxLength={maxLength}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= maxLength) {
                          field.onChange(e);
                        }
                      }}
                    />
                    <div className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded transition-colors ${
                      commentLength > maxLength * 0.9 
                        ? commentLength >= maxLength 
                          ? 'text-red-300 bg-red-900/80' 
                          : 'text-orange-300 bg-orange-900/80'
                        : 'text-slate-400 bg-slate-800/80'
                    }`}>
                      {commentLength}/{maxLength}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Máximo 500 caracteres. Esta información nos ayuda a preparar mejor tu configuración inicial.</span>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Premium Step Info */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl" />
        <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="space-y-3">
              <div className="font-semibold text-white text-lg flex items-center gap-2">
                <Rocket className="w-5 h-5 text-orange-400" />
                ¡Estás a un paso de completar tu registro!
              </div>
              <div className="text-slate-300 leading-relaxed">
                <p className="mb-3">Una vez que envíes el formulario:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                    <span>Recibirás un email de confirmación</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0" />
                    <span>Te mantendremos informado sobre el progreso</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                    <span>Serás de los primeros en acceder cuando lancemos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                    <span>Tendrás acceso a demos exclusivas y beta testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Benefits Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
          <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-slate-600/50 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg w-fit mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="font-semibold text-white mb-2">Acceso Prioritario</div>
            <div className="text-sm text-slate-300">Sé de los primeros en usar <span className="text-orange-400 font-medium">NeurAnt</span></div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
          <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-slate-600/50 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg w-fit mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="font-semibold text-white mb-2">Configuración Personalizada</div>
            <div className="text-sm text-slate-300">Setup optimizado para tu industria</div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
          <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-slate-600/50 transition-all duration-300">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg w-fit mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="font-semibold text-white mb-2">Soporte Exclusivo</div>
            <div className="text-sm text-slate-300">Asistencia directa del equipo</div>
          </div>
        </div>
      </div>
    </div>
  );
}