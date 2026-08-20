import React from 'react';
import { CheckCircle2, BarChart3, Filter, Zap, ShieldCheck, Star, Quote } from 'lucide-react';
import BlurText from './BlurText';
import { templateConfig } from '../templateConfig';
import { useCms } from '../context/CmsContext';

const METRIC_ICONS = [
  <BarChart3 key="1" className="w-6 h-6 text-emerald-400" />,
  <Filter key="2" className="w-6 h-6 text-cyan-400" />,
  <Zap key="3" className="w-6 h-6 text-indigo-400" />
];

export const TestimonialAndMetrics: React.FC = () => {
  const { publishedReviews } = useCms();
  const { kicker: testKicker, title: testTitle, description: testDesc, principles } = templateConfig.testimonials;
  const { kicker, title, description, items: metrics } = templateConfig.metrics;

  return (
    <section id="metrics" className="py-24 relative overflow-hidden bg-[#080808] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        
        {/* Core Principles & Trust Standards */}
        {principles && principles.length > 0 && (
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-white/15 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block mb-3">
                {testKicker}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {testTitle}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 font-normal leading-relaxed">
                {testDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <h3 className="text-base font-bold text-white tracking-tight">{p.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Reviews & Testimonials */}
        {publishedReviews && publishedReviews.length > 0 && (
          <div id="reviews">
            <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Client Testimonials
              </span>
              <BlurText
                as="h2"
                text="Verified Client Growth & Impact"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1 justify-center"
              />
              <p className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center max-w-2xl">
                Direct feedback and attribution outcomes from executive partners and brand leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publishedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-white/25 transition-all duration-300 shadow-xl"
                >
                  <div className="relative z-10">
                    {/* Top rating & quote mark */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating || 5 }).map((_, starIdx) => (
                          <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-white/15 group-hover:text-emerald-400/40 transition-colors" />
                    </div>

                    {/* Highlight Metric Badge */}
                    {rev.highlightMetric && (
                      <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                        {rev.highlightMetric}
                      </div>
                    )}

                    {/* Quote Text */}
                    <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed italic mb-6">
                      "{rev.quote}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3 relative z-10 mt-auto">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.name}
                        className="w-11 h-11 rounded-full object-cover border border-white/20 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                        {rev.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-white tracking-tight truncate">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono truncate">
                        {rev.role} • <span className="text-emerald-400">{rev.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance That Matters Section */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {kicker}
            </span>
            <BlurText
              as="h2"
              text={title}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1 justify-center"
            />
            <BlurText
              text={description}
              delay={80}
              animateBy="words"
              direction="bottom"
              className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center max-w-2xl"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {METRIC_ICONS[idx % METRIC_ICONS.length]}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {m.number || `Pillar 0${idx + 1}`}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2">
                    {m.label}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/10 mt-4">
                    {m.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3 text-sm text-zinc-400 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


