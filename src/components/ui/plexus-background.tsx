'use client'

import { useEffect, useRef } from 'react'

interface PlexusNode {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<PlexusNode[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = Math.max(parent.offsetHeight, window.innerHeight)
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000)
      const oldNodes = [...nodesRef.current]
      nodesRef.current = []

      for (let i = 0; i < nodeCount; i++) {
        // Si ya existía un nodo en esta posición, mantener su velocidad
        const oldNode = oldNodes[i]
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: oldNode ? oldNode.vx : (Math.random() - 0.5) * 0.5,
          vy: oldNode ? oldNode.vy : (Math.random() - 0.5) * 0.5,
          connections: []
        })
      }
    }

    const updateNodes = () => {
      nodesRef.current.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })
    }

    const drawConnections = () => {
      const maxDistance = 150
      const nodes = nodesRef.current

      ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15
            ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`
            
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const drawNodes = () => {
      nodesRef.current.forEach(node => {
        ctx.fillStyle = 'rgba(249, 115, 22, 0.4)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = 'rgba(249, 115, 22, 0.6)'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(node.x, node.y, 0.8, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Solo animar si el canvas tiene dimensiones válidas
      if (canvas.width > 0 && canvas.height > 0) {
        updateNodes()
        drawConnections()
        drawNodes()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initNodes()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initNodes()
    }

    window.addEventListener('resize', handleResize)

    // Observer para detectar cambios en el tamaño del contenedor padre
    const resizeObserver = new ResizeObserver(() => {
      // Usar debounce para evitar redimensionamiento excesivo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        handleResize()
      }, 100)
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6, minHeight: '100%' }}
    />
  )
}