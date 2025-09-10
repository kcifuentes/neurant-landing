'use client';

import { UseFormReturn } from 'react-hook-form';
import { Bot, BarChart3, MessageSquare } from 'lucide-react';
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
  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-muted-foreground mb-6">
        Ayúdanos a entender cómo planeas usar NeurAnt para preparar la mejor experiencia.
      </div>

      <Form {...form}>
        <div className="grid gap-6">
          {/* Chatbot Type */}
          <FormField
            control={form.control}
            name="chatbotType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span>Tipo de chatbot principal *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona el uso principal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CHATBOT_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Podemos configurar múltiples tipos, pero esto nos ayuda a priorizar funcionalidades.
                </div>
              </FormItem>
            )}
          />

          {/* Expected Volume */}
          <FormField
            control={form.control}
            name="expectedVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Volumen esperado de mensajes *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona el volumen esperado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EXPECTED_VOLUME_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Nos ayuda a dimensionar correctamente tu plan y infraestructura.
                </div>
              </FormItem>
            )}
          />

          {/* Comments */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Comentarios adicionales (opcional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cuéntanos más sobre tu caso de uso específico, integraciones que necesitas, o cualquier pregunta que tengas..."
                    className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Máximo 500 caracteres. Esta información nos ayuda a preparar mejor tu configuración inicial.
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Step Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm">
        <div className="font-medium text-purple-900 mb-2">
          🚀 ¡Estás a un paso de completar tu registro!
        </div>
        <div className="text-purple-700 space-y-1">
          <p>Una vez que envíes el formulario:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Recibirás un email de confirmación</li>
            <li>Te mantendremos informado sobre el progreso</li>
            <li>Serás de los primeros en acceder cuando lancemos</li>
            <li>Tendrás acceso a demos exclusivas y beta testing</li>
          </ul>
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="font-semibold text-blue-900 mb-1">Acceso Prioritario</div>
          <div className="text-sm text-blue-700">Sé de los primeros en usar NeurAnt</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-900 mb-1">Configuración Personalizada</div>
          <div className="text-sm text-green-700">Setup optimizado para tu industria</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="font-semibold text-purple-900 mb-1">Soporte Exclusivo</div>
          <div className="text-sm text-purple-700">Asistencia directa del equipo</div>
        </div>
      </div>
    </div>
  );
}