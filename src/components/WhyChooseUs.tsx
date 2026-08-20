import React from 'react';
import * as LucideIcons from 'lucide-react';
import BlurText from './BlurText';
import BorderGlow from './BorderGlow';
import { templateConfig } from '../templateConfig';

// Dynamic icon helper to safely map string-based icon names to actual Lucide components
const FeatureIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6 transition-colors" }) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    zap: LucideIcons.Zap,
    refreshCw: LucideIcons.RefreshCw,
    smartphone: LucideIcons.Smartphone,
    sparkles: LucideIcons.Sparkles,
    userCheck: LucideIcons.UserCheck,
    trendingUp: LucideIcons.TrendingUp,
  };
  const IconComponent = iconMap[name] || LucideIcons.Zap;
  return <IconComponent className={className} />;
};

export const WhyChooseUs: React.FC = () => {
  const {
    kicker,
    title,
    description,
    features,
  } = templateConfig.whyChooseUs;

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
            {kicker}
          </span>
          <BlurText
            as="h2"
            text={title}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 justify-center"
          />
          <BlurText
            text={description}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center"
          />
        </div>

        {/* 6 Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <BorderGlow
              key={idx}
              backgroundColor="#0d0d10"
              borderRadius={24}
              edgeSensitivity={30}
              glowColor="0 0% 100%"
              glowRadius={30}
              glowIntensity={1.0}
              coneSpread={25}
              colors={['#ffffff', '#cbd5e1', '#94a3b8']}
              fillOpacity={0.12}
              className="h-full"
            >
              <div className="p-8 flex flex-col justify-between h-full relative group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gradient-to-b group-hover:from-zinc-800 group-hover:via-zinc-900 group-hover:to-black group-hover:border-zinc-500/80 group-hover:text-white group-hover:shadow-[0_4px_25px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] [&_svg]:transition-colors [&_svg]:duration-300 [&_svg]:group-hover:text-white [&_svg]:group-hover:stroke-white transition-all duration-300">
                      <FeatureIcon name={item.icon} className="w-6 h-6 transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 bg-[#080808] border border-white/10 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Subtle Corner Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all pointer-events-none" />
              </div>
            </BorderGlow>
          ))}
        </div>

      </div>
    </section>
  );
};

