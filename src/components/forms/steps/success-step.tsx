'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Mail, Rocket, Users, Calendar, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NeurAntLogo } from '@/components/ui/neurant-logo';

interface SuccessStepProps {
  onReset: () => void;
}

export function SuccessStep({ onReset }: SuccessStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              ¡Bienvenido a <NeurAntLogo fontSize="2.25rem" isDarkBackground={false} />! 
              <PartyPopper className="w-8 h-8 text-orange-500" />
            </h2>
            <p className="text-lg text-gray-600">
              Tu registro ha sido enviado exitosamente. Estás oficialmente en nuestra lista de espera.
            </p>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-left"
          >
            <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              ¿Qué sigue ahora?
            </h3>
            <div className="space-y-3 text-sm text-orange-800">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Confirmación por email:</strong> Revisa tu bandeja de entrada para confirmar tu registro.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Actualizaciones regulares:</strong> Te mantendremos informado sobre nuestro progreso y nuevas funcionalidades.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Acceso prioritario:</strong> Serás de los primeros en usar <NeurAntLogo fontSize="0.875rem" isDarkBackground={false} className="inline" /> cuando esté listo.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="p-4 bg-green-50 rounded-lg">
              <Rocket className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-900 text-sm">Lanzamiento Exclusivo</div>
              <div className="text-xs text-green-700 mt-1">Q2 2025</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold text-purple-900 text-sm">Comunidad Beta</div>
              <div className="text-xs text-purple-700 mt-1">Acceso anticipado</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="font-semibold text-orange-900 text-sm">Demos en Vivo</div>
              <div className="text-xs text-orange-700 mt-1">Sesiones exclusivas</div>
            </div>
          </motion.div>

          {/* Social sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-4"
          >
            <div className="text-sm text-gray-600">
              ¿Conoces a alguien que podría estar interesado? ¡Comparte <NeurAntLogo fontSize="0.875rem" isDarkBackground={false} className="inline" />!
            </div>
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = "¡Acabo de unirme a la lista de espera de NeurAnt! La plataforma de chatbots con IA que va a revolucionar la atención al cliente. ¡Únete!";
                  const url = window.location.origin;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                }}
              >
                Compartir en Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = "¡Mira esta plataforma de chatbots con IA que está por lanzarse!";
                  const url = window.location.origin;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                Compartir en LinkedIn
              </Button>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
          >
            <Button
              onClick={onReset}
              variant="outline"
            >
              Registrar otra empresa
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Volver al inicio
            </Button>
          </motion.div>

          {/* Footer note */}
          <div className="text-xs text-gray-500 pt-4 border-t">
            ¿Tienes preguntas? Contáctanos en{' '}
            <a href="mailto:hola@neurant.com" className="text-orange-600 hover:underline">
              hola@neurant.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}