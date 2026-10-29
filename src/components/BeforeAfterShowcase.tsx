import React, { useState } from 'react';
import { Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BeforeAfterShowcase: React.FC<{ onOpenQuoteModal: () => void }> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'lawn' | 'landscape'>('lawn');
  const [sliderPos, setSliderPos] = useState(50);

  const projects = {
    lawn: {
      title: 'Turf Recovery & Striping Transformation',
      location: 'Oakridge Estates · 0.5-Acre Residential Property',
      beforeText: 'Overgrown weeds, uneven height, no hard edge definition',
      afterText: 'Aerated, overseeded, precision striped with razor-sharp sidewalk edging',
      beforeImg: '/src/assets/images/service_seasonal_cleanup_1793115064274.jpg',
      afterImg: '/src/assets/images/service_lawn_mowing_1793115064077.jpg',
      duration: '35 Days turnaround',
      stats: '+85% Turf density improvement',
    },
    landscape: {
      title: 'Hardscape Patio & Native Garden Renovation',
      location: 'Greenfield Manor · Backyard Living Area',
      beforeText: 'Cracked builder-grade concrete slab with overgrown wild brush',
      afterText: 'Natural flagstone retaining wall, gas fire pit, and layered perennial garden beds',
      beforeImg: '/src/assets/images/hero_lawn_landscaping_1793115062728.jpg',
      afterImg: '/src/assets/images/service_landscape_design_1793115064205.jpg',
      duration: '4 Days installation',
      stats: 'Added $14,000 estimated home appraisal value',
    },
  };

  const current = projects[activeTab];

  return (
    <section id="transformations" className="py-16 sm:py-24 bg-white border-b border-[#133824]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
              Tangible Results & Craftsmanship
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#133824] tracking-tight text-balance">
              See the difference professional maintenance makes.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2C4A38]/90">
              Drag the interactive comparison slider or switch project types to inspect our attention to detail.
            </p>
          </div>

          {/* Interactive Project Switcher (Functional buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAFBF9] border border-[#133824]/15 rounded-xl shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('lawn')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'lawn'
                  ? 'bg-[#133824] text-white shadow-sm'
                  : 'text-[#2C4A38] hover:text-[#133824]'
              }`}
            >
              Lawn Renovation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('landscape')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'landscape'
                  ? 'bg-[#133824] text-white shadow-sm'
                  : 'text-[#2C4A38] hover:text-[#133824]'
              }`}
            >
              Landscape & Patio
            </button>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="bg-[#FAFBF9] rounded-2xl border border-[#133824]/15 overflow-hidden shadow-lg">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Interactive Image Split / Slider (Col 8) */}
            <div className="lg:col-span-8 relative aspect-[16/10] select-none overflow-hidden bg-black/5">
              
              {/* After Image (Full background) */}
              <img
                src={current.afterImg}
                alt={`After: ${current.title}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#133824]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow pointer-events-none">
                After (GreenThumb)
              </div>

              {/* Before Image (Clipped via slider position) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={current.beforeImg}
                  alt={`Before: ${current.title}`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow pointer-events-none">
                  Before Project
                </div>
              </div>

              {/* Slider Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#133824] border-2 border-white text-white flex items-center justify-center shadow-md">
                  <div className="flex gap-0.5">
                    <span className="block w-0.5 h-3 bg-white/70" />
                    <span className="block w-0.5 h-3 bg-white/70" />
                  </div>
                </div>
              </div>

              {/* Invisible native range slider input overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Drag before and after comparison slider"
              />
            </div>

            {/* Right Information Panel (Col 4) */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-[#133824]/10">
              <div className="space-y-4">
                <div className="text-xs text-[#2C4A38]/80 font-semibold">
                  {current.location}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#133824]">
                  {current.title}
                </h3>

                <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#2C4A38]">
                  <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                    <p className="font-bold text-rose-900 text-xs uppercase tracking-wider mb-1">
                      Starting Condition
                    </p>
                    <p className="text-rose-950/80">{current.beforeText}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <p className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1">
                      Our Solution
                    </p>
                    <p className="text-emerald-950/80">{current.afterText}</p>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 bg-[#FAFBF9] rounded-lg border border-[#133824]/10">
                    <p className="text-[11px] text-[#4A6354]">Turnaround</p>
                    <p className="text-xs sm:text-sm font-bold text-[#133824]">{current.duration}</p>
                  </div>
                  <div className="p-2.5 bg-[#FAFBF9] rounded-lg border border-[#133824]/10">
                    <p className="text-[11px] text-[#4A6354]">Verified Result</p>
                    <p className="text-xs sm:text-sm font-bold text-[#133824]">{current.stats}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#133824] hover:bg-[#1B4D31] rounded-xl shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-4 h-4 text-[#E6C65C] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
