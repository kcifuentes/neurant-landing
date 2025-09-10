'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { NeurAntLogo } from '@/components/ui/neurant-logo'
import { Bot, Menu } from 'lucide-react'

const navigationItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Características', href: '#features' },
  { name: 'Progreso', href: '#momentum' },
  { name: 'Lista de Espera', href: '#waitlist' }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
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
    setIsMobileMenuOpen(false)
  }

  const scrollToWaitlist = () => {
    scrollToSection('#waitlist')
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Bot className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
            </div>
            <NeurAntLogo fontSize="1.5rem" isDarkBackground={false} />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-orange-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-200" />
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              onClick={scrollToWaitlist}
              className="relative bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-primary-foreground px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Únete a la Lista de Espera
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-orange-600 blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 px-6 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-2xl">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between py-6 border-b border-border/20">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Bot className="h-7 w-7 text-primary" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
                      </div>
                      <NeurAntLogo fontSize="1.25rem" isDarkBackground={false} />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-8">
                    <div className="space-y-6">
                      {navigationItems.map((item, index) => (
                        <motion.button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="flex items-center w-full text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 8 }}
                        >
                          {item.name}
                        </motion.button>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="py-6 border-t border-border/20">
                    <Button 
                      onClick={scrollToWaitlist}
                      className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-primary-foreground py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Únete a la Lista de Espera
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}