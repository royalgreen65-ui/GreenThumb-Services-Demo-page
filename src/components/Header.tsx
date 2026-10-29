import React, { useState } from 'react';
import { Menu, X, Phone, Sliders, Palette, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useCustomizer } from '../context/CustomizerContext';

interface HeaderProps {
  onOpenQuoteModal: (preselectedService?: string) => void;
  onOpenLogoStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
  onOpenLogoStudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, openDrawer } = useCustomizer();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Single brand mark (SVG Logo with wordmark) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="group focus-ring rounded-lg p-0.5 inline-block"
              title={state.businessName}
            >
              <Logo
                variant={state.logoVariant}
                size="md"
                showWordmark={true}
                theme="dark"
                customPrimary={state.primaryColor}
                customAccent={state.accentColor}
                className="group-hover:opacity-95 transition-opacity"
              />
            </a>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a
              href="#services"
              className="hover:text-black hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#calculator"
              className="hover:text-black hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Estimate Calculator
            </a>
            <a
              href="#transformations"
              className="hover:text-black hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Our Work
            </a>
            <a
              href="#service-area"
              className="hover:text-black hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Service Area
            </a>
            <a
              href="#reviews"
              className="hover:text-black hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Local Reviews
            </a>
          </nav>

          {/* Zone 3: Actions + Prominent Edit Button */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            {/* The Requested "Edit" / Customization Button */}
            <button
              type="button"
              onClick={() => openDrawer('colors')}
              className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              title="Customize colors, typography & content"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              <span>Edit Site</span>
            </button>

            <a
              href={`tel:${state.phoneClean}`}
              className="text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors"
              style={{ color: state.primaryColor }}
            >
              <Phone className="w-4 h-4" style={{ color: state.accentColor }} />
              <span>{state.phone}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2.5 text-sm font-bold text-white rounded-lg active:scale-[0.98] transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
              style={{ backgroundColor: state.primaryColor }}
            >
              Get Free Estimate
            </button>
          </div>

          {/* Mobile hamburger & edit toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openDrawer('colors')}
              className="p-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1"
              aria-label="Edit site"
              title="Edit Site Colors & Typography"
            >
              <Sliders className="w-4 h-4 text-amber-700" />
              <span>Edit</span>
            </button>

            <a
              href={`tel:${state.phoneClean}`}
              className="p-2 text-slate-800 hover:bg-black/5 rounded-lg"
              aria-label="Call Direct"
            >
              <Phone className="w-5 h-5 text-amber-600" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-black/5 rounded-lg focus-ring"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-black/5 rounded-md"
          >
            Services & Pricing
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-black/5 rounded-md"
          >
            Estimate Calculator
          </a>
          <a
            href="#transformations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-black/5 rounded-md"
          >
            Our Work
          </a>
          <a
            href="#service-area"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-black/5 rounded-md"
          >
            Service Area Checker
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-900 hover:bg-black/5 rounded-md"
          >
            Customer Reviews
          </a>

          {/* Mobile Customizer Trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDrawer('colors');
            }}
            className="w-full text-left flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-700" />
              <span>Edit Site Colors, Fonts & Copy</span>
            </div>
            <span className="text-xs bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">Customizer</span>
          </button>

          <div className="pt-2 border-t border-black/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 text-center text-sm font-bold text-white rounded-lg shadow"
              style={{ backgroundColor: state.primaryColor }}
            >
              Request Free Estimate
            </button>
            <a
              href={`tel:${state.phoneClean}`}
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-900 bg-amber-100/60 rounded-lg text-center"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Direct Call: {state.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
