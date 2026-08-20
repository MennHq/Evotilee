import React from 'react';
import { Calendar, Clock, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import BlurText from './BlurText';

export const CalBookingSection: React.FC = () => {
  return (
    <section id="book" className="py-14 sm:py-24 relative overflow-hidden bg-[#0a0a0c] border-t border-white/10 scroll-mt-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Discovery Call</span>
          </div>

          <BlurText
            as="h2"
            text="Schedule a 1-on-1 Strategy Session"
            delay={80}
            animateBy="words"
            direction="top"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight block"
          />

          <BlurText
            text="Pick a convenient time below to discuss your growth roadmap, SEO opportunities, content distribution, or custom acquisition blueprint directly with our team."
            delay={60}
            animateBy="words"
            direction="bottom"
            className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto block"
          />

          {/* Quick Perks / Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">30-Min Strategy Call</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">Direct Senior Strategist Access</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">Zero Pitch • 100% Actionable Roadmap</span>
            </div>
          </div>
        </div>

        {/* Calendar Embed Frame Container */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#111114]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-2 sm:p-5 overflow-hidden">
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          {/* Cal.com Direct Embedded Frame with Preload & Shimmer Background */}
          <div className="w-full min-h-[580px] sm:min-h-[640px] rounded-xl overflow-hidden bg-black/40 relative border-0">
            {/* Background Skeleton Placeholder while iframe connects */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-0">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 animate-pulse">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-mono text-zinc-400">Loading interactive booking calendar...</span>
            </div>

            <iframe
              src="https://app.cal.com/mennhq/distribution?embed=true&layout=month_view&theme=dark"
              title="Schedule Strategy Session on Cal.com"
              className="w-full h-[580px] sm:h-[640px] border-0 rounded-xl overflow-hidden relative z-10 bg-transparent"
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

          {/* Fallback direct link */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs text-zinc-400 font-mono">
            <span>Prefer opening directly in Cal.com?</span>
            <a 
              href="https://app.cal.com/mennhq/distribution" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-emerald-400 transition-colors font-semibold underline underline-offset-4"
            >
              <span>Open Calendar in New Tab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
