'use client';

import { UseFormReturn } from 'react-hook-form';
import { User, Mail, Globe } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WaitlistFormData } from '@/lib/validations/waitlist';

interface BasicInfoStepProps {
  form: UseFormReturn<WaitlistFormData>;
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

// Lista de países comunes en Latinoamérica para autocompletado
const COMMON_COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'ES', name: 'España' },
  { code: 'US', name: 'Estados Unidos' },
];

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  // Usando todos los países disponibles (se puede extender para búsqueda en el futuro)
  const filteredCountries = COMMON_COUNTRIES;

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-muted-foreground mb-6">
        Comencemos con tu información básica para personalizar tu experiencia.
      </div>

      <Form {...form}>
        <div className="grid gap-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Nombre completo *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: María García López"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Correo electrónico *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="maria@empresa.com"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Te enviaremos actualizaciones sobre el lanzamiento a este correo.
                </div>
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>País *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona tu país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredCountries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Nos ayuda a entender mejor nuestro mercado objetivo.
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Step Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <div className="font-medium text-blue-900 mb-1">
          ¿Por qué necesitamos esta información?
        </div>
        <div className="text-blue-700">
          Tu información básica nos permite personalizar la experiencia y mantenerte informado 
          sobre el progreso de NeurAnt en tu región.
        </div>
      </div>
    </div>
  );
}