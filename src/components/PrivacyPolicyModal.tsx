import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { templateConfig } from '../templateConfig';
import { EvotileeLogo, EvotileeBrandText } from './ClipeXLogo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Accessible focus trapping
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="privacy-policy-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[88vh] bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 my-auto text-zinc-200 focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-zinc-900/60 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors mr-2 py-1 px-2.5 rounded-lg hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
                  aria-label="Go back and close privacy policy"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-2">
                  <EvotileeLogo size={24} className="shrink-0" />
                  <EvotileeBrandText size="sm" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  Updated 2026
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
                  aria-label="Close privacy policy dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Scrollable Area */}
            <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
              
              {/* Title Section */}
              <div className="border-b border-white/10 pb-6">
                <h1 id="privacy-modal-title" className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-zinc-400 mt-2 text-sm">
                  Last updated: January 2026. This policy outlines how {templateConfig.brand.name} collects, protects, and handles your information.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-400" />
                  1. Information We Collect & Process
                </h2>
                <p className="text-zinc-400">
                  When you visit our website, request a growth audit, or engage our services, we collect information you voluntarily provide:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
                  <li><strong className="text-zinc-200">Lead Inquiries & Audit Forms:</strong> Your company name, business email address, website URL, monthly ad budget tier, chosen services, and growth objectives submitted via our intake modals.</li>
                  <li><strong className="text-zinc-200">Direct Inquiries:</strong> Work email addresses submitted via our contact forms.</li>
                  <li><strong className="text-zinc-200">Third-Party Booking Data:</strong> When you schedule a strategy call via our embedded Cal.com widget, your booking name, email, and selected calendar slot are processed by Cal.com pursuant to their privacy terms.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-zinc-400" />
                  2. Purpose & Use of Data
                </h2>
                <p className="text-zinc-400">
                  We use collected information strictly for legitimate business purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
                  <li>Preparing and conducting personalized growth audits and campaign strategy sessions.</li>
                  <li>Delivering growth marketing, ad creative production, SEO, and development proposals.</li>
                  <li>Responding to support requests, inquiries, and consultation bookings.</li>
                  <li>Ensuring the technical security and spam prevention of our web assets.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-zinc-400" />
                  3. Cookies & Subprocessors
                </h2>
                <p className="text-zinc-400">
                  Our website uses strictly necessary functional cookies for session management and anti-abuse verification. We do not sell, rent, or trade your personal data to advertising brokers. Our authorized subprocessors include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 text-sm">
                  <li><strong className="text-zinc-200">Cal.com:</strong> Dedicated calendar scheduling provider for discovery calls.</li>
                  <li><strong className="text-zinc-200">Secure Webhook / CRM Endpoints:</strong> Encrypted transfer of verified business leads to our sales operations team.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-zinc-400" />
                  4. Data Retention & Security
                </h2>
                <p className="text-zinc-400">
                  We implement robust industry-standard encryption, SSL/TLS data transfer protocols, and strict access controls. Lead data is retained only for as long as necessary to facilitate business communication and proposal execution.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                  5. Your Rights & Data Deletion
                </h2>
                <p className="text-zinc-400">
                  You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact our data officer:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1 text-sm font-mono">
                  <p className="text-white font-medium">{templateConfig.brand.name}</p>
                  <p className="text-zinc-400">Privacy Officer: <a href={`mailto:${templateConfig.brand.supportEmail}`} className="text-zinc-200 underline hover:text-white">{templateConfig.brand.supportEmail}</a></p>
                  <p className="text-zinc-500 text-xs">Response Time: {templateConfig.brand.averageResponseTime}</p>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between text-xs text-zinc-400">
              <span>{templateConfig.footer.copyrightText}</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
              >
                Close Policy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
