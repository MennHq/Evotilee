import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EvotileeLogo } from './ClipeXLogo';
import { templateConfig } from '../templateConfig';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onNavigateClipping?: () => void;
  onNavigateServices?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onNavigateClipping, onNavigateServices }) => {
  const scrollToSection = (id: string) => {
    if (id === 'services' && onNavigateServices) {
      onNavigateServices();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPrivacy) {
      onOpenPrivacy();
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTerms) {
      onOpenTerms();
    }
  };

  return (
    <footer id="footer" className="bg-[#050505] text-white pt-16 pb-12 px-6 sm:px-12 lg:px-16 rounded-t-[2.5rem] relative z-20 border-t border-white/10 shadow-2xl overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Centered Clean Brand Showcase */}
        <div className="flex flex-col items-center justify-center text-center py-10 sm:py-14 relative">
          {/* Radial Spotlight Backplate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 group relative z-10">
            {/* Connected nodes vector logo */}
            <EvotileeLogo size={80} className="text-white/90 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-transform duration-500" />
            
            {/* Giant Metallic Embossed Wordmark */}
            <span className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight select-none bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(0,0,0,0.95)] relative">
              {templateConfig.brand.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mt-4 leading-relaxed font-normal">
            {templateConfig.footer.description}
          </p>
        </div>

        {/* Clean Streamlined Navigation & Connect Bar */}
        <div className="py-8 border-t border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-sm">
          {/* Main Navigation Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-medium text-zinc-400">
            {onNavigateClipping && (
              <button
                onClick={onNavigateClipping}
                className="text-emerald-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-white focus:outline-none rounded px-1 font-semibold flex items-center gap-1"
              >
                <span>Content Distribution</span>
                <span className="text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-400">NEW</span>
              </button>
            )}
            {templateConfig.navigation.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-white transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-white focus:outline-none rounded px-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Links & Support */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-400 font-medium">
            {templateConfig.footer.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-white focus:outline-none rounded px-1"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
          <div>
            {templateConfig.footer.copyrightText}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={handlePrivacyClick}
              className="hover:text-zinc-300 transition-colors cursor-pointer bg-transparent border-0 p-0 text-xs font-mono text-zinc-500 focus-visible:ring-1 focus-visible:ring-white focus:outline-none"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={handleTermsClick}
              className="hover:text-zinc-300 transition-colors cursor-pointer bg-transparent border-0 p-0 text-xs font-mono text-zinc-500 focus-visible:ring-1 focus-visible:ring-white focus:outline-none"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
