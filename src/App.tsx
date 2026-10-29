import React, { useState } from 'react';
import { CustomizerProvider, useCustomizer } from './context/CustomizerContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EstimateCalculator } from './components/EstimateCalculator';
import { ServicesShowcase } from './components/ServicesShowcase';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { LocalProof } from './components/LocalProof';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { QuoteModal } from './components/QuoteModal';
import { LogoCustomizerModal } from './components/LogoCustomizerModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { QuoteFormData } from './types';
import { CheckCircle2, Sliders } from 'lucide-react';

function MainApp() {
  const { state, updateState, openDrawer } = useCustomizer();

  const [modalOpen, setModalOpen] = useState(false);
  const [logoStudioOpen, setLogoStudioOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [prefilledLotSize, setPrefilledLotSize] = useState<string | undefined>();
  const [prefilledPrice, setPrefilledPrice] = useState<string | undefined>();
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenModal = (service?: string) => {
    setPreselectedService(service);
    setPrefilledLotSize(undefined);
    setPrefilledPrice(undefined);
    setModalOpen(true);
  };

  const handleApplyEstimate = (service: string, lotSize: string, estimatedPrice: string) => {
    setPreselectedService(service);
    setPrefilledLotSize(lotSize);
    setPrefilledPrice(estimatedPrice);
    setModalOpen(true);
  };

  const handleSelectServiceFromShowcase = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setPrefilledLotSize(undefined);
    setPrefilledPrice(undefined);
    setModalOpen(true);
  };

  const handleQuoteSubmitSuccess = (data: QuoteFormData) => {
    setNotification(`Estimate request sent for ${data.fullName}! Check your phone shortly.`);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: state.canvasBg }}
    >
      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-4 sm:right-6 z-50 text-white px-4 py-3 rounded-xl shadow-xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200 text-xs sm:text-sm font-medium"
          style={{ backgroundColor: state.primaryColor }}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: state.accentColor }} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar with new SVG Logo, Edit Button & Studio Trigger */}
      <Header
        onOpenQuoteModal={handleOpenModal}
        onOpenLogoStudio={() => setLogoStudioOpen(true)}
      />

      {/* Main Page Flow: Proposition -> Capabilities -> Proof -> Action */}
      <main className="flex-1">
        {/* Hero with Value Prop, Lead Gen Form & Trust Strip */}
        <Hero onQuoteSubmitSuccess={handleQuoteSubmitSuccess} />

        {/* Core Services Showcase */}
        <ServicesShowcase onSelectService={handleSelectServiceFromShowcase} />

        {/* Interactive Pricing / Estimate Calculator */}
        <EstimateCalculator onApplyEstimate={handleApplyEstimate} />

        {/* Tangible Proof: Before & After Transformation Slider */}
        <BeforeAfterShowcase onOpenQuoteModal={() => handleOpenModal('Custom Landscape Project')} />

        {/* Local Social Proof & Verified Testimonials */}
        <LocalProof />

        {/* Neighborhood & Route Availability Checker */}
        <ServiceAreaChecker onOpenQuoteModal={() => handleOpenModal()} />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Final Conversion Action Anchor */}
        <FinalCTA onOpenQuoteModal={() => handleOpenModal()} />
      </main>

      {/* Complete Footer with NAP, licensing, and hours */}
      <Footer onOpenLogoStudio={() => setLogoStudioOpen(true)} />

      {/* Mobile Sticky Quick-Contact Bar (under 15% mobile viewport) */}
      <MobileQuickBar onOpenQuoteModal={() => handleOpenModal()} />

      {/* Floating Desktop Customizer Action Button */}
      <button
        type="button"
        onClick={() => openDrawer('colors')}
        className="hidden md:flex fixed bottom-6 right-6 z-30 px-4 py-2.5 bg-white text-slate-900 border border-slate-300 rounded-full shadow-lg hover:shadow-xl items-center gap-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-black/5"
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: state.accentColor }}
        />
        <Sliders className="w-4 h-4 text-slate-700" />
        <span>Customize Colors & Fonts</span>
      </button>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedService={preselectedService}
        prefilledLotSize={prefilledLotSize}
        prefilledPrice={prefilledPrice}
        onSubmitSuccess={handleQuoteSubmitSuccess}
      />

      {/* Brand Logo Studio Modal for previewing, toggling & exporting SVG */}
      <LogoCustomizerModal
        isOpen={logoStudioOpen}
        onClose={() => setLogoStudioOpen(false)}
        currentVariant={state.logoVariant}
        onChangeVariant={(v) => {
          updateState({ logoVariant: v });
          setNotification(`Switched site logo to "${v.toUpperCase()}" variant.`);
          setTimeout(() => setNotification(null), 3000);
        }}
      />

      {/* Live Customizer Slide-over Drawer */}
      <CustomizerDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CustomizerProvider>
      <MainApp />
    </CustomizerProvider>
  );
}
