'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from '@/components/forms/waitlist-form';
import { NeurAntLogo } from '@/components/ui/neurant-logo';
import { Rocket, Target, Users } from 'lucide-react';

export function WaitlistSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Únete a la Revolución
            </span>
            <br />
            del Servicio al Cliente
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sé parte de la transformación que está redefiniendo cómo las empresas se conectan con sus clientes. 
            Regístrate ahora y obtén acceso prioritario a <NeurAntLogo fontSize="1.25rem" isDarkBackground={false} className="inline" />.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <WaitlistForm />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Acceso Anticipado</h3>
              <p className="text-sm text-gray-600 text-center">
                Sé de los primeros en experimentar las funcionalidades más avanzadas
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Configuración Personalizada</h3>
              <p className="text-sm text-gray-600 text-center">
                Tu chatbot configurado específicamente para tu industria y necesidades
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Soporte Exclusivo</h3>
              <p className="text-sm text-gray-600 text-center">
                Asistencia directa de nuestro equipo de expertos durante el setup
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>
            Únete a empresas de tecnología, e-commerce, servicios financieros y más 
            que ya confían en <NeurAntLogo fontSize="0.875rem" isDarkBackground={false} className="inline" /> para transformar su atención al cliente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}