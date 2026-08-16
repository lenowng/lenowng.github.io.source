import React from 'react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'monumental'
  showIcon?: boolean
  variant?: 'default' | 'mirrored'
  onClick?: () => void
  className?: string
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showIcon = false,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm tracking-tight',
    md: 'text-lg tracking-tight',
    lg: 'text-3xl tracking-tighter',
    monumental: 'text-4xl sm:text-7xl md:text-9xl tracking-tighter'
  }

  const iconSizes = {
    sm: 'w-6 h-6 text-[10px] rounded-lg',
    md: 'w-7 h-7 text-xs rounded-lg',
    lg: 'w-10 h-10 text-base rounded-xl',
    monumental: 'w-16 h-16 text-2xl rounded-2xl'
  }

  const isMirrored = variant === 'mirrored'

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group font-display-lg transition-opacity duration-150 active:opacity-75 hover:opacity-90 ${className}`}
    >
      {/* Cohesive L·W Squircle Emblem */}
      {showIcon && (
        <div className={`bg-zinc-950 text-white flex items-center justify-center font-display-lg font-semibold tracking-tight shadow-sm shrink-0 ${iconSizes[size]}`}>
          <span className="font-bold">L</span>
          <span className="text-zinc-500 font-light text-[8px] mx-0.5">·</span>
          <span className="font-light text-zinc-300">W</span>
        </div>
      )}

      {/* Typographic Logotype */}
      <div className={`flex items-baseline leading-none text-zinc-950 font-normal ${sizeClasses[size]}`}>
        {/* LEON */}
        <span className={`${isMirrored ? 'font-light text-zinc-600 group-hover:text-zinc-950' : 'font-semibold text-zinc-950'} transition-colors duration-200`}>
          LEON
        </span>

        {/* Studio Dot */}
        <span className="text-zinc-400 font-light mx-0.5 group-hover:text-zinc-950 transition-colors duration-200">
          .
        </span>

        {/* WONG */}
        <span className={`${isMirrored ? 'font-semibold text-zinc-950' : 'font-light text-zinc-600 group-hover:text-zinc-950'} transition-colors duration-200`}>
          WONG
        </span>
      </div>
    </div>
  )
}

export default BrandLogo
