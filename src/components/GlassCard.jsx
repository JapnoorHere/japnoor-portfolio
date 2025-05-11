import React from 'react';

const GlassCard = ({ children, className = '', hoverEffect = true, effectType = 'default' }) => {
  const getHoverEffectClasses = () => {
    if (!hoverEffect) return '';
    
    switch(effectType) {
      case 'lift':
        return 'hover:-translate-y-3 hover:shadow-xl hover:shadow-[#4b633b]/20 hover:border-[#4b633b]/50';
      case 'expand':
        return 'hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4b633b]/15 hover:border-[#4b633b]/40';
      case 'glow':
        return 'hover:shadow-lg hover:shadow-[#4b633b]/30 hover:border-[#4b633b]/60';
      case 'tilt':
        return 'hover:rotate-1 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#4b633b]/20 hover:border-[#4b633b]/40';
      default:
        return 'hover:-translate-y-2 hover:shadow-lg hover:shadow-[#4b633b]/15 hover:border-[#4b633b]/40';
    }
  };

  return (
    <div 
      className={`
        relative backdrop-blur-xl bg-[#1E1E1E]/70
        border border-gray-800 rounded-lg overflow-hidden
        transition-all duration-500 ease-out
        ${getHoverEffectClasses()}
        ${className}
      `}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#4b633b]/5 pointer-events-none 
                      transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
      
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
