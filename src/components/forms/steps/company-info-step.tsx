'use client';

import { UseFormReturn } from 'react-hook-form';
import { Building, Users, Phone, Globe, Factory } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WaitlistFormData, COMPANY_SIZE_OPTIONS } from '@/lib/validations/waitlist';

interface CompanyInfoStepProps {
  form: UseFormReturn<WaitlistFormData>;
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

// Industrias comunes para autocompletado
const COMMON_INDUSTRIES = [
  { id: '1', name: 'Tecnología y Software' },
  { id: '2', name: 'E-commerce y Retail' },
  { id: '3', name: 'Servicios Financieros' },
  { id: '4', name: 'Salud y Medicina' },
  { id: '5', name: 'Educación' },
  { id: '6', name: 'Inmobiliario' },
  { id: '7', name: 'Turismo y Hospitalidad' },
  { id: '8', name: 'Manufactura' },
  { id: '9', name: 'Telecomunicaciones' },
  { id: '10', name: 'Alimentación y Bebidas' },
  { id: '11', name: 'Consultoría y Servicios Profesionales' },
  { id: '12', name: 'Marketing y Publicidad' },
  { id: '13', name: 'Logística y Transporte' },
  { id: '14', name: 'Entretenimiento y Medios' },
  { id: '15', name: 'Servicios Automotrices' },
  { id: '16', name: 'Otro' },
];

export function CompanyInfoStep({ form, formattedPhone, setFormattedPhone }: CompanyInfoStepProps) {
  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    form.setValue('phone', cleaned ? `+${cleaned}` : '');
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-muted-foreground mb-6">
        Cuéntanos sobre tu empresa para entender mejor tus necesidades.
      </div>

      <Form {...form}>
        <div className="grid gap-6">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Nombre de la empresa *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Innovaciones Digitales S.A.S"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Size */}
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Tamaño de la empresa *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMPANY_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry */}
          <FormField
            control={form.control}
            name="industryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Factory className="h-4 w-4" />
                  <span>Industria *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Selecciona tu industria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMMON_INDUSTRIES.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Nos ayuda a personalizar las funcionalidades para tu sector.
                </div>
              </FormItem>
            )}
          />

          {/* Phone (Optional) */}
          <FormField
            control={form.control}
            name="phone"
            render={() => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Teléfono (opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={formattedPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormattedPhone(value);
                      handlePhoneChange(value);
                    }}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Para contacto directo si necesitas soporte prioritario.
                </div>
              </FormItem>
            )}
          />

          {/* Website (Optional) */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Sitio web (opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.miempresa.com"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-muted-foreground">
                  Nos ayuda a entender mejor tu negocio para personalizar la integración.
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Step Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
        <div className="font-medium text-green-900 mb-1">
          ¿Cómo usamos esta información?
        </div>
        <div className="text-green-700">
          Estos datos nos permiten configurar NeurAnt específicamente para tu industria y 
          tamaño de empresa, asegurando que obtengas las funcionalidades más relevantes desde el día uno.
        </div>
      </div>
    </div>
  );
}