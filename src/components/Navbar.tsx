import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { EvotileeLogo, EvotileeBrandText } from './ClipeXLogo';
import { templateConfig } from '../templateConfig';
import { useCms } from '../context/CmsContext';

interface NavbarProps {
  onStartProject: () => void;
  onNavigateClipping?: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject, onNavigateClipping, onNavigateHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openCms } = useCms();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-5 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-xl bg-[#080808]/90 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]' 
            : 'backdrop-blur-md bg-black/50 border border-white/10'
        }`}
      >
        {/* Brand Logo */}
        <a 
          href="/" 
          id="nav-brand-logo"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            } else {
              if (window.location.pathname !== '/' && window.location.pathname !== '') {
                // If not at root, allow default href="/" navigation
                return;
              }
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0 min-w-0 focus-visible:ring-2 focus-visible:ring-white rounded-lg focus:outline-none"
          aria-label={`${templateConfig.brand.name} Home`}
        >
          <EvotileeLogo size={36} className="sm:w-[46px] sm:h-[46px] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] shrink-0" />
          <EvotileeBrandText size="md" />
        </a>

        {/* Desktop Quick Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-semibold text-zinc-300">
          {templateConfig.navigation.links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-white transition-colors cursor-pointer py-1 focus-visible:ring-1 focus-visible:ring-white rounded px-1 focus:outline-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 relative shrink-0">
          <button
            onClick={openCms}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl font-medium text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
            title="Open Cloud Firestore CMS (Manage Reviews & Campaigns)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline font-mono">CMS Portal</span>
            <span className="sm:hidden font-mono">CMS</span>
          </button>

          <button
            onClick={onStartProject}
            className="hidden sm:inline-flex relative items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs tracking-wide uppercase text-black bg-gradient-to-r from-white via-zinc-100 to-zinc-200 hover:from-white hover:to-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden border border-white/80 shrink-0 group focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">{templateConfig.navigation.getStartedText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </button>

          {/* Menu Button with Dropdown (Mobile only) */}
          <div className="relative md:hidden" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/15 text-white transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-95 shrink-0 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Dropdown Popover Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-14 w-60 rounded-2xl bg-[#121214] border border-white/15 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openCms();
                    }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-950 text-sm font-medium transition-all group w-full text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CMS Admin Portal</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  </button>
                  {onNavigateClipping && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onNavigateClipping();
                      }}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/80 text-sm font-medium transition-all group w-full text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Content Distribution</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  )}
                  {templateConfig.navigation.links.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-zinc-200 hover:text-white hover:bg-white/10 text-sm font-medium transition-all group w-full text-left cursor-pointer focus-visible:ring-1 focus-visible:ring-white focus:outline-none"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onStartProject();
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white text-black font-semibold text-sm transition-all hover:bg-zinc-200 w-full text-left cursor-pointer mt-1 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
                  >
                    <span>{templateConfig.navigation.startProjectKicker}</span>
                    <Sparkles className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
