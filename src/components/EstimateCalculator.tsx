import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check } from 'lucide-react';

interface EstimateCalculatorProps {
  onApplyEstimate: (service: string, lotSize: string, estimatedPrice: string) => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ onApplyEstimate }) => {
  const [lotSize, setLotSize] = useState<'small' | 'standard' | 'large' | 'estate'>('standard');
  const [serviceType, setServiceType] = useState<'mowing' | 'fullcare' | 'cleanup' | 'landscape'>('mowing');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'onetime'>('weekly');
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    shrubs: false,
    weeding: false,
    aeration: false,
  });

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculatedEstimate = useMemo(() => {
    let baseMin = 45;
    let baseMax = 55;
    let suffix = '/ visit';

    // Lot Size Multiplier
    if (lotSize === 'small') {
      baseMin = 38;
      baseMax = 48;
    } else if (lotSize === 'standard') {
      baseMin = 48;
      baseMax = 62;
    } else if (lotSize === 'large') {
      baseMin = 75;
      baseMax = 95;
    } else if (lotSize === 'estate') {
      baseMin = 120;
      baseMax = 160;
    }

    // Service Multiplier
    if (serviceType === 'fullcare') {
      baseMin = Math.round(baseMin * 1.6);
      baseMax = Math.round(baseMax * 1.7);
      suffix = '/ visit (includes treatments)';
    } else if (serviceType === 'cleanup') {
      baseMin = lotSize === 'small' ? 160 : lotSize === 'standard' ? 240 : lotSize === 'large' ? 380 : 550;
      baseMax = lotSize === 'small' ? 220 : lotSize === 'standard' ? 340 : lotSize === 'large' ? 490 : 750;
      suffix = 'total one-time cleanup';
    } else if (serviceType === 'landscape') {
      baseMin = lotSize === 'small' ? 650 : lotSize === 'standard' ? 950 : lotSize === 'large' ? 1600 : 2800;
      baseMax = lotSize === 'small' ? 1100 : lotSize === 'standard' ? 1800 : lotSize === 'large' ? 2900 : 4900;
      suffix = 'estimated project base';
    }

    // Addons
    if (serviceType === 'mowing' || serviceType === 'fullcare') {
      if (addons.shrubs) {
        baseMin += 25;
        baseMax += 35;
      }
      if (addons.weeding) {
        baseMin += 20;
        baseMax += 30;
      }
      if (addons.aeration) {
        baseMin += 35;
        baseMax += 50;
      }
    } else {
      if (addons.shrubs) {
        baseMin += 80;
        baseMax += 140;
      }
      if (addons.weeding) {
        baseMin += 60;
        baseMax += 110;
      }
      if (addons.aeration) {
        baseMin += 120;
        baseMax += 190;
      }
    }

    return {
      min: baseMin,
      max: baseMax,
      suffix,
    };
  }, [lotSize, serviceType, frequency, addons]);

  const getServiceLabel = () => {
    switch (serviceType) {
      case 'mowing': return 'Precision Lawn Mowing & Edging';
      case 'fullcare': return 'Full Turf Health & Weed Prevention';
      case 'cleanup': return 'Seasonal Yard Cleanup & Aeration';
      case 'landscape': return 'Landscape Design & Installation';
    }
  };

  const getLotLabel = () => {
    switch (lotSize) {
      case 'small': return 'Townhome / Small Yard (< 3,000 sq ft)';
      case 'standard': return 'Under 1/2 Acre (Standard Suburban)';
      case 'large': return '1/2 to 1 Acre Lot';
      case 'estate': return '1+ Acre Acreage / Commercial';
    }
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white border-b border-[#133824]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
            <Calculator className="w-4 h-4 text-[#B8860B]" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#133824] tracking-tight text-balance">
            Calculate your estimated lawn care investment in 30 seconds.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2C4A38]/90 text-balance">
            No guessing or awkward sales pitches. Select your property dimensions and service preferences for an instant pricing benchmark.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-4xl mx-auto bg-[#FAFBF9] rounded-2xl border border-[#133824]/15 shadow-md p-6 sm:p-8">
          
          <div className="space-y-8">
            
            {/* Step 1: Property Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs sm:text-sm font-bold text-[#133824]">
                  Step 1: Select Your Approximate Property Size
                </label>
                <span className="text-xs text-[#4A6354]">Front & back yard combined</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'small', title: '< 1/4 Acre', sub: 'Townhome / Patio' },
                  { id: 'standard', title: '1/4 – 1/2 Acre', sub: 'Suburban Standard' },
                  { id: 'large', title: '1/2 – 1 Acre', sub: 'Spacious Lot' },
                  { id: 'estate', title: '1+ Acre', sub: 'Acreage / HOA' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLotSize(item.id as any)}
                    className={`p-3 text-left rounded-xl border transition-all text-sm font-medium ${
                      lotSize === item.id
                        ? 'bg-[#133824] text-white border-[#133824] shadow-sm'
                        : 'bg-white text-[#133824] border-[#133824]/15 hover:border-[#133824]/40'
                    }`}
                  >
                    <div className="font-bold">{item.title}</div>
                    <div className={`text-[11px] mt-0.5 ${lotSize === item.id ? 'text-[#E6C65C]' : 'text-[#4A6354]'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#133824] mb-3">
                Step 2: Choose Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'mowing',
                    title: 'Weekly Lawn Mowing & Edging',
                    desc: 'Mow, trim, edge, and blow off drives & patios',
                  },
                  {
                    id: 'fullcare',
                    title: 'Full Turf Health & Weed Control',
                    desc: 'Weekly mowing + seasonal pre-emergent weed care',
                  },
                  {
                    id: 'cleanup',
                    title: 'Spring / Fall Cleanup & Aeration',
                    desc: 'Deep debris removal, core aeration, soil rejuvenation',
                  },
                  {
                    id: 'landscape',
                    title: 'Landscape Bed & Mulch Overhaul',
                    desc: 'Hardwood mulch, stone beds, edging, shrub install',
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceType(s.id as any)}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      serviceType === s.id
                        ? 'bg-[#133824] text-white border-[#133824] shadow-sm'
                        : 'bg-white text-[#133824] border-[#133824]/15 hover:border-[#133824]/40'
                    }`}
                  >
                    <div className="text-sm font-bold">{s.title}</div>
                    <div className={`text-xs mt-1 ${serviceType === s.id ? 'text-[#FAFBF9]/80' : 'text-[#4A6354]'}`}>
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs sm:text-sm font-bold text-[#133824]">
                  Step 3: Optional Add-On Care (Click to include)
                </label>
                <span className="text-xs text-[#4A6354]">Customizable anytime</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'shrubs', title: 'Hedge & Shrub Trimming' },
                  { id: 'weeding', title: 'Flower Bed Hand Weeding' },
                  { id: 'aeration', title: 'Core Aeration & Overseed' },
                ].map((addon) => {
                  const active = addons[addon.id];
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-[#E6C65C]/20 border-[#B8860B] text-[#133824]'
                          : 'bg-white border-[#133824]/15 text-[#2C4A38] hover:border-[#133824]/30'
                      }`}
                    >
                      <span>{addon.title}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          active ? 'bg-[#133824] border-[#133824] text-white' : 'border-[#133824]/30 bg-white'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculated Result Banner */}
            <div className="pt-6 border-t border-[#133824]/15">
              <div className="bg-white rounded-xl border border-[#133824]/20 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
                
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                    Estimated Investment Range
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#133824] tabular-nums">
                      ${calculatedEstimate.min} – ${calculatedEstimate.max}
                    </span>
                    <span className="text-xs sm:text-sm text-[#4A6354] font-medium">
                      {calculatedEstimate.suffix}
                    </span>
                  </div>
                  <p className="text-xs text-[#2C4A38]/80 mt-1">
                    Includes all labor, commercial fuel, disposal, and property liability coverage.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const priceString = `$${calculatedEstimate.min} - $${calculatedEstimate.max} ${calculatedEstimate.suffix}`;
                      onApplyEstimate(getServiceLabel(), getLotLabel(), priceString);
                    }}
                    className="px-5 py-3 text-sm font-bold text-white bg-[#133824] hover:bg-[#1B4D31] active:scale-[0.98] rounded-xl shadow transition-all flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
                  >
                    <span>Lock In This Free Quote</span>
                    <ArrowRight className="w-4 h-4 text-[#E6C65C] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
