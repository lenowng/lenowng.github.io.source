import { useEffect, useRef } from 'react'

const Hero3DCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cssWidth = canvas.clientWidth || window.innerWidth
    let cssHeight = canvas.clientHeight || window.innerHeight
    let width = (canvas.width = cssWidth * dpr)
    let height = (canvas.height = cssHeight * dpr)

    const handleResize = () => {
      if (!canvas) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cssWidth = canvas.clientWidth || window.innerWidth
      cssHeight = canvas.clientHeight || window.innerHeight
      width = canvas.width = cssWidth * dpr
      height = canvas.height = cssHeight * dpr
    }
    window.addEventListener('resize', handleResize)

    // Smooth cursor & touch physics
    let targetMouseX = cssWidth * 0.5
    let targetMouseY = cssHeight * 0.5
    let mouseX = cssWidth * 0.5
    let mouseY = cssHeight * 0.5
    let velocityX = 0
    let velocityY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        targetMouseX = touch.clientX - rect.left
        targetMouseY = touch.clientY - rect.top
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })

    // Scroll depth tracking with smooth damping
    let scrollY = window.scrollY
    let targetScrollY = window.scrollY
    const handleScroll = () => {
      targetScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    let time = 0

    const render = () => {
      time += 0.0032
      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.scale(dpr, dpr)

      // Spring physics interpolation
      const prevMouseX = mouseX
      const prevMouseY = mouseY
      mouseX += (targetMouseX - mouseX) * 0.035
      mouseY += (targetMouseY - mouseY) * 0.035
      velocityX = (mouseX - prevMouseX) * 0.5
      velocityY = (mouseY - prevMouseY) * 0.5
      scrollY += (targetScrollY - scrollY) * 0.04

      const speedMagnitude = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY), 12)
      const scrollOffset = scrollY * 0.16

      // Responsive parameter adaptation: prevents squishing on narrow mobile screens
      const isMobile = cssWidth < 768
      const numLines = isMobile ? 16 : 26
      const numSegments = isMobile ? 90 : 120
      const centerX = cssWidth * 0.5
      const centerY = cssHeight * 0.50 - scrollOffset * 0.28
      
      // On mobile, expand span wider and use lower angular frequency so waves are long, sweeping & breathable
      const spanWidth = isMobile ? cssWidth * 2.2 : cssWidth * 1.5
      const waveFreq = isMobile ? 1.35 : 2.6
      const radiusYBase = isMobile ? cssHeight * 0.22 : cssHeight * 0.36
      const radiusYMod = isMobile ? cssHeight * 0.05 : cssHeight * 0.08
      const verticalSpreadStep = isMobile ? 18 : cssHeight * 0.026

      for (let r = 0; r < numLines; r++) {
        const linePhase = (r / numLines) * Math.PI * 2
        const depthOffset = (r - numLines / 2) * (isMobile ? 22 : 32)
        const verticalSpread = (r - numLines * 0.5) * verticalSpreadStep

        ctx.beginPath()
        const ribbonPoints: { x: number; y: number }[] = []

        for (let i = 0; i <= numSegments; i++) {
          const t = i / numSegments

          // Harmonic 3D Parametric Wave Equations
          const theta = t * Math.PI * waveFreq + time * 0.28 + linePhase * 0.75
          const phi = t * Math.PI * (isMobile ? 1.0 : 1.6) + time * 0.20 + (scrollY * 0.0008)

          const radiusX = (isMobile ? 70 : 120) + Math.sin(time * 0.35 + t * 2.5 + linePhase) * (isMobile ? 30 : 55)
          const radiusY = radiusYBase + Math.cos(time * 0.25 + t * 2.2 + linePhase * 0.5) * radiusYMod
          const radiusZ = (isMobile ? 160 : 210) + Math.sin(theta) * (isMobile ? 45 : 65)

          // 3D coordinates
          let x3d = (t - 0.5) * spanWidth + Math.cos(theta) * radiusX
          let y3d = Math.sin(theta * 1.15 + phi) * radiusY + Math.sin(t * Math.PI * 2) * (cssHeight * (isMobile ? 0.06 : 0.10)) + verticalSpread
          const z3d = Math.sin(theta) * radiusZ + depthOffset

          // Subtle, calm fluid reaction to cursor/touch proximity
          const dx = mouseX - (centerX + x3d * 0.65)
          const dy = mouseY - (centerY + y3d * 0.65)
          const distToCursor = Math.sqrt(dx * dx + dy * dy)
          const interactionRadius = isMobile ? 320 : 460
          const cursorInfluence = Math.max(0, 1 - distToCursor / interactionRadius) * (26 + speedMagnitude * 1.1)

          x3d += (dx / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)
          y3d += (dy / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)

          // 3D Perspective Projection
          const fov = isMobile ? 600 : 750
          const perspective = fov / (fov + z3d + 220)

          const projX = centerX + x3d * perspective
          const projY = centerY + y3d * perspective

          ribbonPoints.push({ x: projX, y: projY })
        }

        // Draw Spline with smooth quadratic curves
        if (ribbonPoints.length > 0) {
          ctx.moveTo(ribbonPoints[0].x, ribbonPoints[0].y)
          for (let i = 1; i < ribbonPoints.length - 1; i++) {
            const xc = (ribbonPoints[i].x + ribbonPoints[i + 1].x) / 2
            const yc = (ribbonPoints[i].y + ribbonPoints[i + 1].y) / 2
            ctx.quadraticCurveTo(ribbonPoints[i].x, ribbonPoints[i].y, xc, yc)
          }
          if (ribbonPoints.length > 1) {
            const last = ribbonPoints[ribbonPoints.length - 1]
            ctx.lineTo(last.x, last.y)
          }
        }

        // Delicate hairline stroke with subtle opacity gradient
        const normalizedIdx = r / numLines
        const alphaCurve = Math.sin(normalizedIdx * Math.PI)
        const alpha = Math.max(0.02, 0.03 + alphaCurve * (isMobile ? 0.065 : 0.075))
        const baseThickness = 0.7 + (r % (isMobile ? 3 : 5) === 0 ? 0.35 : 0)

        ctx.strokeStyle = `rgba(9, 9, 11, ${alpha})`
        ctx.lineWidth = baseThickness
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
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
