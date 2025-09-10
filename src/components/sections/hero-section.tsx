'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowRight, Bot, Users, Building, Sparkles, MessageCircle, Zap } from 'lucide-react'
import { 
  staggerContainerVariants, 
  fadeInUpVariants, 
  floatingVariants, 
  glassCardVariants,
  morphingBlobVariants,
  textRevealVariants,
  parallaxVariants,
  generateParticles
} from '@/lib/animations'

interface StatsData {
  totalRegistrations: number
  countries: number
  topIndustries: Array<{
    name: string
    count: number
  }>
}

export function HeroSection() {
  const [stats, setStats] = useState<StatsData>({
    totalRegistrations: 247,
    countries: 12,
    topIndustries: [
      { name: 'E-commerce', count: 89 },
      { name: 'SaaS', count: 76 },
      { name: 'Fintech', count: 45 }
    ]
  })

  const particles = generateParticles(15)

  useEffect(() => {
    // Fetch stats from API to update default data
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          // Only update if we have valid data
          if (data && typeof data.totalRegistrations === 'number') {
            setStats(data)
          }
        }
      } catch (error) {
        // Keep default data, no need to handle error
        console.log('Using default stats data')
      }
    }

    fetchStats()
  }, [])


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-amber-100 dark:from-gray-900 dark:via-orange-950 dark:to-red-950">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Morphing Blobs */}
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-orange-400/30 to-red-400/30 dark:from-orange-500/20 dark:to-red-500/20 blur-3xl"
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-l from-amber-400/25 to-orange-400/25 dark:from-amber-500/15 dark:to-orange-500/15 blur-3xl"
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-t from-red-400/20 to-orange-400/20 dark:from-red-500/10 dark:to-orange-500/10 blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-100, typeof window !== 'undefined' ? -window.innerHeight - 100 : -800],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
      </div>

      {/* 3D Device Mockup */}
      <motion.div 
        className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block"
        variants={parallaxVariants}
        animate="animate"
      >
        <div className="relative">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="w-80 h-96 bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/50 shadow-2xl p-6"
            style={{
              transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
            }}
          >
            {/* Phone Screen */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 relative overflow-hidden">
              {/* Chat Interface */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">NeurAnt AI</span>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-3 text-white text-xs max-w-[80%]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  ¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?
                </motion.div>
                
                <motion.div 
                  className="bg-blue-500/20 rounded-2xl p-3 text-white text-xs max-w-[80%] ml-auto"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  Necesito información sobre sus servicios
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-3 text-white text-xs max-w-[80%]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.5 }}
                >
                  Te puedo ayudar con eso. Ofrecemos chatbots inteligentes que...
                </motion.div>
              </div>

              {/* Typing indicator */}
              <motion.div 
                className="absolute bottom-4 left-4 flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2.5s' }}
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8 lg:text-left lg:max-w-3xl"
        >
          {/* Coming Soon Badge */}
          <motion.div variants={fadeInUpVariants} className="flex justify-center lg:justify-start">
            <Badge 
              variant="outline" 
              className="px-6 py-3 text-sm font-medium bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-orange-200/50 dark:border-orange-800/50 text-orange-700 dark:text-orange-300 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Próximamente • Coming Soon
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={textRevealVariants} className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
              <motion.span 
                className="block bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent"
                variants={textRevealVariants}
              >
                NeurAnt
              </motion.span>
              <motion.span 
                className="block text-gray-900 dark:text-white mt-2"
                variants={textRevealVariants}
              >
                Chatbots
              </motion.span>
              <motion.span 
                className="block text-gray-900 dark:text-white"
                variants={textRevealVariants}
              >
                Inteligentes
              </motion.span>
              <motion.span 
                className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-600 dark:text-gray-300 mt-4"
                variants={textRevealVariants}
              >
                que revolucionan tu negocio
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p 
            variants={fadeInUpVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed"
          >
            Potencia tu empresa con asistentes de IA que comprenden, aprenden y responden 
            como expertos humanos. <strong className="text-orange-600 dark:text-orange-400">Aumenta tus ventas, reduce costos y mejora 
            la experiencia del cliente</strong> con tecnología de vanguardia.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUpVariants} className="pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 h-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 rounded-2xl font-semibold group"
              >
                <Users className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Únete a la Lista de Espera
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div variants={fadeInUpVariants} className="pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {/* Total Registrations */}
              <motion.div variants={glassCardVariants} whileHover="hover">
                <Card className="p-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-white/40 dark:border-gray-700/40 shadow-2xl group">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {stats.totalRegistrations.toLocaleString()}+
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Empresas registradas
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Countries */}
              <motion.div variants={glassCardVariants} whileHover="hover">
                <Card className="p-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-white/40 dark:border-gray-700/40 shadow-2xl group">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      {stats.countries}+
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Países atendidos
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Top Industry */}
              <motion.div variants={glassCardVariants} whileHover="hover">
                <Card className="p-8 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-white/40 dark:border-gray-700/40 shadow-2xl group">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Building className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        #{stats.topIndustries[0]?.name || 'E-commerce'}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Industria líder
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}