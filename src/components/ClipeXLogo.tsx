import React from 'react';
import { templateConfig } from '../templateConfig';

interface LogoProps {
  className?: string;
  size?: number;
}

export const EvotileeLogo: React.FC<LogoProps> = ({ className = '', size = 44 }) => {
  return (
    <img 
      src={templateConfig.brand.logo} 
      alt={`${templateConfig.brand.name} Logo`} 
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      style={{ width: size, height: size }}
      className={`object-contain ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

export const EvotileeBrandText: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'md', className = '' }) => {
  const textSizeClass = size === 'sm' ? 'text-base sm:text-lg' : size === 'lg' ? 'text-xl sm:text-3xl' : 'text-base sm:text-xl';
  const { textPart1, textPart2, textPart3 } = templateConfig.brand;

  return (
    <div className={`flex items-center font-extrabold tracking-tight whitespace-nowrap ${textSizeClass} ${className}`}>
      <span className="text-white">
        {textPart1}
      </span>
      <span className="text-white font-black drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] bg-gradient-to-r from-white via-zinc-100 to-white bg-clip-text text-transparent px-[1px]">
        {textPart2}
      </span>
      {textPart3 && (
        <span className="text-white font-semibold ml-1.5">
          {textPart3}
        </span>
      )}
    </div>
  );
};

// Aliases for backwards compatibility
export const ClipeXIcon = EvotileeLogo;
export const ClipeXBrandText = EvotileeBrandText;
