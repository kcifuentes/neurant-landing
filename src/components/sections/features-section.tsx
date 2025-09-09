'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Bot, 
  Smartphone, 
  FileSearch, 
  BarChart, 
  Users, 
  Settings,
  ArrowRight 
} from 'lucide-react'

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
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Multi-plataforma",
    description: "Despliega en WhatsApp, Telegram, sitio web y Slack desde una sola configuración.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: FileSearch,
    title: "Documentos Inteligentes",
    description: "Busca y encuentra información específica en tus documentos usando tecnología RAG avanzada.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: BarChart,
    title: "Analytics Avanzados",
    description: "Métricas detalladas de conversaciones, satisfacción del cliente y rendimiento en tiempo real.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Users,
    title: "Transferencia a Humanos",
    description: "Escalación automática a agentes humanos cuando se requiere intervención personalizada.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Settings,
    title: "Configuración Fácil",
    description: "Setup completo en minutos, no horas. Interface intuitiva sin conocimientos técnicos.",
    color: "from-indigo-500 to-blue-500"
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.1
    }
  }
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-gray-100 bg-[size:20px_20px] opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Bot className="w-4 h-4" />
            Características Principales
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Todo lo que necesitas para{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              automatizar
            </span>{' '}
            tu atención al cliente
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre por qué más de 500+ empresas confían en NeurAnt para transformar 
            su experiencia de atención al cliente con inteligencia artificial.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 h-full bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200/50 hover:bg-white/90 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para transformar tu atención al cliente?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a cientos de empresas que ya están automatizando sus procesos 
              y mejorando la satisfacción de sus clientes con NeurAnt.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Ver Demo en Vivo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}