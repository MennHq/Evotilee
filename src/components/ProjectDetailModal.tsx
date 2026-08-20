import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onStartProject }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Accessible focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    }
  }, [project, onClose]);

  if (!project) return null;

  const hasLiveLink = Boolean(project.link && project.link.startsWith('http'));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        className="w-full max-w-3xl rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#0e0e11] shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-y-auto max-h-[90vh] z-10 my-auto text-left focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close project case study dialog"
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10 cursor-pointer z-20 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Client Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
            {project.category}
          </span>
          {project.clientName && (
            <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Client: {project.clientName}
            </span>
          )}
        </div>

        <h2 id="project-detail-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {project.title}
        </h2>

        {/* Hero image preview */}
        <div className="rounded-2xl overflow-hidden border border-white/10 my-6 aspect-[16/9] relative bg-zinc-900">
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key stats banner */}
        {(project.stats || project.views) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            {project.stats && (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">{project.stats}</span>
              </div>
            )}
            {project.views && (
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">{project.views}</span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights if present */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Key Campaign Milestones
            </h3>
            <div className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {project.deliverables && (
          <div className="mb-6 p-4 rounded-2xl bg-zinc-950/60 border border-white/5">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Scope of Deliverables
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-mono">
              {typeof project.deliverables === 'string' ? project.deliverables : project.deliverables.join(', ')}
            </p>
          </div>
        )}

        {/* Tech tags */}
        <div className="mb-8">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Channels & Capabilities</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          {hasLiveLink ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-5 py-3 rounded-full border border-white/15 transition-all focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
            >
              <span>Visit Case Study Resource</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="text-xs text-zinc-400 font-mono">
              Confidential Client Case Study • Verified Architecture
            </div>
          )}

          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-white hover:bg-zinc-200 px-6 py-3 rounded-full transition-all cursor-pointer shadow-lg focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <span>Request Similar Growth Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
