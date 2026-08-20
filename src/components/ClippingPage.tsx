import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Share2, 
  Scissors, 
  Video, 
  Layers, 
  Target, 
  MessageSquare, 
  ChevronDown, 
  ExternalLink,
  Flame,
  BarChart3,
  Calendar,
  Send,
  HelpCircle,
  Clock,
  ShieldCheck,
  Award,
  Wallet,
  DollarSign,
  Users,
  SlidersHorizontal
} from 'lucide-react';
import BlurText from './BlurText';
import BorderGlow from './BorderGlow';
import SideRays from './SideRays';
import { EvotileeLogo, EvotileeBrandText } from './ClipeXLogo';

interface ClippingPageProps {
  onStartProject: () => void;
  onNavigateHome: () => void;
}

export const ClippingPage: React.FC<ClippingPageProps> = ({ onStartProject, onNavigateHome }) => {
  // CPM Campaign Calculator State
  // Values: Budget, CPM, Minimum Pay to get paid, Maximum Pay to be paid per clipper
  const [budget, setBudget] = useState<number>(20000);
  const [cpm, setCpm] = useState<number>(1.00);
  const [minPayToGetPaid, setMinPayToGetPaid] = useState<number>(25); // Minimum Pay to get paid ($25)
  const [maxPayPerClipper, setMaxPayPerClipper] = useState<number>(1500); // Maximum Pay to be paid per clipper ($1,500)
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeVideoTab, setActiveVideoTab] = useState<'podcast' | 'founder' | 'product' | 'educational'>('podcast');

  // Dynamic calculations based on CPM model
  // Total Views = (Budget / CPM) * 1,000
  const safeCpm = Math.max(cpm, 0.10);
  const totalViewsNum = Math.round((budget / safeCpm) * 1000);
  
  // Views needed to hit the minimum payout
  const minViewsToQualify = Math.round((minPayToGetPaid / safeCpm) * 1000);
  
  // Max views compensated per individual clipper
  const maxViewsPerClipper = Math.round((maxPayPerClipper / safeCpm) * 1000);
  
  // Estimated number of circulating clips & creators
  const estimatedVideosNum = Math.max(1, Math.round(totalViewsNum / 40000));
  const maxFundedClippers = Math.max(1, Math.round(budget / Math.max(minPayToGetPaid * 3, 50)));

  // Formatted display helpers
  const formatViewsShort = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    return `${(views / 1000).toFixed(0)}K`;
  };

  const formattedViews = formatViewsShort(totalViewsNum) + ' Views';
  const exactViewsStr = totalViewsNum.toLocaleString();
  const formattedVideos = estimatedVideosNum.toLocaleString();
  const paidAdEquivalent = (totalViewsNum * 0.0085).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const clippingTiers = [
    {
      id: 'growth',
      name: 'Growth Swarm',
      badge: 'Starter Momentum',
      clips: '30 Clips / Month',
      frequency: '~1 Clip Daily',
      description: 'Ideal for founders, creators, and podcasts seeking consistent daily omnipresence across TikTok, Reels, and Shorts.',
      features: [
        'Source footage ingestion & timestamping',
        'Kinetic animated captions & emojis',
        'ClipeX Clips vetted senior editor team',
        'Sound design & trending audio pairing',
        '48-hour batch turnaround',
        'Formats for TikTok, Reels, YouTube Shorts, X',
      ],
      popular: false,
    },
    {
      id: 'domination',
      name: 'Viral Domination',
      badge: 'Most Popular',
      clips: '60 Clips / Month',
      frequency: '~2 Clips Daily Across Multi-Platforms',
      description: 'Engineered for brands wanting aggressive algorithmic takeover with multiple hook variations and audience testing.',
      features: [
        'Everything in Growth Swarm',
        '3-Hook A/B testing on top 10 clips',
        'B-Roll overlay & sound effects manipulation',
        'Weekly trend & audio injection sprint',
        'Omnichannel scheduled distribution',
        'Monthly viral performance & retention audit',
        'Dedicated ClipeX creative director review',
      ],
      popular: true,
    },
    {
      id: 'syndicate',
      name: 'Enterprise Syndicate',
      badge: 'Full Scale Swarm',
      clips: '100+ Clips / Month',
      frequency: '3–5 Clips Daily + Fan Channel Seeding',
      description: 'Total category domination. Complete distribution engine with dedicated clipping network and multi-account seeding.',
      features: [
        'Everything in Viral Domination',
        'Dedicated ClipeX creator swarm & editors',
        'Secondary/fan clipping channel network rollout',
        'Custom motion design & brand styleguide lock',
        'Real-time conversion tracking & UTM attribution',
        'Same-day priority turnaround for breaking topics',
        'Direct Slack/Discord channel with creative leads',
      ],
      popular: false,
    },
  ];

  const distributionWorkflow = [
    {
      step: '01',
      title: 'Longform Footage Ingestion',
      icon: Video,
      description: 'Send us your raw podcasts, webinars, keynote speeches, YouTube videos, or Loom walkthroughs. Our research team scans the material for peak emotional hooks and insights.',
      detail: 'Zero recording burden on your team',
    },
    {
      step: '02',
      title: 'ClipeX Clips Network Production',
      icon: Scissors,
      description: 'In direct collaboration with ClipeX Clips, vetted editors apply retention-first pacing, frame re-framing, kinetic typography, b-roll overlays, and custom sound design.',
      detail: 'Top 1% short-form editors',
    },
    {
      step: '03',
      title: 'Algorithmic Hook Optimization',
      icon: Flame,
      description: 'The first 3 seconds dictate 90% of virality. We script and insert visual pattern interrupts, curiosity headlines, and fast pacing to maximize initial completion rates.',
      detail: '3x higher algorithmic distribution score',
    },
    {
      step: '04',
      title: 'Omnichannel Seeding & Growth',
      icon: Share2,
      description: 'We format, schedule, and seed the clips natively across TikTok, Instagram Reels, YouTube Shorts, and X to compound your organic brand authority.',
      detail: 'Compound audience growth & inbound leads',
    },
  ];

  const videoStyles = {
    podcast: {
      title: 'Podcasts & Interviews',
      tag: 'High Authority & Insight',
      points: ['Controversial takes & debate moments', 'Golden knowledge drops with kinetic text', 'Dynamic multi-cam split screen switching', 'Subtle audio leveling & noise suppression'],
      metric: '580K+ Avg Views / Viral Series',
    },
    founder: {
      title: 'Founder & Personal Brand',
      tag: 'Direct Trust & Conversion',
      points: ['Raw authentic storytelling & lessons', 'Screen recording breakdowns & frameworks', 'Visual zoom-ins & animated infographics', 'Direct-to-camera hook framing'],
      metric: '4.2x Higher Profile Visit Rate',
    },
    product: {
      title: 'SaaS & Product Demos',
      tag: 'Bottom-Funnel Demand Gen',
      points: ['Problem-Agitation-Solution flow', 'UI feature zoom-ins & cursor highlights', 'Social proof & user result highlights', 'Clear friction-free call to action'],
      metric: '32% Increase in Trial Signups',
    },
    educational: {
      title: 'Industry Insights & Keynotes',
      tag: 'Evergreen Authority Assets',
      points: ['Step-by-step tactical frameworks', 'Data-backed charts & graphic callouts', 'Keynote stage clips with cinematic grading', 'Optimized for high saves & shares'],
      metric: '12.5% Avg Save/Share Ratio',
    },
  };

  const clippingFaqs = [
    {
      q: 'How does the collaboration with ClipeX Clips work?',
      a: 'Evotilee partners directly with the ClipeX Clips editing and creator network. Evotilee manages your overall growth strategy, performance attribution, and conversion funnels, while ClipeX Clips delivers industry-leading short-form video production, trend pairing, and kinetic visual editing.',
    },
    {
      q: 'Do we need to record new content specifically for this?',
      a: 'Not at all! We thrive on existing backlogs. Send us your past podcast episodes, YouTube longform videos, webinars, team workshops, or keynote recordings. We extract dozens of viral clips from material you have already produced.',
    },
    {
      q: 'How do you prevent duplicate content or platform penalties?',
      a: 'Every clip is custom-cut with native platform metadata, unique hook variants, native aspect ratios (9:16 vertical), and platform-specific audio tags. When deploying fan accounts, we utilize distinct framing, captions, and distribution schedules to ensure 100% compliance.',
    },
    {
      q: 'What is the turnaround time for our first batch?',
      a: 'Once we receive your source footage and complete the initial onboarding call, your first curated batch of polished clips is delivered within 48 to 72 hours for review.',
    },
    {
      q: 'Can you post and manage the channels for us?',
      a: 'Yes! We offer both options: we can deliver ready-to-post raw files with captions, hashtags, and thumbnail frames, or our team can fully handle scheduling and posting directly to your social accounts.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white relative font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black antialiased">
      {/* Top Floating Mini-Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl backdrop-blur-xl bg-[#080808]/90 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Evotilee */}
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="flex items-center gap-1.5 cursor-pointer group"
                aria-label="Evotilee Home"
              >
                <EvotileeLogo size={22} className="shrink-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform" />
                <span className="font-extrabold tracking-tight text-white text-xs sm:text-sm drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] drop-shadow-[0_0_22px_rgba(255,255,255,0.4)] group-hover:text-zinc-200 transition-colors">
                  Evotilee
                </span>
              </a>

              <span className="text-zinc-400 font-black text-[11px] sm:text-xs drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">✕</span>

              {/* ClipeX Clips */}
              <div className="flex items-center gap-1.5">
                <img
                  src="https://i.postimg.cc/bNrfRrhb/transparent-logo.png"
                  alt="ClipeX Clips"
                  className="h-4 sm:h-5 w-auto object-contain shrink-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  referrerPolicy="no-referrer"
                />
                <span className="font-extrabold tracking-tight text-white text-xs sm:text-sm drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] drop-shadow-[0_0_22px_rgba(255,255,255,0.4)]">
                  ClipeX Clips
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onStartProject}
              className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-white via-zinc-100 to-zinc-200 hover:from-white hover:to-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white/80 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Launch Campaign</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION WITH OFFICIAL CLIPEX CLIPS COLLABORATION CALLOUT */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#080808]">
        {/* Background WebGL Volumetric Side Rays */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <SideRays
            speed={2.2}
            rayColor1="#ffffff"
            rayColor2="#10b981"
            intensity={1.9}
            spread={2.4}
            origin="top-right"
            tilt={-6}
            saturation={1.3}
            blend={0.65}
            falloff={1.5}
            opacity={0.8}
          />
        </div>

        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/10 via-white/5 to-transparent rounded-full blur-[140px] pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            
            {/* HERO COLLABORATION HIGHLIGHT BADGE */}
            <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-xs text-zinc-300 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)] animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-zinc-400 font-medium">In collaboration with</span>
              <span className="text-white font-semibold tracking-tight flex items-center gap-1.5">
                <img
                  src="https://i.postimg.cc/bNrfRrhb/transparent-logo.png"
                  alt="ClipeX Clips"
                  className="h-3.5 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <span>ClipeX Clips</span>
                <Sparkles className="w-3 h-3 text-emerald-400 ml-0.5" />
              </span>
            </div>

            {/* Main Headline */}
            <BlurText
              as="h1"
              text="Content Distribution & Viral Clipping Engine"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] justify-center"
            />

            <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed text-center">
              Turn longform podcasts, keynotes, and founder videos into high-retention short-form clips. We script, edit, optimize, and seed your distribution campaign across <strong className="text-white font-semibold">TikTok, YouTube Shorts, Instagram Reels, and X</strong>.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider text-black bg-gradient-to-r from-white via-zinc-100 to-zinc-300 hover:from-white hover:to-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white"
              >
                <span>Launch Your Clipping Campaign</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('distribution-workflow')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Real Interactive Campaign Pipeline & Distribution Terminal */}
            <div className="mt-14 w-full p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl text-left shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-white font-bold font-mono uppercase tracking-wider text-[11px]">
                    Evotilee × ClipeX Live Distribution Pipeline
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">Target Networks:</span>
                  <div className="flex items-center gap-1.5">
                    {['TikTok', 'Reels', 'Shorts', 'X'].map((net) => (
                      <span
                        key={net}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300 font-medium"
                      >
                        {net}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 Pipeline Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Stage 1 */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      01 • Ingest
                    </span>
                    <Video className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    Longform Raw Ingestion
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Paste YouTube link or upload 4K raw podcasts, webinars, or founder talks.
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      02 • Extract
                    </span>
                    <Flame className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    Viral Hook Identification
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    We isolate high-retention 30–60s soundbites optimized for algorithm engagement.
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      03 • Polish
                    </span>
                    <Scissors className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    ClipeX Creator Craft
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Custom 9:16 vertical reframing, kinetic captions, B-roll, and audio mastering.
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      04 • Scale
                    </span>
                    <TrendingUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    Multi-Platform Deployment
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Batch-posted across your primary channels + seeded to high-authority pages.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE EVOTILEE × CLIPEX DISTRIBUTION PIPELINE */}
      {/* ========================================================================= */}
      <section id="distribution-workflow" className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-block">
              Engineered for Omnipresence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4">
              How the Clipping Campaign Works
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 mt-3 font-normal leading-relaxed">
              We eliminate 100% of the friction. You record longform content as you normally do; our joint engine turns it into an algorithmic flywheel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {distributionWorkflow.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <BorderGlow
                  key={idx}
                  backgroundColor="#0d0d10"
                  borderRadius={24}
                  edgeSensitivity={30}
                  glowColor="0 0% 100%"
                  glowRadius={30}
                  glowIntensity={1.0}
                  coneSpread={25}
                  colors={['#ffffff', '#cbd5e1', '#10b981']}
                  fillOpacity={0.12}
                  className="h-full"
                >
                  <div className="p-6 sm:p-7 flex flex-col justify-between h-full group relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-bold">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-zinc-200">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-emerald-400 relative z-10">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.detail}</span>
                    </div>

                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INTERACTIVE CPM CAMPAIGN CALCULATOR */}
      {/* ========================================================================= */}
      <section className="py-24 relative overflow-hidden bg-[#080808] border-t border-b border-white/10">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Performance Economics</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
              Campaign Distribution Calculator
            </h2>
            <p className="text-base text-zinc-400 mt-3 max-w-2xl mx-auto">
              Simulate performance viral distribution with custom budget pools, verified creator CPMs, and payout boundaries.
            </p>
          </div>

          {/* Main Calculator Surface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: 4 Parameter Controls (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/15 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6">
              
              {/* 1. Campaign Budget */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="budget-slider" className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Campaign Budget</span>
                  </label>
                  <span className="text-xl font-black text-white font-mono bg-white/10 px-3 py-0.5 rounded-lg border border-white/20">
                    ${budget.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  Total campaign prize & creator payout pool.
                </p>
                <input
                  id="budget-slider"
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Presets:</span>
                  {[5000, 10000, 20000, 50000, 100000].map((bVal) => (
                    <button
                      key={bVal}
                      type="button"
                      onClick={() => setBudget(bVal)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        budget === bVal
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      ${bVal >= 1000 ? `${bVal / 1000}k` : bVal}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. CPM Rate */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="cpm-slider" className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>CPM (Cost Per 1,000 Views)</span>
                  </label>
                  <span className="text-xl font-black text-emerald-400 font-mono bg-emerald-950/60 px-3 py-0.5 rounded-lg border border-emerald-500/40">
                    ${cpm.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  Payout rewarded to clippers per 1k verified views generated.
                </p>
                <input
                  id="cpm-slider"
                  type="range"
                  min="0.30"
                  max="3.00"
                  step="0.05"
                  value={cpm}
                  onChange={(e) => setCpm(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Standard:</span>
                  {[0.50, 0.80, 1.00, 1.50, 2.00].map((cVal) => (
                    <button
                      key={cVal}
                      type="button"
                      onClick={() => setCpm(cVal)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        cpm === cVal
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      ${cVal.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Minimum Pay to Get Paid */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="min-pay-slider" className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Minimum Pay to get paid</span>
                  </label>
                  <span className="text-xl font-black text-white font-mono bg-white/10 px-3 py-0.5 rounded-lg border border-white/20">
                    ${minPayToGetPaid}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                  <span>Minimum creator payout threshold</span>
                  <span className="font-mono text-emerald-400">Qualifies at {(minViewsToQualify).toLocaleString()} views</span>
                </div>
                <input
                  id="min-pay-slider"
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={minPayToGetPaid}
                  onChange={(e) => setMinPayToGetPaid(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Presets:</span>
                  {[10, 25, 50, 75, 100].map((mVal) => (
                    <button
                      key={mVal}
                      type="button"
                      onClick={() => setMinPayToGetPaid(mVal)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        minPayToGetPaid === mVal
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      ${mVal}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Maximum Pay to be Paid per Clipper */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="max-pay-slider" className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Maximum Pay to be paid per clipper</span>
                  </label>
                  <span className="text-xl font-black text-white font-mono bg-white/10 px-3 py-0.5 rounded-lg border border-white/20">
                    ${maxPayPerClipper.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                  <span>Creator earnings cap per campaign</span>
                  <span className="font-mono text-zinc-300">Caps at {(maxViewsPerClipper / 1000).toFixed(0)}k views</span>
                </div>
                <input
                  id="max-pay-slider"
                  type="range"
                  min="250"
                  max="5000"
                  step="250"
                  value={maxPayPerClipper}
                  onChange={(e) => setMaxPayPerClipper(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                  <span className="text-[11px] font-mono text-zinc-500 mr-1">Presets:</span>
                  {[500, 1000, 1500, 2500, 5000].map((capVal) => (
                    <button
                      key={capVal}
                      type="button"
                      onClick={() => setMaxPayPerClipper(capVal)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        maxPayPerClipper === capVal
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      ${capVal >= 1000 ? `${capVal / 1000}k` : capVal}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Live Projected Impact Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border border-white/15 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
              
              {/* Subtle Card Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* Impact Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                      Projected Impact
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    Verified CPM
                  </span>
                </div>

                {/* Hero Total Views Output */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Estimated Total Campaign Views
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-2 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    {formattedViews}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono mt-1.5 flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>~{exactViewsStr} verified qualified views</span>
                  </div>
                </div>

                {/* 4 Supporting Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Metric 1 */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Circulating Clips</div>
                    <div className="text-xl font-extrabold text-white mt-1">~{formattedVideos}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">Shorts, Reels, TikTok</div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Paid Ad Value</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">${paidAdEquivalent}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">@ $8.50 Meta CPM benchmark</div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Min Views / Payout</div>
                    <div className="text-xl font-extrabold text-white mt-1">{(minViewsToQualify / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">${minPayToGetPaid} threshold</div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Max Cap / Creator</div>
                    <div className="text-xl font-extrabold text-white mt-1">${maxPayPerClipper.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{(maxViewsPerClipper / 1000).toFixed(0)}k max views</div>
                  </div>

                </div>

                {/* Plain-English Summary */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 leading-relaxed">
                  With a <strong className="text-white">${budget.toLocaleString()} pool</strong> at <strong className="text-white">${cpm.toFixed(2)} CPM</strong>, clippers must reach <strong className="text-emerald-400">{(minViewsToQualify).toLocaleString()} views</strong> to unlock their <strong className="text-white">${minPayToGetPaid} min payout</strong>, capped at <strong className="text-white">${maxPayPerClipper.toLocaleString()}</strong> per creator.
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                <button
                  onClick={onStartProject}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Launch Campaign With This Model</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: PACKAGES & CAMPAIGN TIERS */}
      {/* ========================================================================= */}
      <section className="py-24 relative overflow-hidden bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Transparent Execution
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4">
              Content Distribution Packages
            </h2>
            <p className="text-base text-zinc-400 mt-3">
              Full-service production, editing, trend optimization, and platform formatting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {clippingTiers.map((tier) => (
              <BorderGlow
                key={tier.id}
                backgroundColor={tier.popular ? '#111116' : '#0d0d10'}
                borderRadius={24}
                edgeSensitivity={30}
                glowColor={tier.popular ? '160 84% 39%' : '0 0% 100%'}
                glowRadius={35}
                glowIntensity={tier.popular ? 1.4 : 1.0}
                coneSpread={25}
                colors={tier.popular ? ['#10b981', '#ffffff', '#34d399'] : ['#ffffff', '#cbd5e1', '#94a3b8']}
                fillOpacity={tier.popular ? 0.18 : 0.12}
                className="h-full"
              >
                <div className={`p-7 sm:p-8 flex flex-col justify-between h-full relative ${tier.popular ? 'border-emerald-500/30' : ''}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold ${
                        tier.popular 
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' 
                          : 'bg-white/5 text-zinc-400 border border-white/10'
                      }`}>
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                      {tier.name}
                    </h3>
                    <div className="text-base font-bold text-emerald-400 font-mono mb-2">
                      {tier.clips}
                    </div>
                    <div className="text-xs text-zinc-400 mb-4 font-mono">
                      {tier.frequency}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onStartProject}
                    className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                      tier.popular
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white hover:text-black border border-white/15'
                    }`}
                  >
                    <span>Choose {tier.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: VIDEO FORMAT SPECIALIZATIONS */}
      {/* ========================================================================= */}
      <section className="py-20 relative overflow-hidden bg-[#080808] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Vertical Adaptations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Curated for Every Content Archetype
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-2xl mx-auto mb-8">
            {(['podcast', 'founder', 'product', 'educational'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveVideoTab(tab)}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer capitalize ${
                  activeVideoTab === tab
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Tab Preview Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-white/15 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                {videoStyles[activeVideoTab].tag}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {videoStyles[activeVideoTab].metric}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-4">
              {videoStyles[activeVideoTab].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {videoStyles[activeVideoTab].points.map((pt, pIdx) => (
                <div key={pIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
              >
                <span>Request custom sample edit in this style →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-20 relative overflow-hidden bg-[#080808] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Clipping Campaign FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {clippingFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0e0e11] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: LIVE CAL.COM STRATEGY SCHEDULER WITH PROFESSIONAL TAGS */}
      {/* ========================================================================= */}
      <section id="book" className="py-24 relative overflow-hidden bg-[#080808] border-t border-white/10">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-35">
          <SideRays
            speed={1.8}
            rayColor1="#ffffff"
            rayColor2="#10b981"
            intensity={1.5}
            spread={1.8}
            origin="bottom-left"
            tilt={5}
            saturation={1.1}
            blend={0.7}
            falloff={1.8}
            opacity={0.45}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Direct Strategy Booking</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Schedule Your 30-Min Distribution Strategy
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
              Select a time directly on the calendar below to map out your 30-day viral view forecast, hook framework, and content pipeline with our senior specialists.
            </p>

            {/* Top Professional Badges / Tags */}
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
          <div className="relative rounded-3xl border border-white/15 bg-[#111114]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-2 sm:p-5 overflow-hidden">
            {/* Top subtle light bar */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            {/* Cal.com Direct Embedded Frame with Preload & Shimmer Background */}
            <div className="w-full min-h-[580px] sm:min-h-[640px] rounded-2xl overflow-hidden bg-black/40 relative border-0">
              {/* Background Skeleton Placeholder while iframe connects */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-0">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 animate-pulse">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-xs font-mono text-zinc-400">Loading interactive booking calendar...</span>
              </div>

              <iframe
                src="https://app.cal.com/mennhq/distribution?embed=true&layout=month_view&theme=dark"
                title="Schedule 30-Min Distribution Strategy on Cal.com"
                className="w-full h-[580px] sm:h-[640px] border-0 overflow-hidden relative z-10 bg-transparent"
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
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer for /clipping */}
      <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span>© {new Date().getFullYear()} Evotilee × ClipeX Clips. All rights reserved.</span>
          <button onClick={onNavigateHome} className="text-zinc-400 hover:text-white underline cursor-pointer">
            Return to Main Agency Site
          </button>
        </div>
      </footer>
    </div>
  );
};
