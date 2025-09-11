'use client';

import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Building, Users, Phone, Globe, Factory, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WaitlistFormData, COMPANY_SIZE_OPTIONS } from '@/lib/validations/waitlist';
import { industriesService, type Industry } from '@/lib/supabase';

interface CompanyInfoStepProps {
  form: UseFormReturn<WaitlistFormData>;
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

export function CompanyInfoStep({ form, formattedPhone, setFormattedPhone }: CompanyInfoStepProps) {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [industriesError, setIndustriesError] = useState<string | null>(null);

  // Load industries from Supabase
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        setLoadingIndustries(true);
        const { data, error } = await industriesService.getActiveIndustries();
        
        if (error) {
          console.error('Error loading industries:', error);
          setIndustriesError('Error al cargar las industrias');
        } else {
          setIndustries(data);
        }
      } catch (error) {
        console.error('Unexpected error loading industries:', error);
        setIndustriesError('Error inesperado al cargar las industrias');
      } finally {
        setLoadingIndustries(false);
      }
    };

    loadIndustries();
  }, []);
  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    form.setValue('phone', cleaned ? `+${cleaned}` : '');
  };

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-xl blur-xl" />
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-300 text-base leading-relaxed">
            Cuéntanos sobre tu empresa para entender mejor tus necesidades con
            <span className="text-orange-400 font-semibold"> NeurAnt</span>.
          </p>
        </div>
      </div>

      <Form {...form}>
        <div className="grid gap-8">
          {/* Company Name - Premium */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <span>Nombre de la empresa *</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Ej: Innovaciones Digitales S.A.S"
                      {...field}
                      className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Company Size - Premium */}
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span>Tamaño de la empresa *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white data-[placeholder]:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {COMPANY_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Industry - Premium */}
          <FormField
            control={form.control}
            name="industryId"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
                    <Factory className="h-5 w-5 text-white" />
                  </div>
                  <span>Industria *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white data-[placeholder]:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Selecciona tu industria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {loadingIndustries ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
                        <span className="ml-2 text-slate-400">Cargando industrias...</span>
                      </div>
                    ) : industriesError ? (
                      <div className="p-4 text-red-400 text-sm">
                        {industriesError}
                      </div>
                    ) : industries.length > 0 ? (
                      industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                          {industry.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-slate-400 text-sm">
                        No hay industrias disponibles
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Nos ayuda a personalizar las funcionalidades para tu sector.</span>
                </div>
              </FormItem>
            )}
          />

          {/* Phone (Optional) - Premium */}
          <FormField
            control={form.control}
            name="phone"
            render={() => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>Teléfono <span className="text-slate-400 font-normal">(opcional)</span></span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={formattedPhone}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormattedPhone(value);
                        handlePhoneChange(value);
                      }}
                      className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Para contacto directo si necesitas soporte prioritario.</span>
                </div>
              </FormItem>
            )}
          />

          {/* Website (Optional) - Premium */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <span>Sitio web <span className="text-slate-400 font-normal">(opcional)</span></span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://www.miempresa.com"
                      {...field}
                      className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Nos ayuda a entender mejor tu negocio para personalizar la integración.</span>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Premium Step Info */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl" />
        <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-white text-base">
                ¿Cómo usamos esta información?
              </div>
              <div className="text-slate-300 leading-relaxed">
                Estos datos nos permiten configurar <span className="text-orange-400 font-medium">NeurAnt</span> específicamente para tu industria y 
                tamaño de empresa, asegurando que obtengas las funcionalidades más relevantes desde el día uno.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}