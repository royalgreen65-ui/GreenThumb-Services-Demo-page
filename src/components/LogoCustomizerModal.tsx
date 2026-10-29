import React, { useState } from 'react';
import { X, Check, Copy, Download, Sparkles, Shield, Palette } from 'lucide-react';
import { Logo } from './Logo';

interface LogoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVariant: 'crest' | 'monogram' | 'seal';
  onChangeVariant: (variant: 'crest' | 'monogram' | 'seal') => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentVariant,
  onChangeVariant,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'concepts' | 'preview'>('concepts');

  if (!isOpen) return null;

  const getSvgCode = (v: 'crest' | 'monogram' | 'seal') => {
    if (v === 'crest') {
      return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B4D31"/>
      <stop offset="100%" stop-color="#0E291A"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3C64F"/>
      <stop offset="100%" stop-color="#D4A017"/>
    </linearGradient>
  </defs>
  <path d="M 50 6 L 86 20 C 86 52 72 80 50 94 C 28 80 14 52 14 20 Z" fill="url(#crestGrad)" stroke="url(#goldGrad)" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M 50 13 L 80 25 C 80 50 68 74 50 86 C 32 74 20 50 20 25 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  <path d="M 50 72 C 34 60 28 42 42 27 C 48 38 48 54 50 72 Z" fill="#2D8A4E" opacity="0.95"/>
  <path d="M 50 72 C 66 60 72 42 58 27 C 52 38 52 54 50 72 Z" fill="#226D3E" opacity="0.85"/>
  <path d="M 50 78 L 50 26" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="50" cy="24" r="3.5" fill="url(#goldGrad)"/>
</svg>`;
    } else if (v === 'monogram') {
      return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#133824" stroke="#D4A017" stroke-width="2.5"/>
  <path d="M 68 34 C 62 25 48 22 36 28 C 22 35 18 55 24 68 C 30 80 50 84 64 78 C 74 72 78 60 78 48 L 50 48" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 50 48 C 50 36 58 26 70 24 C 70 34 64 44 50 48 Z" fill="#F3C64F"/>
</svg>`;
    } else {
      return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="44" fill="#FAFBF9" stroke="#133824" stroke-width="3"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="#D4A017" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M 50 74 C 50 50 35 38 35 28 C 45 28 50 42 50 74 Z" fill="#1B4D31"/>
  <path d="M 50 74 C 50 50 65 38 65 28 C 55 28 50 42 50 74 Z" fill="#D4A017" opacity="0.9"/>
  <line x1="50" y1="74" x2="50" y2="22" stroke="#133824" stroke-width="2" stroke-linecap="round"/>
</svg>`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSvgCode(currentVariant));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const code = getSvgCode(currentVariant);
    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greenthumb-logo-${currentVariant}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl border border-[#133824]/20 shadow-2xl max-w-3xl w-full overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#FAFBF9] px-6 py-4 border-b border-[#133824]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#B8860B]" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#133824]">
                Brand Identity & Modern SVG Logo Studio
              </h3>
              <p className="text-xs text-[#4A6354]">
                Fresh vector iterations designed for sharp visibility on web, work trucks, and print
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#133824] hover:bg-[#133824]/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Context comparison bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#FAFBF9] rounded-xl border border-[#133824]/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A6354]">
                Original Concept (Before)
              </span>
              <div className="mt-1 font-mono text-[11px] bg-slate-900 text-emerald-400 p-2.5 rounded-lg leading-tight overflow-x-auto whitespace-pre">
{`   .-----------------.
  /   [ GREEN THUMB ] \\
 |      / \\   / \\      |
 |     (   \\ /   )     |
  \\     \\   |   /     /
   '-----------------'
     LAWN & LANDSCAPE`}
              </div>
              <p className="text-[11px] text-[#4A6354] mt-1.5">
                Simple hexagonal border with hand-sketched leaf veins.
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8860B]">
                  Design Upgrades Applied
                </span>
                <ul className="mt-1.5 space-y-1 text-xs text-[#2C4A38]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Proportional Shield & Crest</strong>: Clean angles engineered to scale down to 16px favicons without pixel blur.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Dual-Tone Lawn Blades</strong>: Rich emerald & forest greens symbolize lush healthy turf.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>Warm Gold Apex Sprout</strong>: Highlights quality, craftsmanship, and local trust.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 text-xs text-[#133824] font-semibold">
                Click any concept below to apply it across the entire site in real-time.
              </div>
            </div>
          </div>

          {/* 3 Logo Direction Options */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#133824]">
              Select A Modern Direction:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'crest',
                  title: 'Concept 1: Modern Heritage Crest',
                  tag: 'Recommended',
                  desc: 'Geometric heraldic shield with dual-tone grass blades and gold sun beacon.',
                },
                {
                  id: 'monogram',
                  title: 'Concept 2: Geometric "G" Monogram',
                  tag: 'Bold & Modern',
                  desc: 'High-contrast lettermark with stylized upward leaf growth stem.',
                },
                {
                  id: 'seal',
                  title: 'Concept 3: Botanical Stamp',
                  tag: 'Classic & Craft',
                  desc: 'Architectural circular stamp with dashed gold perimeter.',
                },
              ].map((opt) => {
                const active = currentVariant === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeVariant(opt.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? 'bg-[#133824]/5 border-[#133824] shadow-sm ring-2 ring-[#133824]/20'
                        : 'bg-white border-[#133824]/15 hover:border-[#133824]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${active ? 'bg-[#133824] text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {opt.tag}
                        </span>
                        {active && <Check className="w-4 h-4 text-emerald-700" />}
                      </div>

                      <div className="h-16 flex items-center justify-center my-2">
                        <Logo variant={opt.id as any} size="lg" showWordmark={false} />
                      </div>

                      <div className="text-xs font-bold text-[#133824] text-center mt-2">
                        {opt.title}
                      </div>
                      <p className="text-[11px] text-[#4A6354] text-center mt-1">
                        {opt.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#133824]/10 text-center">
                      <span className={`text-xs font-bold ${active ? 'text-[#133824]' : 'text-[#4A6354]'}`}>
                        {active ? 'Currently Active On Site' : 'Click To Activate'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Mockup Demonstration (Light vs Dark Surface) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#133824]">
              Real-World Surface Contrast Test
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Light Background (Web header & Letterhead) */}
              <div className="p-4 bg-[#FAFBF9] rounded-xl border border-[#133824]/15 flex flex-col justify-between">
                <span className="text-[10px] font-semibold text-[#4A6354] uppercase tracking-wider mb-2">
                  Light Surface (Website Header / Business Cards)
                </span>
                <div className="py-3 flex items-center justify-center">
                  <Logo variant={currentVariant} size="lg" showWordmark={true} theme="dark" />
                </div>
                <span className="text-[10px] text-emerald-800 text-center font-medium">
                  ✓ High-contrast WCAG AA compliant on off-white
                </span>
              </div>

              {/* Dark Forest Green Background (Truck Door / Crew Uniform / Footer) */}
              <div className="p-4 bg-[#133824] rounded-xl border border-[#133824]/30 flex flex-col justify-between">
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Dark Green Surface (Truck Doors / Hoodies / Footer)
                </span>
                <div className="py-3 flex items-center justify-center">
                  <Logo variant={currentVariant} size="lg" showWordmark={true} theme="light" />
                </div>
                <span className="text-[10px] text-[#E6C65C] text-center font-medium">
                  ✓ Crisp vector illumination against deep forest green
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer: Export Options */}
          <div className="pt-4 border-t border-[#133824]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#4A6354] text-center sm:text-left">
              Format: Pure XML SVG vector (scales infinitely to billboard size).
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-[#133824] bg-[#FAFBF9] hover:bg-[#133824]/5 border border-[#133824]/20 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'SVG Copied!' : 'Copy SVG Code'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-[#133824] hover:bg-[#1B4D31] rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#E6C65C]" />
                <span>Download .SVG File</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
