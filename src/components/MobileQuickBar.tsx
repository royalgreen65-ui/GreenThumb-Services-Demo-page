import React from 'react';
import { Phone, Calculator, Sliders } from 'lucide-react';
import { useCustomizer } from '../context/CustomizerContext';

interface MobileQuickBarProps {
  onOpenQuoteModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenQuoteModal }) => {
  const { state, openDrawer } = useCustomizer();

  return (
    <aside
      aria-label="Mobile quick contact actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-black/10 px-3 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
      style={{ maxHeight: '12vh' }}
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${state.phoneClean}`}
          className="flex items-center justify-center gap-1.5 h-11 px-2 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg active:scale-95 transition-all text-center whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0" style={{ color: state.accentColor }} />
          <span>Call</span>
        </a>

        <button
          onClick={onOpenQuoteModal}
          className="flex items-center justify-center gap-1 h-11 px-2 text-xs font-bold text-white rounded-lg shadow-sm active:scale-95 transition-all text-center whitespace-nowrap"
          style={{ backgroundColor: state.primaryColor }}
        >
          <Calculator className="w-3.5 h-3.5 shrink-0" style={{ color: state.accentColor }} />
          <span>Quote</span>
        </button>

        <button
          onClick={() => openDrawer('colors')}
          className="flex items-center justify-center gap-1 h-11 px-2 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg active:scale-95 transition-all text-center whitespace-nowrap"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Edit</span>
        </button>
      </div>
    </aside>
  );
};
