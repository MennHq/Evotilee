import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Calendar, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { templateConfig } from '../templateConfig';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const modalConfig = templateConfig.inquiryModal;
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Accessible focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-md overflow-y-auto transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 pointer-events-auto visible z-50' 
          : 'opacity-0 pointer-events-none invisible -z-50'
      }`}
      onClick={onClose}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cal-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl lg:max-w-6xl bg-[#0e0e12] border border-white/20 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.95)] z-10 my-auto text-left focus:outline-none max-h-[96vh] flex flex-col overflow-hidden transition-transform duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Top Glow Bar */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Header & Close Row */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 shrink-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold tracking-tight">30-Min Strategy Session</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/15 text-zinc-300 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Specialist Access</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/15 text-zinc-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Pitch Guarantee</span>
              </span>
            </div>
            <h2 id="cal-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Schedule Your Discovery & Growth Session
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Select a slot directly on the calendar below to connect with our performance marketing and acquisition team.
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Landscape Cal.com Embedded Frame */}
        <div className="mt-4 flex-1 w-full rounded-2xl border border-white/15 bg-black/60 overflow-hidden relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px]">
          {/* Skeleton Background while frame connects */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-0">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 animate-pulse">
              <Calendar className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs font-mono text-zinc-400">Loading interactive booking calendar...</span>
          </div>

          <iframe
            src="https://app.cal.com/mennhq/distribution?embed=true&layout=month_view&theme=dark"
            title="Schedule Discovery Session on Cal.com"
            className="w-full h-[480px] sm:h-[580px] lg:h-[640px] border-0 rounded-2xl overflow-hidden relative z-10 bg-transparent"
            style={{
              border: 'none',
              outline: 'none',
              scrollbarWidth: 'none',
              overflow: 'hidden',
              display: 'block'
            }}
            scrolling="no"
            loading="eager"
            {...({ fetchpriority: "high" } as any)}
          />
        </div>

        {/* Modal Footer Link */}
        <div className="mt-3 pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Founder & Specialist Access • Zero Pitch Guarantee</span>
          </div>
          <a
            href="https://app.cal.com/mennhq/distribution"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-semibold underline underline-offset-4"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;

