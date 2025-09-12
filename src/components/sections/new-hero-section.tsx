'use client'

import { useWaitlistMetrics } from '../../hooks/use-waitlist-metrics'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { trackCTAClick } from '@/components/analytics/google-analytics'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { NeurAntLogo } from '@/components/ui/neurant-logo'
import { TabletAnimation } from '@/components/ui/tablet-animation'
import { ArrowRight, Users } from 'lucide-react'
import { PlexusBackground } from '@/components/ui/plexus-background'
import { 
  staggerContainerVariants, 
  fadeInUpVariants, 
  glassCardVariants,
  morphingBlobVariants,
  textRevealVariants,
  generateParticles
} from '@/lib/animations'

export function NewHeroSection() {
  const { metrics } = useWaitlistMetrics()
  
  const particles = generateParticles(15)

  // Use metrics data or fallback values
  const displayStats = {
    totalRegistrations: metrics?.totalCompanies || 12,
    countries: metrics?.totalCountries || 3,
    industries: metrics?.totalIndustries || 1
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Effects */}
      <PlexusBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Morphing Background Blobs */}
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-red-300/15 rounded-full blur-[200px]"
        />
        <motion.div 
          variants={morphingBlobVariants}
          animate="animate"
          style={{ animationDelay: '5s' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-red-300/15 to-orange-300/20 rounded-full blur-[180px]"
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-40"
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
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        
        {/* PARTE SUPERIOR: Hero Principal (2 columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start mb-16 lg:mb-20">
          
          {/* Columna Izquierda: Badge + Título + Descripción */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUpVariants} className="flex justify-center lg:justify-start">
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm font-black bg-white/95 border-2 border-white/80 text-orange-900 shadow-lg rounded-xl"
              >
                DISPONIBLE AHORA • CHATBOTS MULTI-CANAL
              </Badge>
            </motion.div>
            
            {/* Título */}
            <motion.div variants={textRevealVariants}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4">
                <NeurAntLogo fontSize="clamp(2rem, 6vw, 3.5rem)" isDarkBackground={true} className="inline mb-2" />
              </h1>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
                Chatbots<br />Inteligentes
              </h2>
              <h3 className="text-2xl lg:text-3xl font-black text-white/90 mb-6">
                que <span className="text-orange-200">REVOLUCIONAN</span> tu negocio
              </h3>
            </motion.div>
            
            {/* Descripción completa */}
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <p className="text-lg lg:text-xl text-white/95 leading-relaxed">
                Automatiza tu atención al cliente en{' '}
                <span className="font-semibold text-orange-200">WhatsApp, Telegram y Slack</span>{' '}
                con asistentes de IA que responden como{' '}
                <span className="font-semibold text-white">expertos humanos</span>.
              </p>
              
              <p className="text-base lg:text-lg text-white/80 leading-relaxed">
                Con integraciones nativas para{' '}
                <span className="font-semibold text-orange-100">Google Calendar</span>, {' '}
                <span className="font-semibold text-orange-100">Gmail</span>, {' '}
                <span className="font-semibold text-orange-100">Shopify</span>{' '}
                y más herramientas que tu empresa ya usa.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Columna Derecha: Tablet Animation (oculta en móvil) */}
          <div className="hidden lg:block">
            <TabletAnimation size="lg" className="mx-auto" />
          </div>
        </div>

        {/* PARTE MEDIA: Cards de Métricas (fila horizontal) */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="relative group cursor-pointer"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-white/15 rounded-3xl p-8 lg:p-10 border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-5xl lg:text-6xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>+80%</div>
                <div className="text-lg lg:text-xl text-white/90 font-semibold">Reducción de costos</div>
                <div className="text-sm text-white/60 mt-2">Impacto inmediato</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group cursor-pointer"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border-2 border-white/30 group-hover:border-white/50 transition-all duration-500">
                <div className="text-5xl lg:text-6xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>24/7</div>
                <div className="text-lg lg:text-xl text-white/90 font-semibold">Atención continua</div>
                <div className="text-sm text-white/60 mt-2">Sin descanso</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative group cursor-pointer"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="relative bg-white/15 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border-2 border-white/30 group-hover:border-white/50 transition-all duration-500">
                <div className="text-4xl lg:text-5xl font-black text-orange-200 mb-4" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.8)' }}>HITL</div>
                <div className="text-lg lg:text-xl text-white/90 font-semibold">Soporte Humano</div>
                <div className="text-sm text-white/60 mt-2">Cuando sea necesario</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* PARTE INFERIOR: CTA Primario */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              onClick={() => {
                trackCTAClick('hero_join_waitlist', 'hero_section');
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
        </motion.div>

        {/* Texto Social Proof */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-20"
        >
          <motion.p 
            className="text-lg text-white/60 font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUpVariants}
          >
            Únete a las <span className="text-orange-300 font-semibold">empresas pioneras</span> que han elegido 
            el futuro de la atención al cliente con inteligencia artificial
          </motion.p>
        </motion.div>

        {/* ULTRA PREMIUM Social Proof - Como sección separada */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12 sm:space-y-16"
        >
          {/* Social Proof Text */}
          <motion.div variants={fadeInUpVariants} className="pt-24">
            <div className="text-center mb-16">
              <motion.p 
                className="text-2xl md:text-3xl text-white/80 font-light tracking-wide max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUpVariants}
                style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              >
                Empresas de <span className="font-bold text-orange-200">vanguardia</span> confían en el futuro de 
                la atención al cliente con <span className="font-bold text-white"><NeurAntLogo fontSize="clamp(1.5rem, 4vw, 1.875rem)" isDarkBackground={true} className="inline" /></span>
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Total Registrations */}
              <motion.div 
                variants={glassCardVariants} 
                whileHover={{ scale: 1.08, y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative">
                  <Card className="p-12 bg-white/20 border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
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
                        {displayStats.totalRegistrations}+
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

              {/* Countries */}
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
                        {displayStats.countries}+
                      </div>
                      <div className="text-2xl font-bold text-orange-200 tracking-wide">
                        Países Confiando
                      </div>
                      <div className="text-lg text-white/70 font-medium">
                        Crecimiento global orgánico
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Top Industry */}
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
                          className="text-5xl font-black text-white mb-2" 
                          style={{ 
                            textShadow: `
                              0 0 20px rgba(255, 255, 255, 0.6),
                              0 0 40px rgba(251, 146, 60, 0.4)
                            ` 
                          }}
                        >
                          #Tecnología
                        </div>
                        <div className="text-3xl font-bold text-orange-200">
                          Industria Líder
                        </div>
                      </div>
                      <div className="text-lg text-white/70 font-medium">
                        Dominio absoluto del mercado
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
            
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