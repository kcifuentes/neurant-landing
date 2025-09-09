'use client'

import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowRight, Bot, Users, Building, Sparkles } from 'lucide-react'

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50 to-red-100 dark:from-slate-950 dark:via-orange-950 dark:to-red-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 dark:bg-orange-600 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-300 dark:bg-red-600 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-300 dark:bg-amber-600 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Coming Soon Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm font-medium bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Próximamente • Coming Soon
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                NeurAnt
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Chatbots Inteligentes
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-600 dark:text-gray-300">
                que revolucionan tu negocio
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Potencia tu empresa con asistentes de IA que comprenden, aprenden y responden 
            como expertos humanos. <strong>Aumenta tus ventas, reduce costos y mejora 
            la experiencia del cliente</strong> con tecnología de vanguardia.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Users className="w-5 h-5 mr-3" />
              Únete a la Lista de Espera
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div variants={itemVariants} className="pt-8">
            <div className="relative max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="text-center space-y-4"
                  >
                    <Bot className="w-16 h-16 mx-auto text-orange-500 dark:text-orange-400" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Demo del producto próximamente
                    </p>
                  </motion.div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 dark:border-gray-700/30">
                    <div className="w-0 h-0 border-l-[16px] border-l-blue-600 dark:border-l-blue-400 border-y-[12px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div variants={itemVariants} className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Total Registrations */}
              <Card className="p-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 hover:bg-white/15 dark:hover:bg-gray-900/25 transition-all duration-300">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                    {stats.totalRegistrations.toLocaleString()}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Empresas registradas
                  </div>
                </div>
              </Card>

              {/* Countries */}
              <Card className="p-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 hover:bg-white/15 dark:hover:bg-gray-900/25 transition-all duration-300">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-500">
                    {stats.countries}+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Países atendidos
                  </div>
                </div>
              </Card>

              {/* Top Industry */}
              <Card className="p-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm border-white/20 dark:border-gray-700/30 hover:bg-white/15 dark:hover:bg-gray-900/25 transition-all duration-300">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Building className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      #{stats.topIndustries[0]?.name || 'E-commerce'}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Industria líder
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}