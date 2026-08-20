import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { ProjectItem } from '../types';
import BlurText from './BlurText';
import { templateConfig } from '../templateConfig';
import { useCms } from '../context/CmsContext';

interface WorkCarouselProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const WorkCarousel: React.FC<WorkCarouselProps> = ({ onSelectProject }) => {
  const { publishedProjects, openCms } = useCms();
  const projectsData: ProjectItem[] = publishedProjects.length > 0 ? publishedProjects : templateConfig.portfolio.projects;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const hasMovedRef = useRef(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    setStartX(e.clientX);
    setDragX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 5) {
      hasMovedRef.current = true;
    }
    setDragX(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (dragX < -35) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragX > 35) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDragX(0);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragX(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const activeRealIndex = ((currentIndex % projectsData.length) + projectsData.length) % projectsData.length;
  // With 3 projects in config, show -1, 0, 1 to prevent duplicates and visual collisions
  const visibleOffsets = [-1, 0, 1];

  return (
    <section 
      id="work" 
      className="py-24 relative overflow-hidden bg-[#080808] scroll-mt-24"
      aria-label="Client Case Studies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Carousel Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block">
              {templateConfig.portfolio.kicker}
            </span>
            <button
              onClick={openCms}
              className="text-xs font-mono text-zinc-400 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open CMS to edit case studies & growth campaigns"
            >
              <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
              <span>Manage Campaigns</span>
            </button>
          </div>
          <BlurText
            as="h2"
            text={templateConfig.portfolio.title}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1 justify-center"
          />
          <BlurText
            text={templateConfig.portfolio.description}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="text-base sm:text-lg text-zinc-400 mt-2 font-normal justify-center max-w-2xl"
          />
        </div>

        {/* Carousel Container with Overlaid Navigation Arrows */}
        <div 
          className="relative max-w-6xl mx-auto focus:outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Interactive project showcase"
        >
          
          {/* Smooth Edge Blend Overlay Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#080808] via-[#080808]/80 to-transparent z-20" />

          {/* Floating Left Navigation Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-2 sm:left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Navigation Button */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-2 sm:right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Interactive Drag 3D Stage */}
          <div 
            className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden touch-pan-y"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {visibleOffsets.map((offset) => {
              const virtualIndex = currentIndex + offset;
              const realIndex = ((virtualIndex % projectsData.length) + projectsData.length) % projectsData.length;
              const project = projectsData[realIndex];

              const dragRatio = dragX / 300;
              const totalOffset = offset + dragRatio;
              const absOffset = Math.abs(totalOffset);

              const isActive = absOffset < 0.4;
              const translateXPercent = totalOffset * 65;
              const translateZ = -Math.min(absOffset, 2) * 110;
              const rotateY = Math.max(-25, Math.min(25, totalOffset * -14));
              const scale = Math.max(0.76, 1 - Math.min(absOffset, 2) * 0.1);
              const opacity = Math.max(0, 1 - Math.min(absOffset, 2) * 0.4);
              const zIndex = Math.round(20 - absOffset * 5);

              return (
                <div
                  key={`${project.id}-${virtualIndex}`}
                  onClick={() => {
                    if (hasMovedRef.current) return;
                    if (offset === 0) {
                      onSelectProject(project);
                    } else {
                      setCurrentIndex(virtualIndex);
                    }
                  }}
                  style={{
                    transform: `translate3d(calc(-50% + ${translateXPercent}%), -50%, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: isDragging 
                      ? 'none' 
                      : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform, opacity',
                    transformStyle: 'preserve-3d'
                  }}
                  className={`absolute top-1/2 left-1/2 w-[92%] sm:w-[65%] lg:w-[58%] rounded-[24px] sm:rounded-[36px] bg-zinc-900 border p-2.5 sm:p-4 cursor-pointer overflow-hidden shadow-2xl ${
                    isActive 
                      ? 'border-white/40 ring-1 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)]' 
                      : 'border-white/10 opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black flex items-center justify-center pointer-events-none aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />

                    {/* Floating Glass Pill at Bottom of Card */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-4 bg-black/85 border border-white/20 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-2xl pointer-events-auto">
                      <div className="pr-3 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 font-normal truncate">
                          {project.category}
                        </p>
                      </div>

                      {/* Round External Arrow Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        aria-label={`View details for ${project.title}`}
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-black font-semibold flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0 cursor-pointer shadow-lg focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projectsData.map((project, idx) => (
            <button
              key={idx}
              onClick={() => {
                const diff = (idx - activeRealIndex + projectsData.length) % projectsData.length;
                const shift = diff === 2 ? -1 : diff;
                setCurrentIndex((prev) => prev + shift);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeRealIndex === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${idx + 1}: ${project.title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
