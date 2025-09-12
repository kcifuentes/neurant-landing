'use client'

import { useState, useEffect } from 'react'
import { useWaitlistMetrics } from '../../hooks/use-waitlist-metrics'
import { motion, type Variants } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { trackCTAClick } from '@/components/analytics/google-analytics'
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react'

// interface StatsData {
//   total_registrations: number
//   countries_represented: number
//   top_industries: Array<{
//     name: string
//     slug: string
//     registrations: number
//   }>
//   last_updated: string
// }

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const LAUNCH_DATE = new Date('2025-10-09T23:59:59Z') // Octubre 9, 2025
const DEVELOPMENT_PROGRESS = 85 // 85% completado

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const countVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "backOut"
    }
  }
}

export function ExpectativaMomentumSection() {
  const { metrics } = useWaitlistMetrics()
  
  // Use real metrics or fallbacks
  const stats = {
    total_registrations: metrics?.totalCompanies || 12,
    countries_represented: metrics?.totalCountries || 3,
    top_industries: metrics?.topIndustries?.map(industry => ({
      name: industry.industry,
      slug: industry.industry.toLowerCase().replace(/\s+/g, '-'),
      registrations: industry.count
    })) || [
      { name: 'E-commerce', slug: 'ecommerce', registrations: 5 },
      { name: 'Tecnología', slug: 'tecnologia', registrations: 4 },
      { name: 'Servicios', slug: 'servicios', registrations: 3 }
    ],
    last_updated: metrics?.lastUpdated || new Date().toISOString()
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [mounted, setMounted] = useState(false)

  // Calcular tiempo restante hasta el lanzamiento
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date()
    const difference = LAUNCH_DATE.getTime() - now.getTime()

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  // Update countdown timer
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null // Evitar hydration mismatch
  }

  const developmentMilestones = [
    { phase: 'Core IA Engine', status: 'completed', progress: 100 },
    { phase: 'Multi-plataforma', status: 'completed', progress: 100 },
    { phase: 'RAG System', status: 'completed', progress: 100 },
    { phase: 'Analytics Dashboard', status: 'in-progress', progress: 85 },
    { phase: 'Beta Testing', status: 'upcoming', progress: 15 },
    { phase: 'Production Launch', status: 'upcoming', progress: 0 }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-200/20 via-red-200/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <Rocket className="w-4 h-4 mr-2" />
              Próximo Lanzamiento
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Únete al{' '}
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
                Futuro
              </span>{' '}
              de la Atención al Cliente
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolucionamos la manera en que las empresas latinoamericanas se conectan con sus clientes. 
              El momentum está creciendo, la tecnología está lista.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6" />
                  Lanzamiento en Octubre 2025
                </h3>
                <p className="text-orange-100">Acceso temprano limitado - Regístrate ahora</p>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: timeLeft.days, label: 'Días' },
                  { value: timeLeft.hours, label: 'Horas' },
                  { value: timeLeft.minutes, label: 'Minutos' },
                  { value: timeLeft.seconds, label: 'Segundos' }
                ].map((time) => (
                  <motion.div
                    key={time.label}
                    variants={countVariants}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="text-3xl md:text-4xl font-bold">{time.value}</div>
                    <div className="text-sm text-orange-100">{time.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Registrations */}
            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-all duration-300">
              <motion.div
                variants={countVariants}
                className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "backOut" }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {stats.total_registrations.toLocaleString()}+
              </motion.div>
              <p className="text-gray-600">Empresas en lista de espera</p>
              <Badge variant="outline" className="mt-3 bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Creciendo rápido
              </Badge>
            </Card>

            {/* Countries */}
            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-red-100 hover:shadow-lg transition-all duration-300">
              <motion.div
                variants={countVariants}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Globe className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {stats.countries_represented}+
              </motion.div>
              <p className="text-gray-600">Países representados</p>
              <Badge variant="outline" className="mt-3 bg-orange-50 text-orange-700 border-orange-200">
                <Globe className="w-3 h-3 mr-1" />
                Expansión LATAM
              </Badge>
            </Card>

            {/* Development Progress */}
            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
              <motion.div
                variants={countVariants}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <BarChart3 className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "backOut", delay: 0.4 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {DEVELOPMENT_PROGRESS}%
              </motion.div>
              <p className="text-gray-600">Desarrollo completado</p>
              <Badge variant="outline" className="mt-3 bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Beta en pruebas
              </Badge>
            </Card>
          </motion.div>

          {/* Industries Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Industrias que confían en NeurAnt
              </h3>
              <p className="text-gray-600">
                Empresas de diversos sectores ya están preparándose para la revolución
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {stats.top_industries.map((industry, index) => (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Badge variant="outline" className="px-4 py-2 bg-white/70 border-gray-200 hover:border-orange-300 transition-colors">
                    {industry.name} ({industry.registrations})
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Development Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8 bg-white/50 backdrop-blur-sm border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Roadmap de Desarrollo
              </h3>
              
              <div className="space-y-4">
                {developmentMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/70"
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-orange-500' :
                      'bg-gray-300'
                    }`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{milestone.phase}</span>
                        <span className="text-sm text-gray-600">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>

                    {milestone.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {milestone.status === 'in-progress' && (
                      <Zap className="w-5 h-5 text-orange-500" />
                    )}
                    {milestone.status === 'upcoming' && (
                      <Calendar className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              <h3 className="text-2xl font-bold mb-4">
                El futuro llega en Octubre 2025
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Acceso temprano limitado. Las primeras 500 empresas obtendrán características exclusivas 
                y precios preferenciales de por vida.
              </p>
              
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  trackCTAClick('momentum_secure_spot', 'momentum_section');
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Asegurar mi lugar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-xs text-orange-200 mt-4">
                Sin compromiso • Cancela cuando quieras • Acceso prioritario garantizado
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}