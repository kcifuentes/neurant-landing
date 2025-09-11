import { type Variants } from 'framer-motion'

// Variant configurations for advanced animations
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.98 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0
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
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    rotate: [-1, 1, -1],
    transition: {
      duration: 12,
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

export const tabletFloatingVariants: Variants = {
  animate: {
    y: [-15, 15],
    x: [-3, 3], 
    rotate: [-0.5, 0.5],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

export const tabletParallaxVariants: Variants = {
  animate: {
    y: [-30, 30],
    transition: {
      duration: 10,
      repeat: Infinity, 
      repeatType: "reverse",
      ease: "easeInOut"
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
    scale: [1, 1.05, 1],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const textRevealVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    rotateX: 0
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
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

// Animation utilities - Fixed values for SSR compatibility
export const generateParticles = (count: number) => {
  // Using deterministic values based on index to avoid hydration mismatch
  const baseValues = [
    { size: 12, x: 15, delay: 0.5, duration: 6 },
    { size: 10, x: 25, delay: 1, duration: 7 },
    { size: 16, x: 40, delay: 1.5, duration: 8 },
    { size: 14, x: 60, delay: 2, duration: 6.5 },
    { size: 18, x: 75, delay: 2.5, duration: 7.5 },
    { size: 12, x: 85, delay: 3, duration: 6 },
    { size: 15, x: 10, delay: 0.8, duration: 7 },
    { size: 11, x: 30, delay: 1.2, duration: 6.8 },
    { size: 20, x: 50, delay: 1.8, duration: 7.2 },
    { size: 13, x: 70, delay: 2.2, duration: 6.5 },
    { size: 17, x: 90, delay: 2.8, duration: 7.8 },
    { size: 14, x: 20, delay: 3.2, duration: 6.2 },
    { size: 12, x: 35, delay: 0.3, duration: 7.3 },
    { size: 19, x: 55, delay: 1.3, duration: 6.7 },
    { size: 16, x: 80, delay: 2.3, duration: 7.7 }
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: baseValues[i % baseValues.length].size,
    x: baseValues[i % baseValues.length].x,
    delay: baseValues[i % baseValues.length].delay,
    duration: baseValues[i % baseValues.length].duration
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