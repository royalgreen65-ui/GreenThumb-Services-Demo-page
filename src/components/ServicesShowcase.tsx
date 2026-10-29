import React from 'react';
import { SERVICES } from '../data/mockData';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesShowcaseProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FAFBF9] border-b border-[#133824]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
            Core Service Offerings
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#133824] tracking-tight text-balance">
            Expert lawn care and precision landscaping designed for local properties.
          </h2>
          <p className="mt-3 text-base text-[#2C4A38]/90 text-balance">
            Every property receives tailored care with dedicated route equipment, razor-sharp blades, and trained local technicians who treat your grounds like their own.
          </p>
        </div>

        {/* Asymmetric Bento / Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#133824]/15 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Asset Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#133824]/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#133824]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow">
                    From {service.startingPrice}{' '}
                    <span className="font-normal text-white/80">{service.billingType}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7">
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center gap-2 text-xs text-[#2C4A38]/80 mb-2">
                    <span className="font-semibold text-[#133824]">0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.bestFor}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#133824] tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#2C4A38]/90 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Checklist of what's included */}
                  <div className="mt-5 pt-5 border-t border-[#133824]/10 space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#133824]">
                      Every Visit Includes:
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C4A38]">
                          <div className="w-4 h-4 rounded-full bg-[#133824]/10 text-[#133824] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#133824]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 sm:p-7 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-[#133824] bg-[#FAFBF9] hover:bg-[#133824] hover:text-white border border-[#133824]/20 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Quote For This Service</span>
                  <ArrowRight className="w-4 h-4 text-[#B8860B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Banner */}
        <div className="mt-12 bg-[#133824] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6C65C]">
              Commercial Grounds & HOA Contracts
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Manage an office park, shopping plaza, or residential HOA?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              We provide priority early-morning mowing, consolidated monthly invoicing, and dedicated account managers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('Commercial Grounds Contract')}
            className="px-6 py-3 text-sm font-bold text-[#133824] bg-[#E6C65C] hover:bg-[#D4A017] rounded-xl whitespace-nowrap shadow transition-all cursor-pointer shrink-0"
          >
            Commercial Inquiry
          </button>
        </div>

      </div>
    </section>
  );
};
