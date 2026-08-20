import React, { useEffect, useRef } from 'react';
import { X, FileText, CheckCircle2, Shield } from 'lucide-react';
import { templateConfig } from '../templateConfig';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-[#0d0d10] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-zinc-300 focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#121216]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/15">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="terms-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Terms of Service
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {templateConfig.brand.name} • Effective Date: January 1, 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Terms of Service dialog"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors border border-white/10 focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed text-zinc-300">
          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing our website, booking a discovery call, or submitting an inquiry to {templateConfig.brand.name} (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or submit personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Scope of Growth Services
            </h3>
            <p>
              {templateConfig.brand.name} provides digital marketing, performance advertising, search engine optimization (SEO), conversion rate optimization (CRO), creative ad production, and strategic growth consulting. Specific deliverables, service tiers, milestones, and commercial agreements are governed by individual client Service Level Agreements (SLAs) or Statements of Work (SOWs).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Client Responsibilities & Ad Spend
            </h3>
            <p>
              Clients are solely responsible for third-party advertising spend billed directly by ad networks (including Meta, Google, TikTok, LinkedIn). Clients agree to provide accurate brand assets, required platform access tokens, and timely approvals necessary for execution.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4. Intellectual Property
            </h3>
            <p>
              Upon full settlement of contracted invoices, all final custom creatives and campaign assets produced specifically for the Client become the intellectual property of the Client. {templateConfig.brand.name} retains ownership of its proprietary frameworks, campaign templates, optimization algorithms, and generalized internal tooling.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              5. Performance Disclaimers
            </h3>
            <p>
              Past performance metrics, client case study illustrations, and ROI figures presented on our site represent historical project results and illustrative outcomes. Actual performance may vary depending on market conditions, product-market fit, pricing, and external platform algorithm changes. We do not guarantee specific monetary results without an explicit written guarantee clause in a signed SOW.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              6. Confidentiality
            </h3>
            <p>
              Both parties agree to hold non-public information, strategy blueprints, revenue data, and proprietary business secrets in strict confidence and not disclose such information to third parties without prior written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              7. Inquiries & Contact
            </h3>
            <p>
              For legal inquiries, contract review, or questions regarding these terms, please contact:
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
              <p className="text-white font-bold">{templateConfig.brand.name}</p>
              <p>Email: legal@evotilee.com / hello@evotilee.com</p>
              <p>General Inquiries: {templateConfig.brand.supportEmail}</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121216]/80 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
