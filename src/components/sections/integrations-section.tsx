'use client'

import { motion } from 'framer-motion'
import { Calendar, Mail, ShoppingBag } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { SiSlack, SiTelegram } from 'react-icons/si'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  staggerContainerVariants, 
  fadeInUpVariants,
  scaleInVariants
} from '@/lib/animations'

const integrations = [
  {
    name: 'Google Calendar',
    description: 'Programar reuniones, consultar disponibilidad y gestionar eventos',
    icon: Calendar,
    category: 'Productividad',
    color: 'from-blue-500 to-blue-600',
    features: ['Crear eventos', 'Consultar disponibilidad', 'Recordatorios automáticos']
  },
  {
    name: 'Gmail',
    description: 'Enviar correos, gestionar bandeja y responder automáticamente',
    icon: Mail,
    category: 'Comunicación',
    color: 'from-red-500 to-red-600',
    features: ['Envío automático', 'Respuestas inteligentes', 'Filtros personalizados']
  },
  {
    name: 'Shopify',
    description: 'Consultar órdenes, gestionar inventario y soporte de ventas',
    icon: ShoppingBag,
    category: 'E-commerce',
    color: 'from-green-500 to-green-600',
    features: ['Estado de órdenes', 'Consulta de productos', 'Soporte de ventas']
  },
  {
    name: 'WhatsApp',
    description: 'Mensajería instantánea con clientes vía Evolution API',
    icon: FaWhatsapp,
    category: 'Mensajería',
    color: 'from-emerald-500 to-emerald-600',
    features: ['Mensajes automáticos', 'Multimedia', 'Grupos']
  },
  {
    name: 'Slack',
    description: 'Integración con equipos de trabajo y canales internos',
    icon: SiSlack,
    category: 'Colaboración',
    color: 'from-purple-500 to-purple-600',
    features: ['Notificaciones', 'Canales', 'Comandos personalizados']
  },
  {
    name: 'Telegram',
    description: 'Bot inteligente para atención al cliente en Telegram',
    icon: SiTelegram,
    category: 'Mensajería',
    color: 'from-blue-400 to-blue-500',
    features: ['Bots inteligentes', 'Comandos', 'Mensajes programados']
  }
]

const categories = [
  { name: 'Mensajería', count: 2, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { name: 'Productividad', count: 1, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { name: 'E-commerce', count: 1, color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { name: 'Comunicación', count: 1, color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { name: 'Colaboración', count: 1, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
]

export function IntegrationsSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden" role="region" aria-labelledby="integrations-title">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUpVariants}>
            <Badge 
              variant="outline" 
              className="mb-8 px-6 py-3 text-base bg-orange-500/20 border-orange-500/30 text-orange-200 hover:bg-orange-500/30"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Integraciones Nativas
            </Badge>
          </motion.div>

          <motion.h2 
            id="integrations-title"
            variants={fadeInUpVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight"
          >
            Conecta con las herramientas 
            <span className="block text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text">
              que ya usas
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeInUpVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            NeurAnt se integra nativamente con tus herramientas favoritas. 
            Sin configuraciones complejas, sin código. Solo conectar y automatizar.
          </motion.p>

          {/* Categories Filter */}
          <motion.div 
            variants={fadeInUpVariants}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`px-4 py-2 text-sm border ${category.color} hover:scale-105 transition-transform cursor-pointer`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              variants={scaleInVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group"
            >
              <Card className="relative p-6 sm:p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 h-full overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <integration.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors">
                      {integration.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50"
                    >
                      {integration.category}
                    </Badge>
                  </div>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {integration.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-300 mb-3">Características:</div>
                    {integration.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-400">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${integration.color} mr-3`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tu herramienta favorita no está aquí?
            </h3>
            <p className="text-slate-300 mb-8 text-lg">
              NeurAnt está en constante evolución. Contáctanos para integrar nuevas herramientas según tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 cursor-pointer"
              >
                Únete a la Lista de Espera
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}