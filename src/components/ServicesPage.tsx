import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp,
} from 'lucide-react';
import BlurText from './BlurText';
import BorderGlow from './BorderGlow';
import SideRays from './SideRays';
import { EvotileeLogo, EvotileeBrandText } from './ClipeXLogo';
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

interface ServicesPageProps {
  onStartProject: () => void;
  onNavigateHome: () => void;
  onNavigateClipping?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onStartProject,
  onNavigateHome,
  onNavigateClipping,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const {
    kicker,
    title,
    description,
    bentoProcess,
    bentoAudio,
    bentoTrend,
    gridServices,
  } = templateConfig.services;

  return (
    <div className="min-h-screen bg-[#080808] text-white relative font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black antialiased overflow-x-hidden">
      
      {/* Global Background Ambient Grid & Glows */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-10%] w-[650px] h-[650px] bg-white/[0.03] blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[750px] h-[750px] bg-emerald-500/[0.02] blur-[180px] rounded-full pointer-events-none z-0" />

      {/* Top Fixed Sticky Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-7 py-3 sm:py-4 rounded-2xl backdrop-blur-xl bg-[#080808]/90 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {/* Left Side: Back to Home button + Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] active:scale-[0.97] group shrink-0"
              aria-label="Back to Home"
            >
              <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-colors shrink-0">
                <ArrowLeft className="w-3 h-3 text-zinc-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform duration-200" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-zinc-300 group-hover:text-white">Back to Home</span>
            </button>

            <div className="h-5 w-[1px] bg-white/15 hidden sm:block shrink-0" />

            {/* Logo */}
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-white rounded-lg focus:outline-none"
              aria-label="Evotilee Home"
            >
              <EvotileeLogo size={32} className="sm:w-[36px] sm:h-[36px] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] shrink-0" />
              <EvotileeBrandText size="md" />
            </a>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onStartProject}
              className="inline-flex relative items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs tracking-wide uppercase text-black bg-gradient-to-r from-white via-zinc-100 to-zinc-200 hover:from-white hover:to-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden border border-white/80 shrink-0 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header for /services */}
      <section className="pt-36 sm:pt-44 pb-20 relative overflow-hidden bg-[#080808]">
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

        {/* Ambient Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-[1] opacity-70" />

        {/* Subtle Ambient Background Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-full blur-[140px] pointer-events-none z-[1]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none z-[1]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              High-Performance Growth & Marketing Services
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 mt-4 leading-relaxed font-normal max-w-3xl">
              From technical SEO and programmatic distribution to high-converting creative production and attribution engineering. Explore our complete portfolio of growth services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section (Preserving exact card ratio and styling) */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridServices.map((item) => (
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
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate" title={item.benefit}>{item.benefit || "Optimized for extreme performance"}</span>
                    </div>
                    {item.id === 'content-distribution' && onNavigateClipping ? (
                      <button
                        onClick={onNavigateClipping}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer"
                      >
                        <span>Clipping</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={onStartProject}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Subtle Corner Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all pointer-events-none" />
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Capabilities Highlight Section */}
      <section className="py-24 bg-gradient-to-b from-[#060608] via-[#09090d] to-[#060608] border-t border-b border-white/10 relative overflow-hidden">
        {/* Ambient Grid Pattern & Subtle Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Integrated Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Engineered for Sustainable Market Dominance
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Every capability in our stack is interconnected to ensure attribution accuracy and compounding return on ad spend.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bento 1 */}
            <BorderGlow
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
              <div className="p-6 lg:p-7 flex flex-col h-full group">
                <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-5 flex flex-col justify-between flex-1 min-h-[220px]">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                    <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      {bentoProcess.title}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {bentoProcess.badge}
                    </span>
                  </div>
                  <div className="space-y-1.5 my-auto">
                    {bentoProcess.steps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                          activeStep === idx 
                            ? 'bg-white/15 border-white/40 text-white shadow-sm' 
                            : 'bg-black/30 border-white/5 text-zinc-400 hover:border-white/15 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xs font-medium">{step.title}</span>
                        <span className="text-[10px] font-mono text-zinc-300">{step.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{bentoProcess.descriptionKicker}</h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{bentoProcess.descriptionBody}</p>
                </div>
              </div>
            </BorderGlow>

            {/* Bento 2 */}
            <BorderGlow
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
              <div className="p-6 lg:p-7 flex flex-col h-full group">
                <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-5 flex-1 min-h-[220px] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] font-mono text-zinc-300">Server-Side CAPI</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      99.4% Match
                    </span>
                  </div>
                  <div className="space-y-2 my-auto">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-white">
                      <span>Meta Ads CAPI</span>
                      <span className="text-emerald-400 font-mono text-[10px]">1st-Party</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-white">
                      <span>Google Search (OCT)</span>
                      <span className="text-cyan-400 font-mono text-[10px]">Verified</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-white">
                      <span>Retention & SMS</span>
                      <span className="text-purple-300 font-mono text-[10px]">Synced</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Attribution Sync</span>
                    <span className="text-emerald-400 font-bold">Live</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{bentoAudio.title}</h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{bentoAudio.descriptionBody}</p>
                </div>
              </div>
            </BorderGlow>

            {/* Bento 3 */}
            <BorderGlow
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
              <div className="p-6 lg:p-7 flex flex-col h-full group">
                <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 mb-5 flex-1 min-h-[220px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-36 h-36 rounded-full border border-white/10" />
                  <div className="absolute w-24 h-24 rounded-full border border-white/15" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-zinc-700 via-zinc-200 to-zinc-500 p-[1.5px] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <div className="w-full h-full bg-[#121214] rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-zinc-300" />
                    </div>
                  </div>
                  {bentoTrend.pills[0] && (
                    <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-300 bg-[#080808] border border-white/10 px-2 py-0.5 rounded-full">
                      {bentoTrend.pills[0]}
                    </div>
                  )}
                  {bentoTrend.pills[1] && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-300 bg-[#080808] border border-white/10 px-2 py-0.5 rounded-full">
                      {bentoTrend.pills[1]}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{bentoTrend.title}</h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{bentoTrend.descriptionBody}</p>
                </div>
              </div>
            </BorderGlow>

          </div>

        </div>
      </section>

      {/* Ready to Scale CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Custom Growth Packages Available
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Accelerate Your Customer Acquisition?
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
              Book a strategic consultation to evaluate your existing acquisition funnels, organic positioning, and content distribution loops.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black bg-white hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Request Growth Audit & Proposal</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={onNavigateHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] text-white pt-12 pb-8 px-6 sm:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <EvotileeLogo size={28} />
            <span className="font-mono text-zinc-300">{templateConfig.brand.name} © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">Home</button>
            {onNavigateClipping && (
              <button onClick={onNavigateClipping} className="text-emerald-400 hover:text-white transition-colors cursor-pointer">Clipping</button>
            )}
            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            )}
            {onOpenTerms && (
              <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
};
