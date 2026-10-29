import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sliders } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import { Logo } from './Logo';
import { useCustomizer } from '../context/CustomizerContext';

interface FooterProps {
  onOpenLogoStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogoStudio }) => {
  const { state, openDrawer } = useCustomizer();

  return (
    <footer className="bg-[#0B1E13] text-[#FAFBF9]/80 border-t border-white/10 pt-16 pb-24 md:pb-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & NAP */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Logo
                variant={state.logoVariant}
                size="md"
                showWordmark={true}
                theme="light"
                customPrimary="#FFFFFF"
                customAccent={state.accentColor}
              />
            </div>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Professional residential and commercial lawn maintenance, custom hardscaping, and seasonal cleanup services throughout the {state.location}.
            </p>

            {/* NAP (Name, Address, Phone) */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: state.accentColor }} />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: state.accentColor }} />
                <a href={`tel:${state.phoneClean}`} className="hover:text-white transition-colors font-semibold">
                  {state.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: state.accentColor }} />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-white/70">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: state.accentColor }} />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Lawn & Yard Care
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Core Aeration & Overseeding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Snow & Storm Prep
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Live Editor */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation & Tools
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Pricing & Instant Calculator
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors">
                  Before & After Portfolio
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-white transition-colors">
                  Local Service Area
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openDrawer('colors')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer font-bold"
                  style={{ color: state.accentColor }}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize Site Colors & Typography</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Licenses & Compliance */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Trust & Licensing
            </p>
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <ShieldCheck className="w-4 h-4" style={{ color: state.accentColor }} />
                <span>State Licensed & Insured</span>
              </div>
              <p className="text-white/70">License #{BUSINESS_INFO.license}</p>
              <p className="text-white/70">{BUSINESS_INFO.insurance}</p>
              <p className="text-[11px] pt-1" style={{ color: state.accentColor }}>
                EPA & IL Dept of Agriculture Certified Technicians
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {state.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Service Agreement</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
