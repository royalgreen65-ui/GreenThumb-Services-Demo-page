import React, { useState } from 'react';
import {
  X,
  Palette,
  Type,
  FileText,
  Sliders,
  RotateCcw,
  Check,
  Copy,
  Sparkles,
  Eye,
  Shield,
  Download,
} from 'lucide-react';
import {
  useCustomizer,
  COLOR_PRESETS,
  FONT_PRESETS,
} from '../context/CustomizerContext';
import { Logo } from './Logo';

export const CustomizerDrawer: React.FC = () => {
  const {
    state,
    updateState,
    closeDrawer,
    applyColorPreset,
    applyFontPreset,
    resetDefaults,
    exportConfigJson,
    toggleInlineEdit,
  } = useCustomizer();

  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'content' | 'layout'>(
    'colors'
  );
  const [copied, setCopied] = useState(false);

  if (!state.isEditDrawerOpen) return null;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(exportConfigJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 relative animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#FAFBF9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: state.primaryColor }}
            >
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Live Site Customizer
              </h2>
              <p className="text-xs text-slate-500">
                Click any option to test colors, fonts & copy live
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          {[
            { id: 'colors', label: 'Colors', icon: Palette },
            { id: 'typography', label: 'Fonts', icon: Type },
            { id: 'content', label: 'Copy', icon: FileText },
            { id: 'layout', label: 'Style', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 rounded-md flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Curated Color Palettes
                </label>
                <div className="space-y-2">
                  {COLOR_PRESETS.map((preset) => {
                    const isSelected =
                      state.primaryColor.toLowerCase() === preset.primary.toLowerCase() &&
                      state.accentColor.toLowerCase() === preset.accent.toLowerCase();
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyColorPreset(preset.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {preset.description}
                          </p>
                        </div>

                        {/* Swatches */}
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <span
                            className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: preset.primary }}
                            title="Primary"
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: preset.accent }}
                            title="Accent"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Hex Color Pickers */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Custom Brand Colors
                </label>

                {/* Primary Color Picker */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Primary Base Color
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Header, hero buttons, footer, cards
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-700">
                      {state.primaryColor}
                    </span>
                    <input
                      type="color"
                      value={state.primaryColor}
                      onChange={(e) =>
                        updateState({
                          primaryColor: e.target.value,
                          primaryHover: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                    />
                  </div>
                </div>

                {/* Accent Color Picker */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Accent Color
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Gold highlights, icons, stars, badges
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-700">
                      {state.accentColor}
                    </span>
                    <input
                      type="color"
                      value={state.accentColor}
                      onChange={(e) =>
                        updateState({
                          accentColor: e.target.value,
                          accentHover: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                    />
                  </div>
                </div>

                {/* Canvas Background Tone */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Canvas Tone
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Subtle background canvas tint
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-700">
                      {state.canvasBg}
                    </span>
                    <input
                      type="color"
                      value={state.canvasBg}
                      onChange={(e) => updateState({ canvasBg: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === 'typography' && (
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Editorial Font Pairings
              </label>

              <div className="space-y-2.5">
                {FONT_PRESETS.map((preset) => {
                  const isSelected = state.headingFont === preset.heading;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyFontPreset(preset.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Live preview in the font */}
                      <div
                        className="text-base font-bold text-slate-800 leading-snug my-1"
                        style={{ fontFamily: preset.heading }}
                      >
                        GreenThumb Lawn & Landscape
                      </div>
                      <p
                        className="text-xs text-slate-600 leading-relaxed"
                        style={{ fontFamily: preset.body }}
                      >
                        {preset.styleDescription} · Clean weekly cuts & landscape design.
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT & COPY */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={state.businessName}
                  onChange={(e) => updateState({ businessName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={state.phone}
                    onChange={(e) => updateState({ phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Starting Cut Price
                  </label>
                  <input
                    type="text"
                    value={state.mowingStartPrice}
                    onChange={(e) => updateState({ mowingStartPrice: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Service Area / Location Line
                </label>
                <input
                  type="text"
                  value={state.location}
                  onChange={(e) => updateState({ location: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Hero Value Proposition Headline
                </label>
                <textarea
                  rows={2}
                  value={state.heroHeadline}
                  onChange={(e) => updateState({ heroHeadline: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Hero Supporting Subhead
                </label>
                <textarea
                  rows={3}
                  value={state.heroSubhead}
                  onChange={(e) => updateState({ heroSubhead: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus-ring"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleInlineEdit}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    state.isInlineEditActive
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {state.isInlineEditActive
                      ? 'Disable Visual Highlight Borders'
                      : 'Highlight Editable Text On Page'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: LAYOUT & LOGO */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              {/* Logo Variant */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Active Brand Logo Mark
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'crest', label: 'Crest' },
                    { id: 'monogram', label: 'Monogram' },
                    { id: 'seal', label: 'Seal' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateState({ logoVariant: item.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        state.logoVariant === item.id
                          ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="h-10 flex items-center justify-center mb-1">
                        <Logo variant={item.id as any} size="sm" showWordmark={false} />
                      </div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Corner Roundness */}
              <div className="pt-4 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Card Corner Radius
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rounded-lg', label: 'Crisp (8px)', px: 8 },
                    { id: 'rounded-2xl', label: 'Modern (16px)', px: 16 },
                    { id: 'rounded-3xl', label: 'Soft (24px)', px: 24 },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => updateState({ borderRadius: r.id, borderRadiusPx: r.px })}
                      className={`py-2 px-3 text-xs font-bold border rounded-lg transition-all cursor-pointer ${
                        state.borderRadius === r.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-[#FAFBF9] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={resetDefaults}
            className="p-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default theme"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyConfig}
              className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Export JSON'}</span>
            </button>

            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              Apply & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
