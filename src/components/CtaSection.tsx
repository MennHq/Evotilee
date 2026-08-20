import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Sparkles, Video, ArrowRight, ShieldCheck, Mail, Loader2, AlertCircle } from 'lucide-react';
import BlurText from './BlurText';
import { templateConfig } from '../templateConfig';
import { submitLead, validateEmail } from '../services/leadService';
import SideRays from './SideRays';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const { kicker, title, description, inputPlaceholder, buttonText, successMessage, benefits } = templateConfig.cta;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your business email.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLead({
        email: trimmedEmail,
        source: 'cta_section',
        timestamp: new Date().toISOString(),
      });

      if (result.success) {
        setSubmitted(true);
        setEmail('');
        resetTimerRef.current = setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        setErrorMessage(result.message || 'Submission failed. Please try again.');
      }
    } catch {
      setErrorMessage('Unable to connect. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-24 relative overflow-hidden bg-[#080808] scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full-width clean mobile layout / Glass card for desktop */}
        <div className="p-0 sm:p-14 lg:p-20 text-center relative overflow-hidden border-0 sm:border border-white/15 shadow-none sm:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center bg-transparent sm:bg-gradient-to-b sm:from-zinc-900/90 sm:via-[#0d0d0d] sm:to-[#080808] sm:rounded-3xl">
          
          {/* Volumetric WebGL Side Rays Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <SideRays
              speed={1.8}
              rayColor1="#ffffff"
              rayColor2="#94a3b8"
              intensity={1.5}
              spread={1.8}
              origin="bottom-left"
              tilt={5}
              saturation={1.1}
              blend={0.7}
              falloff={1.8}
              opacity={0.55}
            />
          </div>

          {/* Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none z-[1]" />

          {/* Top Kicker */}
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block mb-4 sm:mb-6 relative z-10">
            {kicker}
          </span>

          {/* Heading */}
          <BlurText
            as="h2"
            text={title}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-snug sm:leading-[1.15] text-center max-w-2xl mx-auto block"
          />

          {/* Subtext */}
          <BlurText
            text={description}
            delay={80}
            animateBy="words"
            direction="bottom"
            className="text-sm sm:text-lg text-zinc-400 mt-3 sm:mt-4 font-normal max-w-xl mx-auto leading-normal sm:leading-relaxed text-center block px-1 sm:px-0"
          />

          {/* Email Input Group & CTA */}
          <div className="mt-8 sm:mt-10 w-full max-w-md sm:max-w-[500px] mx-auto">
            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-white p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-all duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-zinc-200 text-xs sm:text-sm">{successMessage}</span>
              </div>
            ) : (
              <div>
                {errorMessage && (
                  <div className="mb-3 p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center gap-2 text-red-200 text-xs" role="alert">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 bg-zinc-950/80 sm:bg-zinc-900/90 border border-white/20 p-1.5 sm:p-2 sm:rounded-full rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all w-full focus-within:border-white/40">
                  
                  {/* Input Container */}
                  <div className="flex items-center px-3.5 py-2.5 sm:py-2 bg-transparent rounded-xl sm:rounded-none text-zinc-300 flex-1 min-w-0">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0 mr-2.5 hidden sm:block" />
                    <input
                      id="cta-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={inputPlaceholder}
                      required
                      autoComplete="email"
                      aria-label="Your work email address"
                      disabled={isSubmitting}
                      className="w-full min-w-0 bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none text-center sm:text-left disabled:opacity-50"
                    />
                  </div>

                  {/* High-Contrast Action Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3 rounded-xl sm:rounded-full font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-white via-zinc-100 to-zinc-200 hover:from-white hover:to-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] shrink-0 cursor-pointer overflow-hidden border border-white/80 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span className="whitespace-nowrap">Saving...</span>
                      </>
                    ) : (
                      <>
                        <span className="whitespace-nowrap">{buttonText}</span>
                        <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Desktop Benefits */}
          <div className="mt-8 hidden sm:flex flex-row items-center justify-center gap-6 text-xs font-mono text-zinc-300 w-full">
            {benefits.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2 justify-center">
                {bullet.type === 'speed' && <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                {bullet.type === 'revisions' && <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                {bullet.type === 'response' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                <span className="truncate">{bullet.label}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
