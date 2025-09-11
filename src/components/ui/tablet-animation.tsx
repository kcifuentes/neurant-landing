'use client'

import { motion } from 'framer-motion'
import { Bot, MessageCircle, Sparkles } from 'lucide-react'
import { floatingVariants, tabletFloatingVariants, tabletParallaxVariants } from '@/lib/animations'

interface TabletAnimationProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function TabletAnimation({ className = '', size = 'md' }: TabletAnimationProps) {
  // Tamaños según la prop size
  const sizeClasses = {
    sm: 'w-[10rem] h-[14rem] lg:w-[12rem] lg:h-[16rem]',
    md: 'w-[12rem] h-[16rem] lg:w-[14rem] lg:h-[18rem] xl:w-[16rem] xl:h-[20rem]',
    lg: 'w-[16rem] h-[22rem] lg:w-[18rem] lg:h-[24rem] xl:w-[20rem] xl:h-[26rem]'
  }

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={tabletParallaxVariants}
      animate="animate"
    >
      <div className="relative" style={{ perspective: '1500px' }}>
        {/* Main Device */}
        <motion.div
          variants={tabletFloatingVariants}
          animate="animate"
          className={`${sizeClasses[size]} relative mx-auto`}
          style={{
            transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg) rotateZ(1deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Efectos de resplandor */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-500/30 blur-[40px] scale-110 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-red-400/20 to-orange-400/20 blur-[25px] scale-105 opacity-40" />
          
          {/* Device Frame */}
          <div className="w-full h-full bg-gradient-to-br from-white/40 to-white/15 backdrop-blur-sm rounded-[1.5rem] lg:rounded-[2rem] border-2 lg:border-3 border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-3 lg:p-4 relative overflow-hidden group">
            {/* Capas de resplandor de pantalla */}
            <div className="absolute inset-2 lg:inset-3 bg-gradient-to-br from-orange-500/25 to-red-500/25 rounded-[1rem] lg:rounded-[1.5rem] blur-md animate-pulse" />
            <div className="absolute inset-3 lg:inset-4 bg-gradient-to-tl from-red-400/15 to-orange-400/15 rounded-[0.75rem] lg:rounded-[1rem] blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Contenido de pantalla */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-[1rem] lg:rounded-[1.5rem] p-3 lg:p-4 overflow-hidden border border-gray-700/50">
              {/* Fondo animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-amber-500/10 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-red-400/8 to-orange-400/8 animate-pulse" style={{ animationDelay: '2s' }} />
              
              {/* Header */}
              <div className="relative flex items-center space-x-2 mb-3 pb-2 border-b border-white/15">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-xl border border-white/30">
                  <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }} />
                </div>
                <div>
                  <span className="text-white text-sm lg:text-base font-black tracking-wide" style={{ textShadow: '0 0 15px rgba(255,255,255,0.6)' }}>
                    NeurAnt AI
                  </span>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                    <span className="text-green-300 text-xs font-medium tracking-wide" style={{ textShadow: '0 0 10px rgba(134, 239, 172, 0.6)' }}>
                      En línea • Ultra Activo
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="space-y-2 lg:space-y-3 mb-2">
                {/* Message 1 - Bot */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="relative bg-gradient-to-r from-orange-500/35 to-red-500/35 backdrop-blur-sm rounded-lg lg:rounded-xl p-2 lg:p-3 text-white max-w-[85%] border border-orange-500/25 shadow-lg"
                >
                  <div className="text-xs lg:text-sm font-medium leading-tight">
                    ¡Hola! 👋 Soy tu asistente de IA ultra especializado.
                    ¿Cómo puedo transformar tu negocio hoy?
                  </div>
                </motion.div>

                {/* Message 2 - User */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="relative bg-gradient-to-l from-blue-500/35 to-indigo-500/35 backdrop-blur-sm rounded-lg lg:rounded-xl p-2 lg:p-3 text-white max-w-[85%] ml-auto border border-blue-500/25 shadow-lg"
                >
                  <div className="text-xs lg:text-sm font-medium leading-tight">
                    Quiero automatizar completamente mi atención al cliente
                  </div>
                </motion.div>

                {/* Message 3 - Bot typing */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="relative bg-gradient-to-r from-orange-500/35 to-red-500/35 backdrop-blur-sm rounded-lg lg:rounded-xl p-2 lg:p-3 text-white max-w-[85%] border border-orange-500/25 shadow-lg"
                >
                  <div className="text-xs lg:text-sm font-medium leading-tight">
                    <div className="flex items-center space-x-1">
                      <span>NeurAnt está revolucionando</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-1 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-1 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                    <div className="text-xs text-orange-200/80 mt-1">soluciones que...</div>
                  </div>
                </motion.div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs font-medium">Activo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elementos flotantes */}
        <motion.div
          className="absolute -top-3 -left-3 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-[0_10px_25px_rgba(249,115,22,0.4)] backdrop-blur-sm border border-white/30"
          variants={floatingVariants}
          animate="animate"
          style={{ 
            animationDelay: '0.5s',
            transform: 'perspective(800px) rotateY(-10deg) rotateX(3deg)'
          }}
        >
          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))' }} />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-[0_8px_20px_rgba(251,146,60,0.4)] backdrop-blur-sm border border-white/30"
          variants={floatingVariants}
          animate="animate"
          style={{ 
            animationDelay: '1s',
            transform: 'perspective(800px) rotateY(-15deg) rotateX(8deg)'
          }}
        >
          <Bot className="w-4 h-4 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))' }} />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center shadow-[0_6px_15px_rgba(248,113,113,0.4)] backdrop-blur-sm border border-white/30"
          variants={floatingVariants}
          animate="animate"
          style={{ 
            animationDelay: '2s',
            transform: 'perspective(800px) rotateY(-8deg) rotateX(6deg)'
          }}
        >
          <Sparkles className="w-4 h-4 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))' }} />
        </motion.div>
      </div>
    </motion.div>
  )
}