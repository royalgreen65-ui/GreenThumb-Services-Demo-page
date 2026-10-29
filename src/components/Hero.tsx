import React, { useState } from 'react';
import { Phone, CheckCircle2, ShieldCheck, Clock, Award, ArrowRight, Edit3 } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { QuoteFormData } from '../types';
import { useCustomizer } from '../context/CustomizerContext';

interface HeroProps {
  onQuoteSubmitSuccess: (data: QuoteFormData) => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteSubmitSuccess }) => {
  const { state, openDrawer } = useCustomizer();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    serviceCategory: 'Precision Lawn Mowing & Edging',
    propertyType: 'Residential Single-Family',
    lotSize: 'Under 1/2 Acre',
    timing: 'Within 1-2 Weeks',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  const validate = () => {
    const errs: Partial<Record<keyof QuoteFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.phone.trim() && !formData.email.trim()) {
      errs.phone = 'Please provide a phone number or email';
    }
    if (formData.phone && !/^[0-9()+\-\s.]{7,20}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormSubmitted(true);
    onQuoteSubmitSuccess(formData);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-black/10 transition-colors">
      {/* Background soft ambient graphic */}
      <div
        className="absolute top-0 right-0 -mr-48 -mt-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: state.primaryColor }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Value Proposition & Proof */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Unboxed editorial kicker */}
            <div
              onClick={() => state.isInlineEditActive && openDrawer('content')}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                state.isInlineEditActive ? 'editable-highlight p-1 rounded' : ''
              }`}
              style={{ color: state.primaryColor }}
            >
              <span>{state.location}</span>
              <span aria-hidden="true">·</span>
              <span>12+ Years Local Service</span>
              <span aria-hidden="true">·</span>
              <span>$2M Insured</span>
              {state.isInlineEditActive && <Edit3 className="w-3.5 h-3.5 text-amber-600 inline ml-1" />}
            </div>

            {/* Main Headline with balanced wrap */}
            <h1
              onClick={() => state.isInlineEditActive && openDrawer('content')}
              className={`text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.12] tracking-tight text-balance transition-colors ${
                state.isInlineEditActive ? 'editable-highlight p-1 rounded' : ''
              }`}
              style={{
                color: state.primaryColor,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {state.heroHeadline}
              {state.isInlineEditActive && <Edit3 className="w-5 h-5 text-amber-600 inline ml-2" />}
            </h1>

            {/* Supporting Subhead */}
            <p
              onClick={() => state.isInlineEditActive && openDrawer('content')}
              className={`text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed ${
                state.isInlineEditActive ? 'editable-highlight p-1 rounded' : ''
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {state.heroSubhead}
              {state.isInlineEditActive && <Edit3 className="w-4 h-4 text-amber-600 inline ml-2" />}
            </p>

            {/* Primary Touchpoints: Phone Call & Trust reassurance */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`tel:${state.phoneClean}`}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-base font-bold text-white active:scale-[0.99] shadow-md transition-all text-center group"
                style={{
                  backgroundColor: state.primaryColor,
                  borderRadius: state.borderRadiusPx,
                }}
              >
                <Phone className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: state.accentColor }} />
                <span>Call {state.phone}</span>
              </a>

              <div className="text-xs sm:text-sm text-slate-700 flex flex-col justify-center">
                <span className="font-semibold text-slate-900">Direct dispatch line</span>
                <span>Mon–Sat 7:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="pt-4">
              <div
                className="relative overflow-hidden border border-black/10 shadow-md aspect-[16/9] max-h-[340px]"
                style={{ borderRadius: state.borderRadiusPx }}
              >
                <img
                  src="/src/assets/images/hero_lawn_landscaping_1793115062728.jpg"
                  alt="Immaculate striped lawn and residential landscaping completed by GreenThumb Services"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white text-xs sm:text-sm">
                    <p className="font-bold text-white/95 text-sm sm:text-base">
                      Recent Residential Transformation
                    </p>
                    <p className="text-white/80">
                      {state.location.split('&')[0]} · Precision route & weekly mowing starting at {state.mowingStartPrice}/visit
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Converting Lead Generation Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              className="bg-white border border-black/10 shadow-xl p-6 sm:p-8 relative"
              style={{ borderRadius: state.borderRadiusPx }}
            >
              <div className="mb-5">
                <span
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: state.accentColor }}
                >
                  Fast 24-Hour Estimate
                </span>
                <h2
                  className="text-xl sm:text-2xl font-bold mt-1"
                  style={{ color: state.primaryColor, fontFamily: 'var(--font-heading)' }}
                >
                  Request Your Free Estimate
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  No pushy sales calls. We inspect your property via satellite or on-site and send an itemized quote.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: `${state.primaryColor}15`, color: state.primaryColor }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: state.primaryColor }}>
                    Estimate Request Received!
                  </h3>
                  <p className="text-sm text-slate-700">
                    Thank you, <span className="font-semibold">{formData.fullName}</span>. Our route manager is preparing your property estimate for <span className="font-semibold">{formData.serviceCategory}</span>.
                  </p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-black/5 text-xs text-left space-y-1">
                    <p className="font-semibold text-slate-900">What happens next:</p>
                    <p>1. We measure your lot perimeter and turf square footage.</p>
                    <p>2. You receive an itemized quote via SMS/Email within 24 hours.</p>
                    <p>3. Zero obligation — simply click approve if you want to start.</p>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-bold underline"
                    style={{ color: state.primaryColor }}
                  >
                    Submit another property request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus-ring"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus-ring"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus-ring"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Street Address or Neighborhood
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 742 Evergreen Terr, Springfield"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus-ring"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.serviceCategory}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Full Seasonal Yard Care">Full Seasonal Package</option>
                        <option value="Commercial Grounds Contract">Commercial Property Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Property Size
                      </label>
                      <select
                        value={formData.lotSize}
                        onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                      >
                        <option value="Townhome / Small Lawn (< 3,000 sq ft)">Townhome / Small Lawn</option>
                        <option value="Under 1/2 Acre (Standard Suburban)">Under 1/2 Acre (Standard)</option>
                        <option value="1/2 to 1 Acre">1/2 to 1 Acre</option>
                        <option value="1+ Acre Estate / Commercial Lot">1+ Acre / Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Project Notes or Specific Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Back gate is 48 inches, request Tuesday route, dog in yard."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus-ring"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-sm font-bold text-white active:scale-[0.99] shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    style={{
                      backgroundColor: state.primaryColor,
                      borderRadius: state.borderRadiusPx,
                    }}
                  >
                    <span>Request Free 24-Hour Estimate</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: state.accentColor }} />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 leading-tight">
                    🔒 No obligation or credit card required. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency: 4-Column Full-Width Trust Strip */}
        <div className="mt-14 pt-8 border-t border-black/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${state.primaryColor}15`, color: state.primaryColor }}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Licensed & Insured</p>
              <p className="text-xs text-slate-600 mt-0.5">$2M liability coverage for complete peace of mind</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${state.primaryColor}15`, color: state.primaryColor }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">24-Hour Callback</p>
              <p className="text-xs text-slate-600 mt-0.5">Prompt estimate turnaround with zero waiting</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${state.primaryColor}15`, color: state.primaryColor }}
            >
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">12+ Years Local</p>
              <p className="text-xs text-slate-600 mt-0.5">Over 1,450 local yards maintained since 2012</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${state.primaryColor}15`, color: state.primaryColor }}
            >
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">No Lock-In Contracts</p>
              <p className="text-xs text-slate-600 mt-0.5">Flexible pay-per-visit or monthly billing</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
