import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentHover: string;
  canvas: string;
  description: string;
}

export interface FontPreset {
  id: string;
  name: string;
  heading: string;
  body: string;
  styleDescription: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'forest-gold',
    name: 'Forest Green & Warm Gold',
    primary: '#133824',
    primaryHover: '#1B4D31',
    accent: '#D4A017',
    accentHover: '#B8860B',
    canvas: '#FAFBF9',
    description: 'Trustworthy, down-to-earth, and established',
  },
  {
    id: 'emerald-amber',
    name: 'Royal Emerald & Amber',
    primary: '#064E3B',
    primaryHover: '#047857',
    accent: '#F59E0B',
    accentHover: '#D97706',
    canvas: '#F4FBF7',
    description: 'Vibrant, high-contrast, and fresh curb appeal',
  },
  {
    id: 'earth-moss',
    name: 'Earth Sage & Warm Sand',
    primary: '#283618',
    primaryHover: '#384d22',
    accent: '#BC6C25',
    accentHover: '#995820',
    canvas: '#FAF8F5',
    description: 'Organic botanical and artisanal landscaping vibe',
  },
  {
    id: 'highland-navy',
    name: 'Deep Navy & Sunburst Gold',
    primary: '#0F1E2E',
    primaryHover: '#1B3147',
    accent: '#EAB308',
    accentHover: '#CA8A04',
    canvas: '#F8FAFC',
    description: 'Corporate commercial maintenance & HOA favorite',
  },
  {
    id: 'charcoal-lime',
    name: 'Architectural Charcoal & Lime',
    primary: '#181C19',
    primaryHover: '#2A302B',
    accent: '#65A30D',
    accentHover: '#4D7C0F',
    canvas: '#F9FAF9',
    description: 'Ultra-modern, sleek, and minimalist outdoor spaces',
  },
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'jakarta-public',
    name: 'Modern Executive (Recommended)',
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Public Sans', sans-serif",
    styleDescription: 'Geometric confidence paired with clear readability',
  },
  {
    id: 'outfit-dm',
    name: 'Architectural Bold',
    heading: "'Outfit', sans-serif",
    body: "'DM Sans', sans-serif",
    styleDescription: 'Contemporary round geometry with modern tech feel',
  },
  {
    id: 'manrope-public',
    name: 'Nordic Clean',
    heading: "'Manrope', sans-serif",
    body: "'Public Sans', sans-serif",
    styleDescription: 'Balanced European styling for high-end residential',
  },
  {
    id: 'playfair-lora',
    name: 'Luxury Estate Editorial',
    heading: "'Playfair Display', serif",
    body: "'Lora', serif",
    styleDescription: 'Prestigious country club & heritage estate look',
  },
  {
    id: 'dm-sans',
    name: 'Approachable Modern',
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
    styleDescription: 'Unified friendly and highly legible typography',
  },
];

export interface CustomizerState {
  // Colors
  primaryColor: string;
  primaryHover: string;
  accentColor: string;
  accentHover: string;
  canvasBg: string;

  // Typography
  headingFont: string;
  bodyFont: string;

  // Layout / Geometry
  borderRadius: string; // Tailwind class
  borderRadiusPx: number;

  // Content
  businessName: string;
  phone: string;
  phoneClean: string;
  location: string;
  heroHeadline: string;
  heroSubhead: string;
  mowingStartPrice: string;
  landscapingStartPrice: string;
  licensedInsuredText: string;

  // Logo
  logoVariant: 'crest' | 'monogram' | 'seal';

  // UI state
  isEditDrawerOpen: boolean;
  isInlineEditActive: boolean;
  activeEditorTab: 'colors' | 'typography' | 'content' | 'layout' | 'logo';
}

interface CustomizerContextType {
  state: CustomizerState;
  updateState: (updates: Partial<CustomizerState>) => void;
  openDrawer: (tab?: 'colors' | 'typography' | 'content' | 'layout' | 'logo') => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  toggleInlineEdit: () => void;
  applyColorPreset: (presetId: string) => void;
  applyFontPreset: (presetId: string) => void;
  resetDefaults: () => void;
  exportConfigJson: () => string;
}

