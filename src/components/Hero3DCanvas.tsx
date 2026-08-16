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

    // Smooth cursor physics (slow, weighted lag for calm fluidity)
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
    window.addEventListener('mousemove', handleMouseMove)

    // Scroll depth tracking with smooth damping
    let scrollY = window.scrollY
    let targetScrollY = window.scrollY
    const handleScroll = () => {
      targetScrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    let time = 0

    const render = () => {
      // Slow, hypnotic, serene time step
      time += 0.0032
      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.scale(dpr, dpr)

      // Spring physics interpolation for cursor movement
      const prevMouseX = mouseX
      const prevMouseY = mouseY
      mouseX += (targetMouseX - mouseX) * 0.035
      mouseY += (targetMouseY - mouseY) * 0.035
      velocityX = (mouseX - prevMouseX) * 0.5
      velocityY = (mouseY - prevMouseY) * 0.5
      scrollY += (targetScrollY - scrollY) * 0.04

      const speedMagnitude = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY), 12)
      const scrollOffset = scrollY * 0.16

      // Zoomed-in expansive 3D kinetic fluid motion lines spanning full vertical height
      const numLines = 26
      const numSegments = 120
      const centerX = cssWidth * 0.5
      const centerY = cssHeight * 0.50 - scrollOffset * 0.28
      const spanWidth = cssWidth * 1.5

      for (let r = 0; r < numLines; r++) {
        const linePhase = (r / numLines) * Math.PI * 2
        const depthOffset = (r - numLines / 2) * 32
        const verticalSpread = (r - numLines * 0.5) * (cssHeight * 0.026)

        ctx.beginPath()
        const ribbonPoints: { x: number; y: number }[] = []

        for (let i = 0; i <= numSegments; i++) {
          const t = i / numSegments

          // Harmonic 3D Parametric Wave Equations with enlarged vertical amplitude
          const theta = t * Math.PI * 2.6 + time * 0.28 + linePhase * 0.75
          const phi = t * Math.PI * 1.6 + time * 0.20 + (scrollY * 0.0008)

          const radiusX = 120 + Math.sin(time * 0.35 + t * 2.5 + linePhase) * 55
          // Zoomed-in vertical amplitude covering high and low sections of the hero
          const radiusY = cssHeight * 0.36 + Math.cos(time * 0.25 + t * 2.2 + linePhase * 0.5) * (cssHeight * 0.08)
          const radiusZ = 210 + Math.sin(theta) * 65

          // 3D coordinates spanning generously across width and height
          let x3d = (t - 0.5) * spanWidth + Math.cos(theta) * radiusX
          let y3d = Math.sin(theta * 1.15 + phi) * radiusY + Math.sin(t * Math.PI * 2) * (cssHeight * 0.10) + verticalSpread
          const z3d = Math.sin(theta) * radiusZ + depthOffset

          // Subtle, calm fluid reaction to cursor proximity
          const dx = mouseX - (centerX + x3d * 0.65)
          const dy = mouseY - (centerY + y3d * 0.65)
          const distToCursor = Math.sqrt(dx * dx + dy * dy)
          const cursorInfluence = Math.max(0, 1 - distToCursor / 460) * (28 + speedMagnitude * 1.1)

          x3d += (dx / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)
          y3d += (dy / (distToCursor + 1)) * cursorInfluence * Math.sin(t * Math.PI)

          // 3D Perspective Projection (zoomed-in perspective)
          const fov = 750
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

        // Delicate hairline stroke with subtle monochromatic opacity gradient
        const normalizedIdx = r / numLines
        const alphaCurve = Math.sin(normalizedIdx * Math.PI)
        const alpha = Math.max(0.02, 0.03 + alphaCurve * 0.075)
        const baseThickness = 0.7 + (r % 5 === 0 ? 0.35 : 0)

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
