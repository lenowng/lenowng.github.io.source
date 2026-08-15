import { useEffect, useRef } from 'react'

const Hero3DCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.clientWidth || window.innerWidth
      height = canvas.height = canvas.clientHeight || window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Smooth cursor physics
    let mouseX = width * 0.65
    let mouseY = height * 0.4
    let targetMouseX = width * 0.65
    let targetMouseY = height * 0.4
    let velocityX = 0
    let velocityY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Scroll depth tracking
    let scrollY = window.scrollY
    let targetScrollY = window.scrollY
    const handleScroll = () => {
      targetScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    let time = 0

    const render = () => {
      time += 0.008
      ctx.clearRect(0, 0, width, height)

      // Spring physics interpolation
      const prevMouseX = mouseX
      const prevMouseY = mouseY
      mouseX += (targetMouseX - mouseX) * 0.03
      mouseY += (targetMouseY - mouseY) * 0.03
      velocityX = (mouseX - prevMouseX) * 0.6
      velocityY = (mouseY - prevMouseY) * 0.6
      scrollY += (targetScrollY - scrollY) * 0.04

      const speedMagnitude = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY), 20)
      const scrollOffset = scrollY * 0.12

      // Pure Minimalist Monochromatic 3D Kinetic Ribbons (Graphite/Ink on Crisp Canvas)
      const numRibbons = 8
      const numSegments = 60
      const centerX = width * 0.65
      const centerY = height * 0.45 - scrollOffset * 0.25

      for (let r = 0; r < numRibbons; r++) {
        const ribbonPhase = r * 0.45
        const baseThickness = 1.6 - r * 0.15

        ctx.beginPath()

        const ribbonPoints: { x: number; y: number }[] = []

        for (let i = 0; i <= numSegments; i++) {
          const t = i / numSegments
          
          // Harmonic 3D Parametric Wave Equations
          const theta = t * Math.PI * 3.0 + time * 0.3 + ribbonPhase
          const phi = t * Math.PI * 2.0 + time * 0.2 + (scrollY * 0.0015)
          
          const radiusX = 260 + Math.sin(time * 0.5 + t * 4.0 + ribbonPhase) * 55
          const radiusY = 150 + Math.cos(time * 0.4 + t * 3.0) * 45
          const radiusZ = 180 + Math.sin(theta) * 50

          // 3D Coordinates
          let x3d = Math.cos(theta) * radiusX + (t - 0.5) * 440
          let y3d = Math.sin(theta * 1.3 + phi) * radiusY + Math.sin(t * Math.PI * 2) * 55
          const z3d = Math.sin(theta) * radiusZ

          // Interactive fluid turbulence from cursor
          const dx = mouseX - (centerX + x3d * 0.55)
          const dy = mouseY - (centerY + y3d * 0.55)
          const distToCursor = Math.sqrt(dx * dx + dy * dy)
          const cursorInfluence = Math.max(0, 1 - distToCursor / 400) * (35 + speedMagnitude * 1.8)

          x3d += (dx / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)
          y3d += (dy / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)

          // 3D Perspective Projection
          const fov = 520
          const perspective = fov / (fov + z3d + 240)
          
          const projX = centerX + x3d * perspective
          const projY = centerY + y3d * perspective

          ribbonPoints.push({ x: projX, y: projY })
        }

        // Draw Spline Ribbon with smooth curves
        if (ribbonPoints.length > 0) {
          ctx.moveTo(ribbonPoints[0].x, ribbonPoints[0].y)
          for (let i = 1; i < ribbonPoints.length - 1; i++) {
            const xc = (ribbonPoints[i].x + ribbonPoints[i + 1].x) / 2
            const yc = (ribbonPoints[i].y + ribbonPoints[i + 1].y) / 2
            ctx.quadraticCurveTo(ribbonPoints[i].x, ribbonPoints[i].y, xc, yc)
          }
        }

        // Pure Monochrome Graphite / Ink Gradient Stroke
        const alpha = Math.max(0.04, 0.18 - r * 0.018)
        ctx.strokeStyle = `rgba(9, 9, 11, ${alpha})`
        ctx.lineWidth = Math.max(0.8, baseThickness)
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
    />
  )
}

export default Hero3DCanvas
