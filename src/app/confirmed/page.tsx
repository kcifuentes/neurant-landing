'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Rocket, Users, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function ConfirmedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidAccess, setIsValidAccess] = useState(true);

  useEffect(() => {
    // Verificar si el usuario llegó desde el formulario de registro
    const fromForm = searchParams.get('from');
    const hasSessionData = localStorage.getItem('neurant_waitlist_submitted');
    
    if (!fromForm && !hasSessionData) {
      // Redirección automática si llegan sin registrarse
      setTimeout(() => {
        router.push('/?reason=direct_access');
      }, 3000);
      setIsValidAccess(false);
    }
  }, [searchParams, router]);

  const handleSocialShare = (platform: 'twitter' | 'linkedin') => {
    const text = "¡Acabo de unirme a la lista de espera de NeurAnt! 🚀 La plataforma de chatbots con IA que va a revolucionar la atención al cliente en Colombia. ¡Únete!";
    const url = window.location.origin;

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      // Mostrar feedback visual (podrías implementar un toast aquí)
    } catch (error) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = window.location.origin;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  if (!isValidAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <ArrowLeft className="w-8 h-8 text-orange-600" />
              </div>
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Acceso Directo Detectado
              </h2>
              <p className="text-gray-600">
                Esta página está diseñada para usuarios que se han registrado. 
                Te redirigiremos al inicio para que puedas unirte a nuestra lista de espera.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Redirigiendo en 3 segundos...
            </div>

            <Button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Ir al Registro
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12 text-center space-y-8">
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center relative">
                <CheckCircle className="w-16 h-16 text-green-600" />
                <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-20" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                ¡Bienvenido a NeurAnt! 🎉
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Tu registro ha sido confirmado exitosamente. Eres oficialmente parte de nuestra 
                exclusiva lista de espera y serás uno de los primeros en experimentar el futuro 
                de la atención al cliente con IA.
              </p>
            </motion.div>

            {/* Timeline Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-left"
            >
              <h3 className="font-bold text-blue-900 mb-6 flex items-center text-xl">
                <Calendar className="w-6 h-6 mr-3" />
                Timeline Estimado de Lanzamiento
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <div className="font-semibold text-green-900">Enero - Febrero 2025</div>
                    <div className="text-sm text-green-700">Beta cerrada con usuarios seleccionados</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <div>
                    <div className="font-semibold text-blue-900">Marzo - Abril 2025</div>
                    <div className="text-sm text-blue-700">Beta abierta para lista de espera</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <div>
                    <div className="font-semibold text-purple-900">Q2 2025</div>
                    <div className="text-sm text-purple-700">Lanzamiento público oficial</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-8 text-left"
            >
              <h3 className="font-bold text-amber-900 mb-6 flex items-center text-xl">
                <Mail className="w-6 h-6 mr-3" />
                Tus Próximos Pasos
              </h3>
              <div className="space-y-4 text-amber-800">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <strong>Confirmación por email:</strong> Revisa tu bandeja de entrada (y spam) para confirmar tu registro y activar las notificaciones.
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <strong>Actualizaciones regulares:</strong> Te mantendremos informado sobre nuestro progreso, nuevas funcionalidades y fechas importantes.
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <strong>Invitación beta:</strong> Serás invitado prioritariamente a nuestros programas de prueba y demos exclusivos.
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <strong>Acceso prioritario:</strong> Cuando lancemos, tendrás acceso inmediato sin listas de espera adicionales.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <Rocket className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <div className="font-bold text-green-900 text-lg mb-2">Lanzamiento Exclusivo</div>
                <div className="text-sm text-green-700">Acceso prioritario Q2 2025</div>
                <div className="text-xs text-green-600 mt-2">Únete a los early adopters</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl">
                <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <div className="font-bold text-purple-900 text-lg mb-2">Comunidad Beta</div>
                <div className="text-sm text-purple-700">Influye en el desarrollo</div>
                <div className="text-xs text-purple-600 mt-2">Tu feedback es valioso</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl">
                <Calendar className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                <div className="font-bold text-orange-900 text-lg mb-2">Demos en Vivo</div>
                <div className="text-sm text-orange-700">Sesiones exclusivas</div>
                <div className="text-xs text-orange-600 mt-2">Aprende antes que nadie</div>
              </div>
            </motion.div>

            {/* Social sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="space-y-6"
            >
              <div className="text-lg font-semibold text-gray-900">
                ¿Conoces a alguien que podría beneficiarse de NeurAnt?
              </div>
              <div className="text-gray-600">
                Comparte con otros emprendedores y empresarios. Entre más seamos, ¡mejor será la plataforma!
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center space-x-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir en Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSocialShare('linkedin')}
                  className="flex items-center space-x-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir en LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCopyLink}
                  className="flex items-center space-x-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Copiar enlace</span>
                </Button>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200"
            >
              <Button
                onClick={() => router.push('/?register=another')}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Registrar otra empresa
              </Button>
              <Button
                onClick={() => router.push('/')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                Explorar la plataforma
              </Button>
            </motion.div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="text-sm text-gray-500 pt-6 border-t border-gray-100"
            >
              ¿Tienes preguntas o sugerencias?{' '}
              <a 
                href="mailto:hola@neurant.com" 
                className="text-blue-600 hover:underline font-medium"
              >
                Contáctanos directamente
              </a>
              <br />
              <span className="text-xs">
                Síguenos en nuestras redes sociales para actualizaciones en tiempo real
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">
              Cargando confirmación...
            </h2>
            <p className="text-gray-600">
              Preparando tu página de confirmación
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmedContent />
    </Suspense>
  );
}