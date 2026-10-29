import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useCustomizer } from '../context/CustomizerContext';

export const FinalCTA: React.FC<{ onOpenQuoteModal: () => void }> = ({ onOpenQuoteModal }) => {
  const { state } = useCustomizer();

  return (
    <section
      className="py-16 sm:py-24 text-white relative overflow-hidden transition-colors"
      style={{ backgroundColor: state.primaryColor }}
    >
      {/* Background soft ambient illumination */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <span
          className="text-xs font-bold uppercase tracking-widest block mb-3"
          style={{ color: state.accentColor }}
        >
          Get Your Weekends Back
        </span>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Ready for a pristine lawn without lifting a finger?
        </h2>

        <p
          className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl mx-auto text-balance"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Join local homeowners throughout {state.location} who trust {state.businessName} for clean cuts, reliable timing, and fair pricing.
        </p>

        {/* Action Pair: Direct Call + Estimate Form */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${state.phoneClean}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-slate-900 rounded-xl shadow-lg active:scale-98 transition-all whitespace-nowrap"
            style={{ backgroundColor: state.accentColor }}
          >
            <Phone className="w-5 h-5 text-slate-900" />
            <span>Call {state.phone}</span>
          </a>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl shadow-lg active:scale-98 transition-all whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-5 h-5" style={{ color: state.accentColor }} />
            <span>Request Free Online Estimate</span>
            <ArrowRight className="w-4 h-4 text-white/70 ml-1" />
          </button>
        </div>

        {/* Trust assurance strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/75">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" style={{ color: state.accentColor }} />
            <span>$2M General Liability Insurance</span>
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" style={{ color: state.accentColor }} />
            <span>Guaranteed 24-Hour Callback</span>
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Zero Long-Term Obligation</span>
        </div>

      </div>
    </section>
  );
};
