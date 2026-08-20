import React from 'react';
import { ArrowUpRight, Play, Flame, TrendingUp } from 'lucide-react';
import { templateConfig } from '../templateConfig';
import SideRays from './SideRays';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  const {
    kicker,
    titleLine1,
    titleLine2,
    titleLine3,
    description,
    primaryCtaText,
    secondaryCtaText,
    benefits,
    column1Shots,
    column2Shots,
  } = templateConfig.hero;

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[#080808]">
      {/* Background WebGL Volumetric Side Rays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <SideRays
          speed={2.2}
          rayColor1="#ffffff"
          rayColor2="#cbd5e1"
          intensity={1.8}
          spread={2.2}
          origin="top-right"
          tilt={-8}
          saturation={1.2}
          blend={0.7}
          falloff={1.6}
          opacity={0.75}
        />
      </div>

      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-full blur-[140px] pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="w-full lg:col-span-5 flex flex-col items-start space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{kicker}</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {titleLine1}
                <span className="block text-zinc-400">{titleLine2}</span>
                <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {titleLine3}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-lg">
              {description}
            </p>

            {/* CTA Buttons - Premium Styled & Mobile Compatible */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl font-black text-sm sm:text-base text-black bg-gradient-to-r from-zinc-300 via-zinc-50 to-zinc-300 hover:from-white hover:via-zinc-100 hover:to-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group overflow-hidden border border-white/90 w-full sm:w-auto text-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <Play className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform shrink-0" />
                <span className="tracking-tight">{primaryCtaText}</span>
              </button>

              <button
                onClick={onViewWork}
                className="relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer group w-full sm:w-auto text-center"
              >
                <span>{secondaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </button>
            </div>

            {/* Social Proof / Mini Stats */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${benefit.statusColor}`} />
                  <span>{benefit.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Dual Vertical Infinite Scrolling Marquee with Video Badges (Hidden on mobile) */}
          <div 
            className="hidden lg:block lg:col-span-7 relative h-[580px] sm:h-[620px] lg:h-[680px] overflow-hidden rounded-3xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full items-start">
              
              {/* Column 1: Scrolls Up */}
              <div className="flex flex-col gap-4 sm:gap-6 animate-scroll-up">
                {[...column1Shots, ...column1Shots].map((shot, idx) => (
                  <div 
                    key={`col1-${idx}`}
                    className="relative rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-white/10 p-2.5 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] shrink-0"
                  >
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center">
                      <img 
                        src={shot.img} 
                        alt={shot.title} 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Scrolls Down */}
              <div className="flex flex-col gap-4 sm:gap-6 animate-scroll-down">
                {[...column2Shots, ...column2Shots].map((shot, idx) => (
                  <div 
                    key={`col2-${idx}`}
                    className="relative rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-white/10 p-2.5 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] shrink-0"
                  >
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center">
                      <img 
                        src={shot.img} 
                        alt={shot.title} 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


