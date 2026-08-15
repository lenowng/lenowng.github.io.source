import React from 'react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'monumental'
  onClick?: () => void
  className?: string
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  onClick,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm tracking-tight',
    md: 'text-lg tracking-tight',
    lg: 'text-3xl tracking-tighter',
    monumental: 'text-5xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-tighter'
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-baseline cursor-pointer select-none group font-display-lg transition-opacity duration-150 active:opacity-75 hover:opacity-85 ${className}`}
    >
      <div className={`flex items-baseline leading-none text-zinc-950 font-normal ${sizeClasses[size]}`}>
        {/* LEON */}
        <span className="font-semibold text-zinc-950">
          LEON
        </span>

        {/* Studio Dot */}
        <span className="text-zinc-400 font-light mx-0.5 group-hover:text-zinc-950 transition-colors duration-200">
          .
        </span>

        {/* WONG */}
        <span className="font-light text-zinc-600 group-hover:text-zinc-950 transition-colors duration-200">
          WONG
        </span>
      </div>
    </div>
  )
}

export default BrandLogo
