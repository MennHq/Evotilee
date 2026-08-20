import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import BlurText from './BlurText';
import BorderGlow from './BorderGlow';
import { templateConfig } from '../templateConfig';

// Dynamic icon helper to safely map string-based icon names from the template config to actual Lucide components
const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6 transition-colors" }) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    search: LucideIcons.Search,
    code: LucideIcons.Code,
    video: LucideIcons.Video,
    share2: LucideIcons.Share2,
    scissors: LucideIcons.Scissors,
    youtube: LucideIcons.Youtube,
    radio: LucideIcons.Radio,
    graduationCap: LucideIcons.GraduationCap,
    messageSquare: LucideIcons.MessageSquare,
    flame: LucideIcons.Flame,
    zap: LucideIcons.Zap,
    refreshCw: LucideIcons.RefreshCw,
    smartphone: LucideIcons.Smartphone,
    sparkles: LucideIcons.Sparkles,
    userCheck: LucideIcons.UserCheck,
    trendingUp: LucideIcons.TrendingUp,
    mapPin: LucideIcons.MapPin,
    shoppingCart: LucideIcons.ShoppingCart,
    'ecommerce-seo': LucideIcons.ShoppingCart,
    link: LucideIcons.Link,
    cpu: LucideIcons.Cpu,
    fileText: LucideIcons.FileText,
    mail: LucideIcons.Mail,
    target: LucideIcons.Target,
    layers: LucideIcons.Layers,
  };
  const IconComponent = iconMap[name] || LucideIcons.Search;
  return <IconComponent className={className} />;
};

interface ServicesBentoProps {
  onNavigateClipping?: () => void;
  onNavigateServices?: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onNavigateClipping, onNavigateServices }) => {
  const {
    kicker,
    title,
    description,
    gridServices,
  } = templateConfig.services;

  // Display exactly 3 columns × 2 rows (6 services) on the Home page
  const homeServices = gridServices.slice(0, 6);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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
            className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed justify-center max-w-2xl"
          />
        </div>

        {/* 3 Boxes Horizontally × 2 Boxes Vertically (6 Services) Grid on Home */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeServices.map((item) => (
            <BorderGlow
              key={item.id}
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
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gradient-to-b group-hover:from-zinc-800 group-hover:via-zinc-900 group-hover:to-black group-hover:border-zinc-500/80 group-hover:text-white group-hover:shadow-[0_4px_25px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] [&_svg]:transition-colors [&_svg]:duration-300 [&_svg]:group-hover:text-white [&_svg]:group-hover:stroke-white transition-all duration-300 shrink-0">
                      <ServiceIcon name={item.iconName} className="w-6 h-6 transition-colors" />
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono text-zinc-300 bg-[#080808] border border-white/10 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono text-zinc-400 relative z-10">
                  <div className="flex items-center gap-2 truncate">
                    <LucideIcons.CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate" title={item.benefit}>{item.benefit || "Optimized for extreme performance"}</span>
                  </div>
                  {item.id === 'content-distribution' && onNavigateClipping && (
                    <button
                      onClick={onNavigateClipping}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer"
                    >
                      <span>Clipping Page</span>
                      <LucideIcons.ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Bottom Subtle Corner Glow matching Why Choose Us */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all pointer-events-none" />
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* See All Services Button leading to dedicated /services page */}
        {onNavigateServices && (
          <div className="mt-14 text-center flex flex-col items-center justify-center relative">
            {/* Premium Emerald Ambient Glow Backdrop (Decreased by 50%) */}
            <div className="absolute w-64 h-16 bg-emerald-500/[0.07] blur-[40px] rounded-full pointer-events-none -z-10" />

            <button
              onClick={onNavigateServices}
              className="relative inline-flex items-center justify-center gap-3 px-9 py-3.5 rounded-xl bg-white text-black font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-[0_0_12px_rgba(16,185,129,0.18),0_0_25px_rgba(16,185,129,0.08)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3),0_0_35px_rgba(16,185,129,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-400/30 hover:border-emerald-400/50 group"
            >
              {/* Subtle High-End Shimmer Reflection */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Sleek Emerald Status Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.7)]"></span>
              </span>

              <span className="relative z-10 font-bold tracking-tight">See All Services</span>
              
              <LucideIcons.ArrowRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300 stroke-[2.2]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

