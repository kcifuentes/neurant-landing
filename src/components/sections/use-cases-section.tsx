'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Building2, Heart, GraduationCap, Car, Utensils } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  staggerContainerVariants, 
  fadeInUpVariants,
  scaleInVariants
} from '@/lib/animations'

const useCases = [
  {
    industry: 'E-commerce',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-green-600',
    description: 'Automatiza consultas de órdenes, seguimiento de envíos y soporte de ventas 24/7',
    scenarios: [
      'Consulta estado de pedidos automáticamente',
      'Recomendaciones de productos personalizadas',
      'Gestión de devoluciones y cambios',
      'Integración con Shopify, WooCommerce y Magento'
    ],
    stats: { metric: '85%', label: 'Reducción en consultas manuales' },
    example: {
      customer: "¿Cuál es el estado de mi pedido #12345?",
      bot: "Tu pedido #12345 fue enviado hoy y llegará el viernes. Incluye 2 productos por $127.500. ¿Necesitas el número de seguimiento?"
    }
  },
  {
    industry: 'Servicios Profesionales',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    description: 'Agenda reuniones, califica leads y brinda información empresarial especializada',
    scenarios: [
      'Programación automática de citas',
      'Calificación inicial de prospectos',
      'Información sobre servicios y precios',
      'Integración con Google Calendar y Gmail'
    ],
    stats: { metric: '70%', label: 'Más citas programadas' },
    example: {
      customer: "Necesito una consultoría en marketing digital",
      bot: "Perfecto. Ofrecemos consultoría especializada desde $450.000. ¿Prefieres una reunión esta semana? Tengo disponibilidad martes 10am o jueves 3pm."
    }
  },
  {
    industry: 'Salud y Bienestar',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    description: 'Gestiona citas médicas, recordatorios de tratamientos y consultas de salud',
    scenarios: [
      'Programación de citas médicas',
      'Recordatorios de medicamentos',
      'Información sobre síntomas básicos',
      'Derivación a especialistas cuando sea necesario'
    ],
    stats: { metric: '60%', label: 'Menos cancelaciones de citas' },
    example: {
      customer: "Necesito agendar una cita con el cardiólogo",
      bot: "Te ayudo a agendar. El Dr. López tiene disponibilidad el lunes 15 a las 2pm o martes 16 a las 10am. ¿Cuál prefieres? También necesitaré tus datos de contacto."
    }
  },
  {
    industry: 'Educación',
    icon: GraduationCap,
    color: 'from-purple-500 to-violet-600',
    description: 'Soporte a estudiantes, información de cursos y asistencia académica automatizada',
    scenarios: [
      'Información sobre programas académicos',
      'Proceso de admisiones y matrículas',
      'Horarios y calendario académico',
      'Soporte técnico para plataformas educativas'
    ],
    stats: { metric: '90%', label: 'Consultas resueltas automáticamente' },
    example: {
      customer: "¿Cuáles son los requisitos para el programa de Ingeniería?",
      bot: "Para Ingeniería necesitas: bachillerato con énfasis en matemáticas, examen de admisión (próximas fechas: 15 y 22 de enero), y certificado médico. ¿Te interesa información sobre becas disponibles?"
    }
  },
  {
    industry: 'Automotriz',
    icon: Car,
    color: 'from-slate-500 to-gray-600',
    description: 'Gestiona citas de servicio, consultas técnicas y venta de repuestos',
    scenarios: [
      'Programación de mantenimientos',
      'Consulta de disponibilidad de repuestos',
      'Información técnica sobre vehículos',
      'Estimaciones de reparación'
    ],
    stats: { metric: '75%', label: 'Más eficiencia en agendamiento' },
    example: {
      customer: "Mi carro hace un ruido extraño en el motor",
      bot: "Entiendo tu preocupación. Para diagnosticar mejor, ¿el ruido ocurre al acelerar o en ralentí? Te puedo agendar una revisión técnica mañana a las 9am. ¿Tienes el modelo y año del vehículo?"
    }
  },
  {
    industry: 'Restaurantes',
    icon: Utensils,
    color: 'from-orange-500 to-red-500',
    description: 'Reservas automáticas, pedidos a domicilio y información del menú',
    scenarios: [
      'Reservas de mesas automáticas',
      'Pedidos para entrega o recogida',
      'Información nutricional y alérgenos',
      'Promociones y eventos especiales'
    ],
    stats: { metric: '50%', label: 'Aumento en reservas online' },
    example: {
      customer: "Quiero hacer una reserva para 4 personas esta noche",
      bot: "¡Perfecto! Tengo disponibilidad para 4 personas hoy a las 7pm o 9pm. ¿Tienes alguna preferencia especial? También puedo recomendarte nuestro menú especial de mariscos."
    }
  }
]

export function UseCasesSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden" role="region" aria-labelledby="use-cases-title">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-orange-400/10 rounded-full blur-2xl" />
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
              className="mb-8 px-6 py-3 text-base bg-purple-500/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/30"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Casos de Uso Reales
            </Badge>
          </motion.div>

          <motion.h2 
            id="use-cases-title"
            variants={fadeInUpVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight"
          >
            Transforma cualquier industria
            <span className="block text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              con IA especializada
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeInUpVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Desde e-commerce hasta salud, NeurAnt se adapta a las necesidades específicas de tu industria. 
            Descubre cómo empresas reales están automatizando su atención al cliente.
          </motion.p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={scaleInVariants}
              className="group"
            >
              <Card className="relative p-6 sm:p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 h-full overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Header */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <useCase.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        {useCase.industry}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent`}>
                      {useCase.stats.metric}
                    </div>
                    <div className="text-xs text-slate-400">
                      {useCase.stats.label}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Scenarios */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3">Automatizaciones clave:</h4>
                  <div className="space-y-2">
                    {useCase.scenarios.map((scenario, scenarioIndex) => (
                      <div key={scenarioIndex} className="flex items-start text-sm text-slate-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${useCase.color} mt-2 mr-3 flex-shrink-0`} />
                        {scenario}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Example Conversation */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-400 mb-3">Ejemplo de conversación:</div>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="bg-blue-500/20 rounded-lg px-3 py-2 max-w-[80%]">
                        <div className="text-sm text-slate-200">"{useCase.example.customer}"</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className={`bg-gradient-to-r ${useCase.color} bg-opacity-20 rounded-lg px-3 py-2 max-w-[80%]`}>
                        <div className="text-sm text-slate-200">"{useCase.example.bot}"</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${useCase.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
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
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿No ves tu industria aquí?
            </h3>
            <p className="text-slate-300 mb-8 text-lg">
              NeurAnt es altamente configurable y se adapta a cualquier sector. Cuéntanos tu caso específico 
              y diseñaremos la solución perfecta para tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Consultar Mi Caso
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 bg-slate-700/50 text-white font-semibold rounded-xl hover:bg-slate-600/50 transition-all duration-300 border-slate-600/50"
                >
                  Ver Más Ejemplos
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}