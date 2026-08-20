import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { WorkCarousel } from './components/WorkCarousel';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialAndMetrics } from './components/TestimonialAndMetrics';
import { TeamSection } from './components/TeamSection';
import { FaqSection } from './components/FaqSection';
import { CalBookingSection } from './components/CalBookingSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { ClippingPage } from './components/ClippingPage';
import { ServicesPage } from './components/ServicesPage';
import { CmsAdminModal } from './components/CmsAdminModal';
import { CmsProvider, useCms } from './context/CmsContext';
import { SlidersHorizontal } from 'lucide-react';
import { ProjectItem } from './types';

function AppContent() {
  const { openCms } = useCms();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isClippingRoute, setIsClippingRoute] = useState(false);
  const [isServicesRoute, setIsServicesRoute] = useState(false);

  // Sync route and modal states on popstate / hashchange
  const syncRouteState = useCallback(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    const isPrivacy = path === '/privacy' || hash === '#/privacy' || hash === '#privacy';
    const isTerms = path === '/terms' || hash === '#/terms' || hash === '#terms';
    const isClipping = path === '/clipping' || hash === '#/clipping' || hash === '#clipping';
    const isServices = path === '/services' || path === '/service' || hash === '#/services' || hash === '#/service' || hash === '#services-page';

    // If a stale anchor hash like #distribution-workflow exists on root, clean it so the page starts at the top
    if (hash === '#distribution-workflow') {
      window.history.replaceState({}, '', path || '/');
    }

    setIsPrivacyModalOpen(isPrivacy);
    setIsTermsModalOpen(isTerms);
    setIsClippingRoute(isClipping);
    setIsServicesRoute(isServices);
  }, []);

  useEffect(() => {
    syncRouteState();
    window.addEventListener('popstate', syncRouteState);
    window.addEventListener('hashchange', syncRouteState);

    return () => {
      window.removeEventListener('popstate', syncRouteState);
      window.removeEventListener('hashchange', syncRouteState);
    };
  }, [syncRouteState]);

  useEffect(() => {
    // Lenis Smooth Scroll Configuration
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [isClippingRoute, isServicesRoute]);

  const handleStartProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleNavigateServices = () => {
    setIsServicesRoute(true);
    setIsClippingRoute(false);
    if (window.location.pathname !== '/services' && window.location.hash !== '#/services') {
      window.history.pushState({}, '', '/services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateClipping = () => {
    setIsClippingRoute(true);
    setIsServicesRoute(false);
    if (window.location.pathname !== '/clipping' && window.location.hash !== '#clipping') {
      window.history.pushState({}, '', '/clipping');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setIsClippingRoute(false);
    setIsServicesRoute(false);
    if (window.location.pathname !== '/' && window.location.hash !== '') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewWork = () => {
    const workElement = document.getElementById('work');
    if (workElement) {
      workElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPrivacy = () => {
    setIsPrivacyModalOpen(true);
    setIsTermsModalOpen(false);
    if (window.location.pathname !== '/privacy' && window.location.hash !== '#privacy') {
      window.history.pushState({}, '', '#privacy');
    }
  };

  const handleClosePrivacy = () => {
    setIsPrivacyModalOpen(false);
    if (window.location.pathname === '/privacy' || window.location.hash === '#privacy' || window.location.hash === '#/privacy') {
      window.history.replaceState({}, '', window.location.pathname === '/privacy' ? '/' : window.location.pathname);
    }
  };

  const handleOpenTerms = () => {
    setIsTermsModalOpen(true);
    setIsPrivacyModalOpen(false);
    if (window.location.pathname !== '/terms' && window.location.hash !== '#terms') {
      window.history.pushState({}, '', '#terms');
    }
  };

  const handleCloseTerms = () => {
    setIsTermsModalOpen(false);
    if (window.location.pathname === '/terms' || window.location.hash === '#terms' || window.location.hash === '#/terms') {
      window.history.replaceState({}, '', window.location.pathname === '/terms' ? '/' : window.location.pathname);
    }
  };

  if (isClippingRoute) {
    return (
      <div className="min-h-screen bg-[#080808] text-white relative font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black antialiased">
        <ClippingPage 
          onStartProject={handleStartProject}
          onNavigateHome={handleNavigateHome}
        />

        {/* Interactive Project Inquiry Modal */}
        <ProjectModal 
          isOpen={isProjectModalOpen} 
          onClose={() => setIsProjectModalOpen(false)} 
        />
      </div>
    );
  }

  if (isServicesRoute) {
    return (
      <div className="min-h-screen bg-[#080808] text-white relative font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black antialiased">
        <ServicesPage 
          onStartProject={handleStartProject}
          onNavigateHome={handleNavigateHome}
          onNavigateClipping={handleNavigateClipping}
          onOpenPrivacy={handleOpenPrivacy}
          onOpenTerms={handleOpenTerms}
        />

        {/* Interactive Project Inquiry Modal */}
        <ProjectModal 
          isOpen={isProjectModalOpen} 
          onClose={() => setIsProjectModalOpen(false)} 
        />

        {/* Privacy Policy Modal */}
        <PrivacyPolicyModal
          isOpen={isPrivacyModalOpen}
          onClose={handleClosePrivacy}
        />

        {/* Terms of Service Modal */}
        <TermsOfServiceModal
          isOpen={isTermsModalOpen}
          onClose={handleCloseTerms}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white relative font-['Plus_Jakarta_Sans',sans-serif] selection:bg-white selection:text-black antialiased">
      {/* Sticky Fixed Glass Navigation */}
      <Navbar 
        onStartProject={handleStartProject} 
        onNavigateClipping={handleNavigateClipping}
        onNavigateHome={handleNavigateHome}
      />

      <main id="hero" className="scroll-mt-24">
        {/* Section 2: Hero */}
        <Hero 
          onStartProject={handleStartProject} 
          onViewWork={handleViewWork} 
        />

        {/* Section 3: Services Bento */}
        <ServicesBento 
          onNavigateClipping={handleNavigateClipping} 
          onNavigateServices={handleNavigateServices}
        />

        {/* Section 4: Work We're Proud Of Carousel */}
        <WorkCarousel 
          onSelectProject={(project) => setSelectedProject(project)} 
        />

        {/* Section 5: Why Brands Choose Evotilee */}
        <WhyChooseUs />

        {/* Section 6: Testimonial & Key Metrics */}
        <TestimonialAndMetrics />

        {/* Section 7: Team Section */}
        <TeamSection />

        {/* Section 8: FAQ Accordion */}
        <FaqSection />

        {/* Section 9: Cal.com Live Scheduler */}
        <CalBookingSection />

        {/* Section 10: Bottom CTA */}
        <CtaSection onStartProject={handleStartProject} />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer 
        onOpenPrivacy={handleOpenPrivacy} 
        onOpenTerms={handleOpenTerms}
        onNavigateClipping={handleNavigateClipping}
        onNavigateServices={handleNavigateServices}
      />

      {/* Interactive Project Inquiry Modal */}
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />

      {/* Case Study Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onStartProject={handleStartProject}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={handleClosePrivacy}
      />

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={handleCloseTerms}
      />

      {/* Floating CMS Portal Access Button */}
      <button
        onClick={openCms}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-emerald-400 hover:text-white border border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 font-mono text-xs group"
        title="Open Cloud Firestore CMS (Manage Testimonials & Case Studies)"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <SlidersHorizontal className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
        <span className="font-semibold tracking-tight text-white">CMS</span>
      </button>

      {/* Cloud Firestore CMS Admin Modal */}
      <CmsAdminModal />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
