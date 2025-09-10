interface NeurAntLogoProps {
  className?: string
  isDarkBackground?: boolean
  fontSize?: string
}

export function NeurAntLogo({ 
  className = '', 
  isDarkBackground = true, 
  fontSize 
}: NeurAntLogoProps) {
  const primaryColor = '#F97316' // Orange color for N and A
  const secondaryColor = isDarkBackground ? '#FFFFFF' : '#000000' // White on dark, black on light
  
  const baseStyle = fontSize ? { fontSize } : {}
  
  return (
    <span 
      className={`font-baumans font-bold ${className}`}
      style={baseStyle}
    >
      <span style={{ color: primaryColor }}>N</span>
      <span style={{ color: secondaryColor }}>eur</span>
      <span style={{ color: primaryColor }}>A</span>
      <span style={{ color: secondaryColor }}>nt</span>
    </span>
  )
}