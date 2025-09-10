import { type Variants } from 'framer-motion'

// Variant configurations for advanced animations
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export const scaleInVariants: Variants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
}

export const floatingVariants: Variants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const parallaxVariants: Variants = {
  animate: {
    y: [-50, 50],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const magneticHoverVariants: Variants = {
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

export const glassCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    backdropFilter: "blur(0px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    backdropFilter: "blur(20px)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    backdropFilter: "blur(25px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

export const morphingBlobVariants: Variants = {
  animate: {
    borderRadius: [
      "60% 40% 30% 70%/60% 30% 70% 40%",
      "30% 60% 70% 40%/50% 60% 30% 60%",
      "60% 40% 30% 70%/60% 30% 70% 40%"
    ],
    scale: [1, 1.1, 1],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const textRevealVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const particleVariants: Variants = {
  animate: {
    y: [-100, -500],
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.5, 1]
    }
  }
}

// Animation utilities
export const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 4
  }))
}

export const easeInOutCubic = [0.25, 0.46, 0.45, 0.94]
export const easeOutBack = [0.34, 1.56, 0.64, 1]
export const easeInOutBack = [0.68, -0.55, 0.265, 1.55]

// Viewport intersection options for scroll animations
export const viewportOptions = {
  once: true,
  margin: "-50px",
  amount: 0.3
}

// Spring configurations
export const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20
}

export const bounceConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 10,
  bounce: 0.3
}