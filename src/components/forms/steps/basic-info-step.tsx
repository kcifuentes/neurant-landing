'use client';

import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { User, Mail, Globe } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WaitlistFormData } from '@/lib/validations/waitlist';
import { countriesService, type Country } from '@/lib/supabase';

interface BasicInfoStepProps {
  form: UseFormReturn<WaitlistFormData>;
  formattedPhone: string;
  setFormattedPhone: (value: string) => void;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  // Load countries
  useEffect(() => {
    const { data } = countriesService.getCommonCountries();
    setCountries(data);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-xl blur-xl" />
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-300 text-base leading-relaxed">
            Comencemos con tu información básica para personalizar tu experiencia con 
            <span className="text-orange-400 font-semibold"> NeurAnt</span>.
          </p>
        </div>
      </div>

      <Form {...form}>
        <div className="grid gap-8">
          {/* Full Name - Premium */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span>Nombre completo *</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Ej: María García López"
                      {...field}
                      className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Email - Premium */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 shadow-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>Correo electrónico *</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="maria@empresa.com"
                      {...field}
                      className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  <span>Te enviaremos actualizaciones sobre el lanzamiento a este correo.</span>
                </div>
              </FormItem>
            )}
          />

          {/* Country - Premium */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center space-x-3 text-white font-semibold text-base">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 shadow-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <span>País *</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 px-4 bg-slate-800/50 border-slate-600/50 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 rounded-xl transition-all duration-300">
                      <SelectValue placeholder="Selecciona tu país" className="text-slate-400" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
                <div className="text-sm text-slate-400 mt-2 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  <span>Nos ayuda a entender mejor nuestro mercado objetivo.</span>
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
                ¿Por qué necesitamos esta información?
              </div>
              <div className="text-slate-300 leading-relaxed">
                Tu información básica nos permite personalizar la experiencia y mantenerte informado 
                sobre el progreso de <span className="text-orange-400 font-medium">NeurAnt</span> en tu región.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}