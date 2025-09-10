'use client'

import { motion } from 'framer-motion'
import { Bot, Mail, MapPin } from 'lucide-react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const productLinks = [
  { name: 'Características', href: '#features' },
  { name: 'Progreso', href: '#momentum' },
  { name: 'Lista de Espera', href: '#waitlist' },
  { name: 'Demo en Vivo', href: '#demo' }
]

const companyLinks = [
  { name: 'Acerca de', href: '#about' },
  { name: 'Contacto', href: '#contact' },
  { name: 'Blog', href: '#blog' },
  { name: 'Carreras', href: '#careers' }
]

const legalLinks = [
  { name: 'Términos de Servicio', href: '#terms' },
  { name: 'Política de Privacidad', href: '#privacy' },
  { name: 'Cookies', href: '#cookies' }
]

const socialLinks = [
  { name: 'Twitter', icon: FaTwitter, href: '#twitter' },
  { name: 'LinkedIn', icon: FaLinkedin, href: '#linkedin' },
  { name: 'GitHub', icon: FaGithub, href: '#github' }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Bot className="h-8 w-8 text-orange-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                NeurAnt
              </span>
            </div>
            <p className="text-slate-300 text-lg mb-6 max-w-md">
              La plataforma de chatbots inteligentes que revoluciona la atención al cliente con IA avanzada y integración perfecta.
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>contacto@neurant.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Latinoamérica</span>
              </div>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white mb-6">Producto</h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white mb-6">Empresa</h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-700/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              © {currentYear} NeurAnt. Todos los derechos reservados.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                  {index < legalLinks.length - 1 && (
                    <span className="text-slate-600">•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => scrollToSection(social.href)}
                  className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}