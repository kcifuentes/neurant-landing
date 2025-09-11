'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Bot, 
  Smartphone, 
  FileSearch, 
  BarChart, 
  Users, 
  Settings,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react'
import { 
  staggerContainerVariants, 
  fadeInUpVariants, 
  glassCardVariants,
  magneticHoverVariants,
  morphingBlobVariants,
  generateParticles,
  viewportOptions
} from '@/lib/animations'

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}

const features: FeatureItem[] = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "IA avanzada con procesamiento de lenguaje natural para respuestas precisas y conversaciones fluidas.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Smartphone,
    title: "Multi-plataforma",
    description: "Despliega en WhatsApp, Telegram, sitio web y Slack desde una sola configuración.",
    color: "from-orange-600 to-amber-500"
  },
  {
    icon: FileSearch,
    title: "Documentos Inteligentes",
    description: "Busca y encuentra información específica en tus documentos usando tecnología RAG avanzada.",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: BarChart,
    title: "Analytics Avanzados",
    description: "Métricas detalladas de conversaciones, satisfacción del cliente y rendimiento en tiempo real.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Users,
    title: "Transferencia a Humanos",
    description: "Escalación automática a agentes humanos cuando se requiere intervención personalizada.",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Settings,
    title: "Configuración Fácil",
    description: "Setup completo en minutos, no horas. Interface intuitiva sin conocimientos técnicos.",
    color: "from-red-500 to-amber-500"
  }
]

export function FeaturesSection() {
  const particles = generateParticles(8)

  return (
    <section className="py-32 bg-gradient-to-b from-white via-orange-50/30 to-red-50/20 dark:from-gray-950 dark:via-orange-950/30 dark:to-red-950/20 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Morphing Background Blobs */}
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute top-32 left-20 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-red-300/20 dark:from-orange-500/10 dark:to-red-500/10 blur-3xl"
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-l from-amber-300/15 to-orange-300/15 dark:from-amber-500/8 dark:to-orange-500/8 blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300 rounded-full opacity-40"
            style={{
              left: `${particle.x}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-50, typeof window !== 'undefined' ? -window.innerHeight - 50 : -600],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: particle.duration + 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-3" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 text-orange-700 dark:text-orange-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-orange-200/50 dark:border-orange-800/50 backdrop-blur-sm shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            Características Principales
          </motion.div>
          
          <motion.h2 
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
          >
            Todo lo que necesitas para{' '}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent whitespace-nowrap">
              automatizar
            </span>{' '}
            tu atención al cliente
          </motion.h2>
          
          <motion.p 
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Descubre por qué empresas visionarias han elegido <strong className="text-orange-600 dark:text-orange-400">NeurAnt</strong> como su aliado para transformar 
            la experiencia de atención al cliente con inteligencia artificial.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-100px", amount: 0.1 }}
              >
                <motion.div
                  whileHover="hover"
                  variants={magneticHoverVariants}
                  className="group cursor-pointer"
                >
                  <Card className="p-6 sm:p-8 h-full bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-900/60 transition-all duration-500 group shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5">
                    <div className="text-center space-y-4 sm:space-y-6">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                        className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${feature.color} text-white shadow-2xl shadow-orange-500/25 group-hover:shadow-3xl group-hover:shadow-orange-500/40 transition-all duration-500`}
                      >
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                      </motion.div>

                      {/* Content */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover Effect Lines */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                      />
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5 blur-3xl rounded-3xl" />
            
            <div className="relative bg-gradient-to-r from-white/80 to-orange-50/80 dark:from-gray-900/80 dark:to-orange-950/80 backdrop-blur-xl rounded-3xl p-12 border border-white/60 dark:border-gray-700/60 shadow-2xl">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
              >
                ¿Listo para transformar tu atención al cliente?
              </motion.h3>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
              >
                Únete a las empresas pioneras que confían en <strong className="text-orange-600 dark:text-orange-400">NeurAnt</strong> para revolucionar 
                sus procesos de atención al cliente con inteligencia artificial.
              </motion.p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group"
                >
                  <Zap className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Ver Demo en Vivo
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}