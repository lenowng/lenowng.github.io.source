import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  enableTilt?: boolean
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(9, 9, 11, 0.03)',
  enableTilt = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle tilt physics
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    if (enableTilt) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotX = ((y - centerY) / centerY) * -3
      const rotY = ((x - centerX) / centerX) * 3
      rotateX.set(rotX)
      rotateY.set(rotY)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (enableTilt) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={enableTilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      className={`relative overflow-hidden rounded-2xl bg-white border border-zinc-200 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Subtle Monochrome Spotlight Radial Halo */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`
        }}
      />

      {/* Subtle Monochrome Border Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-zinc-950/15 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}

export default SpotlightCard
