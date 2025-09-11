'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { NeurAntLogo } from '@/components/ui/neurant-logo'
import { ArrowRight, Bot, Users, Sparkles, MessageCircle, Zap, Globe, Rocket } from 'lucide-react'
import { PlexusBackground } from '@/components/ui/plexus-background'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Plexus Background Effect - Full Section Coverage */}
      <PlexusBackground />
      
      {/* ULTRA DRAMATIC Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-lg" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/10 rounded-full blur-lg" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-300/8 rounded-full blur-md" />
        
        {/* MASSIVE Organic Shapes - Dominando la pantalla */}
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute -top-60 -left-60 w-[1400px] h-[1400px] bg-gradient-to-br from-orange-400/8 to-red-500/6 blur-[100px]"
          style={{
            borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
          }}
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute -top-40 -right-60 w-[1200px] h-[1600px] bg-gradient-to-bl from-amber-400/8 to-orange-500/6 blur-[120px]"
          style={{
            animationDelay: '3s',
            borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%",
          }}
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute -bottom-60 left-1/4 w-[1000px] h-[1000px] bg-gradient-to-tr from-red-400/8 to-amber-500/6 blur-[80px]"
          style={{
            animationDelay: '6s',
            borderRadius: "70% 30% 60% 40%/40% 70% 30% 60%",
          }}
        />
        
        {/* Additional Massive Shapes for Full Coverage */}
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute top-1/3 -right-80 w-[1600px] h-[800px] bg-gradient-to-l from-orange-300/6 to-red-400/5 blur-[150px]"
          style={{
            animationDelay: '9s',
            borderRadius: "40% 60% 30% 70%/60% 40% 70% 30%",
          }}
        />

        {/* Enhanced Floating Elements */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-90 shadow-lg shadow-orange-500/70 border border-orange-300/30"
            style={{
              left: `${particle.x}%`,
              width: particle.size * 4,
              height: particle.size * 4,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [-150, typeof window !== 'undefined' ? -window.innerHeight - 150 : -1000],
              opacity: [0, 0.6, 0],
              scale: [0.3, 2, 0.3],
              rotate: [0, 720],
            }}
            transition={{
              duration: particle.duration * 2,
              repeat: Infinity,
              delay: particle.delay + 2, // Delay adicional de 2 segundos
              ease: "linear",
            }}
          />
        ))}
        
        {/* Dramatic Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
        
        {/* Intense Light Focus */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-red-300/15 rounded-full blur-[200px]" />
      </div>

      {/* ULTRA SOPHISTICATED 3D Device Stack - Profundidad Extrema */}
      <motion.div 
        className="absolute right-20 top-1/2 transform -translate-y-1/2 hidden 2xl:block"
        variants={parallaxVariants}
        animate="animate"
      >
        <div className="relative" style={{ perspective: '2000px' }}>
          {/* Main Device - Ultra 3D */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="w-[28rem] h-[36rem] relative"
            style={{
              transform: 'perspective(2000px) rotateY(-25deg) rotateX(10deg) rotateZ(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ultra Dramatic Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/60 to-red-500/60 blur-[100px] scale-110 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-tl from-red-400/40 to-orange-400/40 blur-[60px] scale-105 opacity-60" />
            
            {/* Device Frame - Ultra Premium Glass */}
            <div className="w-full h-full bg-gradient-to-br from-white/40 to-white/15 backdrop-blur-sm rounded-[3rem] border-4 border-white/50 shadow-[0_60px_150px_rgba(0,0,0,0.4)] p-6 relative overflow-hidden group">
              {/* Multiple Screen Glow Layers */}
              <div className="absolute inset-4 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-[2.5rem] blur-lg animate-pulse" />
              <div className="absolute inset-6 bg-gradient-to-tl from-red-400/20 to-orange-400/20 rounded-[2rem] blur-md animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Ultra Advanced Screen Content */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-[2.5rem] p-8 overflow-hidden border-2 border-gray-700/50">
                {/* Dynamic Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-red-500/15 to-amber-500/15 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tl from-red-400/10 to-orange-400/10 animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Ultra Premium Header */}
                <div className="relative flex items-center space-x-4 mb-8 pb-6 border-b border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/30">
                    <Bot className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }} />
                  </div>
                  <div>
                    <span className="text-white text-2xl font-black tracking-wide" style={{ textShadow: '0 0 20px rgba(255,255,255,0.8)' }}><NeurAntLogo fontSize="1.5rem" isDarkBackground={true} className="inline" /> AI</span>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      <span className="text-green-400 text-lg font-semibold">En línea • Ultra Activo</span>
                    </div>
                  </div>
                </div>
                
                {/* Ultra Sophisticated Chat Messages */}
                <div className="space-y-6">
                  <motion.div 
                    className="relative bg-gradient-to-r from-orange-500/40 to-red-500/40 backdrop-blur-sm rounded-3xl p-6 text-white max-w-[90%] border-2 border-orange-500/30 shadow-2xl"
                    initial={{ opacity: 0, x: -40, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 120 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl" />
                    <span className="relative text-lg font-medium">¡Hola! 👋 Soy tu asistente de IA ultra especializado. ¿Cómo puedo transformar tu negocio hoy?</span>
                  </motion.div>
                  
                  <motion.div 
                    className="relative bg-gradient-to-l from-blue-500/40 to-indigo-500/40 backdrop-blur-sm rounded-3xl p-6 text-white max-w-[90%] ml-auto border-2 border-blue-500/30 shadow-2xl"
                    initial={{ opacity: 0, x: 40, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 120 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent rounded-3xl" />
                    <span className="relative text-lg font-medium">Quiero automatizar completamente mi atención al cliente</span>
                  </motion.div>
                  
                  <motion.div 
                    className="relative bg-gradient-to-r from-orange-500/40 to-red-500/40 backdrop-blur-sm rounded-3xl p-6 text-white max-w-[90%] border-2 border-orange-500/30 shadow-2xl"
                    initial={{ opacity: 0, x: -40, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.8, type: "spring", stiffness: 120 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl" />
                    <div className="relative">
                      <span className="text-lg font-medium flex items-center gap-2">
                        ¡Perfecto! <Rocket className="w-5 h-5 text-orange-400" /> Implemento soluciones que:
                      </span>
                      <ul className="mt-3 text-base space-y-2 opacity-95">
                        <li className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-3 shadow-lg shadow-green-400/50"></span>Reducen costos 80%+</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-lg shadow-blue-400/50"></span>Atienden 24/7 sin parar</li>
                        <li className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-3 shadow-lg shadow-purple-400/50"></span>Escalan infinitamente</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Ultra Premium Typing Indicator */}
                <motion.div 
                  className="absolute bottom-8 left-8 flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 0.6 }}
                >
                  <span className="text-white text-base font-semibold"><NeurAntLogo fontSize="1rem" isDarkBackground={true} className="inline" /> está revolucionando</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce shadow-lg shadow-orange-400/50" />
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce shadow-lg shadow-orange-400/50" style={{ animationDelay: '0.15s' }} />
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce shadow-lg shadow-orange-400/50" style={{ animationDelay: '0.3s' }} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Ultra Dramatic Floating UI Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-[2rem] flex items-center justify-center shadow-[0_30px_80px_rgba(249,115,22,0.6)] backdrop-blur-sm border-3 border-white/40"
            variants={floatingVariants}
            animate="animate"
            style={{ 
              animationDelay: '0.5s',
              transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)'
            }}
          >
            <MessageCircle className="w-16 h-16 text-white" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' }} />
          </motion.div>

          <motion.div
            className="absolute -bottom-12 -right-12 w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_25px_70px_rgba(251,146,60,0.6)] backdrop-blur-sm border-3 border-white/40"
            variants={floatingVariants}
            animate="animate"
            style={{ 
              animationDelay: '1.5s',
              transform: 'perspective(1000px) rotateY(15deg) rotateX(-5deg)'
            }}
          >
            <Zap className="w-14 h-14 text-white" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' }} />
          </motion.div>

          <motion.div
            className="absolute top-1/3 -left-24 w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(239,68,68,0.6)] backdrop-blur-sm border-3 border-white/40"
            variants={floatingVariants}
            animate="animate"
            style={{ 
              animationDelay: '2s',
              transform: 'perspective(1000px) rotateY(-10deg) rotateX(10deg)'
            }}
          >
            <Sparkles className="w-12 h-12 text-white" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' }} />
          </motion.div>

          {/* Additional Floating Elements for Ultra Depth */}
          <motion.div
            className="absolute bottom-1/4 -right-28 w-20 h-20 bg-gradient-to-br from-purple-400 to-red-400 rounded-2xl flex items-center justify-center shadow-[0_20px_60px_rgba(168,85,247,0.5)] backdrop-blur-sm border-2 border-white/40"
            variants={floatingVariants}
            animate="animate"
            style={{ 
              animationDelay: '2.5s',
              transform: 'perspective(1000px) rotateY(20deg) rotateX(-10deg)'
            }}
          >
            <Globe className="w-10 h-10 text-white" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8))' }} />
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 overflow-hidden">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center xl:text-left max-w-full xl:max-w-6xl space-y-12 sm:space-y-16"
        >
          {/* ULTRA PREMIUM Badge - Cinematográfico */}
          <motion.div variants={fadeInUpVariants} className="flex justify-center xl:justify-start">
            <Badge 
              variant="outline" 
              className="px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-sm sm:text-lg lg:text-xl font-black bg-white/95 border-2 border-white/80 text-orange-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl sm:rounded-2xl max-w-full"
            >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 lg:mr-4 animate-pulse text-orange-600" />
                <span className="bg-gradient-to-r from-orange-800 via-red-700 to-orange-800 bg-clip-text text-transparent break-words">
                  DISPONIBLE AHORA • CHATBOTS MULTI-CANAL
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 lg:ml-4 animate-pulse text-orange-600" />
              </Badge>
          </motion.div>

          {/* CINEMATOGRAPHIC Main Headline - Ultra Dramático */}
          <motion.div variants={textRevealVariants} className="space-y-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.85] text-white break-words" role="banner" aria-label="NeurAnt - Chatbots Inteligentes que revolucionan tu negocio">
              <motion.div 
                className="relative mb-8"
                variants={textRevealVariants}
              >
                <span className="relative inline-block">
                  {/* Reduced Glow Effects */}
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 blur-lg opacity-15" />
                  
                  {/* Main Text with Reduced Glow */}
                  <span 
                    className="relative font-black bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                    style={{
                      textShadow: `
                        0 0 10px rgba(249, 115, 22, 0.3),
                        0 0 20px rgba(249, 115, 22, 0.2),
                        1px 1px 4px rgba(0, 0, 0, 0.6)
                      `
                    }}
                  >
                    <NeurAntLogo fontSize="clamp(1.875rem, 8vw, 4.5rem)" isDarkBackground={true} className="inline" />
                  </span>
                </span>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                variants={textRevealVariants}
              >
                <div className="relative">
                  <span 
                    className="text-white font-black"
                    style={{
                      textShadow: `
                        0 0 20px rgba(255, 255, 255, 0.3),
                        0 0 40px rgba(255, 255, 255, 0.1),
                        2px 2px 8px rgba(0, 0, 0, 0.8)
                      `
                    }}
                  >
                    Chatbots
                  </span>
                </div>
                <div className="relative">
                  <span 
                    className="text-white font-black"
                    style={{
                      textShadow: `
                        0 0 20px rgba(255, 255, 255, 0.2),
                        0 0 40px rgba(251, 146, 60, 0.2),
                        2px 2px 8px rgba(0, 0, 0, 0.8)
                      `
                    }}
                  >
                    Inteligentes
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white/90 tracking-wide break-words"
                variants={textRevealVariants}
                style={{
                  textShadow: `
                    0 0 15px rgba(255, 255, 255, 0.2),
                    0 0 30px rgba(251, 146, 60, 0.15),
                    2px 2px 6px rgba(0, 0, 0, 0.8)
                  `
                }}
              >
                que <span className="text-orange-200 font-black">REVOLUCIONAN</span> tu negocio
              </motion.div>
            </h1>
          </motion.div>

          {/* ULTRA CINEMATOGRAPHIC Subheadline */}
          <motion.div 
            variants={fadeInUpVariants}
            className="space-y-12"
          >
            <div className="space-y-8">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-white/95 max-w-5xl leading-relaxed tracking-wide">
                Automatiza tu atención al cliente en{' '}
                <span 
                  className="font-black text-orange-200"
                  style={{
                    textShadow: '0 0 30px rgba(251, 146, 60, 0.6)'
                  }}
                >
                  WhatsApp, Telegram y Slack
                </span>{' '}
                con asistentes de IA que responden como{' '}
                <span 
                  className="font-black text-white"
                  style={{
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  expertos humanos
                </span>.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white/80 max-w-4xl leading-relaxed">
                Con integraciones nativas para{' '}
                <span className="font-semibold text-orange-100">Google Calendar</span>, {' '}
                <span className="font-semibold text-orange-100">Gmail</span>, {' '}
                <span className="font-semibold text-orange-100">Shopify</span>{' '}
                y más herramientas que tu empresa ya usa.
              </p>
            </div>
            
            {/* ULTRA DRAMATIC Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              <motion.div 
                className="relative group cursor-pointer"
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white/15 rounded-3xl p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-6xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>+80%</div>
                  <div className="text-xl text-white/90 font-semibold">Reducción de costos</div>
                  <div className="text-sm text-white/60 mt-2">Impacto inmediato</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative group cursor-pointer"
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/30 group-hover:border-white/50 transition-all duration-500">
                  <div className="text-6xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>24/7</div>
                  <div className="text-xl text-white/90 font-semibold">Atención continua</div>
                  <div className="text-sm text-white/60 mt-2">Sin descanso</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative group cursor-pointer"
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/30 group-hover:border-white/50 transition-all duration-500">
                  <div className="text-5xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>HITL</div>
                  <div className="text-xl text-white/90 font-semibold">Soporte Humano</div>
                  <div className="text-sm text-white/60 mt-2">Cuando sea necesario</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ULTRA PREMIUM CTAs - Cinematográficos */}
          <motion.div variants={fadeInUpVariants} className="pt-16">
            <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center xl:justify-start items-center sm:items-stretch">
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-lg sm:text-xl lg:text-2xl px-8 sm:px-12 lg:px-16 py-6 sm:py-8 lg:py-10 h-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-black shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl sm:rounded-3xl border-0"
                  aria-label="Únete a la Lista de Espera de NeurAnt"
                >
                  <Users className="w-6 h-6 mr-3" />
                  <span>ÚNETE A LA LISTA DE ESPERA</span>
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
              
            </div>
            
            {/* Ultra Subtle Call to Action Text */}
            <motion.p 
              className="mt-12 text-center xl:text-left text-lg text-white/60 max-w-2xl font-light tracking-wide"
              variants={fadeInUpVariants}
            >
              Únete a más de <span className="text-orange-300 font-semibold">247+ empresas</span> que ya están 
              transformando su atención al cliente con inteligencia artificial
            </motion.p>
          </motion.div>

          {/* ULTRA PREMIUM Social Proof - Nivel Cinematográfico */}
          <motion.div variants={fadeInUpVariants} className="pt-24">
            <div className="text-center mb-16">
              <motion.p 
                className="text-2xl md:text-3xl text-white/80 font-light tracking-wide max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUpVariants}
                style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              >
                Empresas de <span className="font-bold text-orange-200">vanguardia</span> ya están transformando 
                su atención al cliente con <span className="font-bold text-white"><NeurAntLogo fontSize="clamp(1.5rem, 4vw, 1.875rem)" isDarkBackground={true} className="inline" /></span>
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Total Registrations - Ultra Dramático */}
              <motion.div 
                variants={glassCardVariants} 
                whileHover={{ scale: 1.08, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  {/* Multiple Glow Effects */}
                  <Card className="p-12 bg-white/20 border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center space-y-4 relative z-10 flex flex-col justify-center h-full">
                      <div 
                        className="text-7xl font-black text-white mb-6" 
                        style={{ 
                          textShadow: `
                            0 0 30px rgba(255, 255, 255, 0.8),
                            0 0 60px rgba(249, 115, 22, 0.6),
                            0 0 100px rgba(249, 115, 22, 0.4)
                          ` 
                        }}
                      >
                        {stats.totalRegistrations.toLocaleString()}+
                      </div>
                      <div className="text-2xl font-bold text-orange-200 tracking-wide">
                        Empresas Registradas
                      </div>
                      <div className="text-lg text-white/70 font-medium">
                        Y creciendo exponencialmente
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Countries - Ultra Dramático */}
              <motion.div 
                variants={glassCardVariants} 
                whileHover={{ scale: 1.08, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  
                  <Card className="relative p-12 h-80 bg-white/20 backdrop-blur-sm border-3 border-white/40 hover:border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.3)] group transition-all duration-700 rounded-[2rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center space-y-4 relative z-10 flex flex-col justify-center h-full">
                      <div 
                        className="text-7xl font-black text-white mb-6" 
                        style={{ 
                          textShadow: `
                            0 0 30px rgba(255, 255, 255, 0.8),
                            0 0 60px rgba(251, 146, 60, 0.6),
                            0 0 100px rgba(251, 146, 60, 0.4)
                          ` 
                        }}
                      >
                        {stats.countries}+
                      </div>
                      <div className="text-2xl font-bold text-orange-200 tracking-wide">
                        Países Conquistados
                      </div>
                      <div className="text-lg text-white/70 font-medium">
                        Expansión global imparable
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Top Industry - Ultra Dramático */}
              <motion.div 
                variants={glassCardVariants} 
                whileHover={{ scale: 1.08, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  
                  <Card className="relative p-12 h-80 bg-white/20 backdrop-blur-sm border-3 border-white/40 hover:border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.3)] group transition-all duration-700 rounded-[2rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center space-y-4 relative z-10 flex flex-col justify-center h-full">
                      <div className="mb-6">
                        <div 
                          className="text-4xl font-black text-white"
                          style={{ 
                            textShadow: `
                              0 0 20px rgba(255, 255, 255, 0.8),
                              0 0 40px rgba(249, 115, 22, 0.6)
                            ` 
                          }}
                        >
                          #{stats.topIndustries[0]?.name?.replace('-', '\u2011') || 'E\u2011commerce'}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-orange-200 tracking-wide">
                        Industria Líder
                      </div>
                      <div className="text-lg text-white/70 font-medium">
                        Dominio absoluto del mercado
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
            
            {/* Ultra Premium Trust Indicators */}
            <motion.div 
              className="mt-20 text-center"
              variants={fadeInUpVariants}
            >
              <div className="text-white/50 text-xl font-light mb-8 tracking-widest">CONFIADO POR LÍDERES GLOBALES</div>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
                  <span className="text-white/80 text-lg font-bold tracking-wide">STARTUPS</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
                  <span className="text-white/80 text-lg font-bold tracking-wide">PYMES</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
                  <span className="text-white/80 text-lg font-bold tracking-wide">ENTERPRISE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}