const DEFAULT_STATE: CustomizerState = {
  primaryColor: '#133824',
  primaryHover: '#1B4D31',
  accentColor: '#D4A017',
  accentHover: '#B8860B',
  canvasBg: '#FAFBF9',

  headingFont: "'Plus Jakarta Sans', sans-serif",
  bodyFont: "'Public Sans', sans-serif",

  borderRadius: 'rounded-2xl',
  borderRadiusPx: 16,

  businessName: 'GreenThumb Services',
  phone: '(555) 382-5296',
  phoneClean: '+15553825296',
  location: 'Springfield & Surrounding Neighborhoods',
  heroHeadline: 'Reliable lawn care and distinctive landscaping for homeowners who value their time.',
  heroSubhead: 'From crisp weekly mowing with clean sidewalk edging to complete flagstone patios and seasonal cleanups. Transparent pricing, guaranteed 24-hour callbacks, and zero long-term contracts.',
  mowingStartPrice: '$45',
  landscapingStartPrice: '$850',
  licensedInsuredText: '$2M Licensed & Insured',

  logoVariant: 'crest',

  isEditDrawerOpen: false,
  isInlineEditActive: false,
  activeEditorTab: 'colors',
};

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CustomizerState>(() => {
    // Attempt to load saved customizations from localStorage
    try {
      const saved = localStorage.getItem('greenthumb_theme_customizer');
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      // Ignore storage errors
    }
    return DEFAULT_STATE;
  });

  // Apply CSS variables to root whenever state colors/fonts change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', state.primaryColor);
    root.style.setProperty('--color-primary-hover', state.primaryHover);
    root.style.setProperty('--color-accent', state.accentColor);
    root.style.setProperty('--color-accent-hover', state.accentHover);
    root.style.setProperty('--color-canvas', state.canvasBg);
    root.style.setProperty('--font-heading', state.headingFont);
    root.style.setProperty('--font-body', state.bodyFont);

    // Save to local storage for persistence across reloads
    try {
      localStorage.setItem('greenthumb_theme_customizer', JSON.stringify(state));
    } catch (e) {}
  }, [
    state.primaryColor,
    state.primaryHover,
    state.accentColor,
    state.accentHover,
    state.canvasBg,
    state.headingFont,
    state.bodyFont,
  ]);

  const updateState = (updates: Partial<CustomizerState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      if (updates.phone) {
        next.phoneClean = updates.phone.replace(/[^0-9+]/g, '');
      }
      return next;
    });
  };

  const openDrawer = (tab?: 'colors' | 'typography' | 'content' | 'layout' | 'logo') => {
    setState((prev) => ({
      ...prev,
      isEditDrawerOpen: true,
      activeEditorTab: tab || prev.activeEditorTab,
    }));
  };

  const closeDrawer = () => {
    setState((prev) => ({ ...prev, isEditDrawerOpen: false }));
  };

  const toggleDrawer = () => {
    setState((prev) => ({ ...prev, isEditDrawerOpen: !prev.isEditDrawerOpen }));
  };

  const toggleInlineEdit = () => {
    setState((prev) => ({ ...prev, isInlineEditActive: !prev.isInlineEditActive }));
  };

  const applyColorPreset = (presetId: string) => {
    const p = COLOR_PRESETS.find((preset) => preset.id === presetId);
    if (!p) return;
    updateState({
      primaryColor: p.primary,
      primaryHover: p.primaryHover,
      accentColor: p.accent,
      accentHover: p.accentHover,
      canvasBg: p.canvas,
    });
  };

  const applyFontPreset = (presetId: string) => {
    const f = FONT_PRESETS.find((font) => font.id === presetId);
    if (!f) return;
    updateState({
      headingFont: f.heading,
      bodyFont: f.body,
    });
  };

  const resetDefaults = () => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem('greenthumb_theme_customizer');
    } catch (e) {}
  };

  const exportConfigJson = () => {
    const exportable = {
      theme: {
        primaryColor: state.primaryColor,
        primaryHover: state.primaryHover,
        accentColor: state.accentColor,
        accentHover: state.accentHover,
        canvasBg: state.canvasBg,
        headingFont: state.headingFont,
        bodyFont: state.bodyFont,
        borderRadius: state.borderRadius,
      },
      business: {
        name: state.businessName,
        phone: state.phone,
        location: state.location,
        headline: state.heroHeadline,
        subhead: state.heroSubhead,
        mowingStartPrice: state.mowingStartPrice,
      },
    };
    return JSON.stringify(exportable, null, 2);
  };

  return (
    <CustomizerContext.Provider
      value={{
        state,
        updateState,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        toggleInlineEdit,
        applyColorPreset,
        applyFontPreset,
        resetDefaults,
        exportConfigJson,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
