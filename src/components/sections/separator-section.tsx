'use client'

import { motion } from 'framer-motion'

export function SeparatorSection() {
  return (
    <section className="relative py-8 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-orange-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-red-100/20 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Subtle Divider Line */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-32 bg-gradient-to-r from-transparent to-orange-200" />
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <div className="h-px w-32 bg-gradient-to-l from-transparent to-orange-200" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}