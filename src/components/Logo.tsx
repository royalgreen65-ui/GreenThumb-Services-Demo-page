import React from 'react';

export interface LogoProps {
  variant?: 'crest' | 'monogram' | 'seal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  theme?: 'dark' | 'light' | 'gold';
  customPrimary?: string;
  customAccent?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'crest',
  size = 'md',
  showWordmark = true,
  theme = 'dark',
  customPrimary,
  customAccent,
  className = '',
}) => {
  // Dimensions
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68,
  };

  const dim = iconSizes[size] || 40;

  // Color schemes (dynamically respects customizer colors)
  const isDarkCanvas = theme === 'light'; // Light text for dark canvas (footer, dark green blocks)
  const defaultPrimary = isDarkCanvas ? '#FAFBF9' : (customPrimary || '#133824');
  const leafGreen = isDarkCanvas ? '#4ADE80' : (customPrimary || '#1B4D31');
  const goldAccent = customAccent || '#D4A017';
  const goldHighlight = isDarkCanvas ? '#FDE047' : '#F3C64F';
  const subtitleColor = isDarkCanvas ? 'rgba(250, 251, 249, 0.75)' : '#4A6354';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Mark */}
      <div className="shrink-0 flex items-center justify-center">
        {variant === 'crest' && (
          /* Modernized Heritage Crest: Evolved from the client's hexagon/shield + leaf concept */
          <svg
            width={dim}
            height={dim}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200"
            aria-label="GreenThumb Services Crest Logo"
          >
            <defs>
              <linearGradient id={`crestGrad-${theme}-${goldAccent}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={customPrimary || '#1B4D31'} />
                <stop offset="100%" stopColor="#0E291A" />
              </linearGradient>
              <linearGradient id={`goldGrad-${theme}-${goldAccent}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={goldHighlight} />
                <stop offset="100%" stopColor={goldAccent} />
              </linearGradient>
            </defs>

            {/* Geometric Shield / Crest Outline */}
            <path
              d="M 50 6 L 86 20 C 86 52 72 80 50 94 C 28 80 14 52 14 20 Z"
              fill={isDarkCanvas ? defaultPrimary : `url(#crestGrad-${theme}-${goldAccent})`}
              stroke={`url(#goldGrad-${theme}-${goldAccent})`}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Inner Precision Contour */}
            <path
              d="M 50 13 L 80 25 C 80 50 68 74 50 86 C 32 74 20 50 20 25 Z"
              fill="none"
              stroke={isDarkCanvas ? 'rgba(243, 198, 79, 0.3)' : 'rgba(255, 255, 255, 0.15)'}
              strokeWidth="1.5"
            />

            {/* Stylized Twin Leaf & Central Grass Spire */}
            {/* Left Leaf Blade */}
            <path
              d="M 50 72 C 34 60 28 42 42 27 C 48 38 48 54 50 72 Z"
              fill={isDarkCanvas ? '#34D399' : '#2D8A4E'}
              opacity="0.95"
            />

            {/* Right Leaf Blade */}
            <path
              d="M 50 72 C 66 60 72 42 58 27 C 52 38 52 54 50 72 Z"
              fill={isDarkCanvas ? '#6EE7B7' : '#226D3E'}
              opacity="0.85"
            />

            {/* Center Growth Line & Gold Apex Star / Sprout */}
            <path
              d="M 50 78 L 50 26"
              stroke={`url(#goldGrad-${theme}-${goldAccent})`}
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Golden Sun Sprout Beacon at top */}
            <circle cx="50" cy="24" r="3.5" fill={`url(#goldGrad-${theme}-${goldAccent})`} />
          </svg>
        )}

        {variant === 'monogram' && (
          /* Geometric "G" Monogram intertwining with an emerald leaf blade */
          <svg
            width={dim}
            height={dim}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GreenThumb Monogram Logo"
          >
            <defs>
              <linearGradient id={`monoGrad-${theme}-${goldAccent}`} x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor={customPrimary || '#1B4D31'} />
                <stop offset="100%" stopColor="#133824" />
              </linearGradient>
            </defs>
            {/* Background pill rounded container */}
            <rect
              x="6"
              y="6"
              width="88"
              height="88"
              rx="22"
              fill={isDarkCanvas ? (customPrimary || '#173E29') : `url(#monoGrad-${theme}-${goldAccent})`}
              stroke={goldAccent}
              strokeWidth="2.5"
            />
            {/* Geometric stylized 'G' that transforms into a leaf stem */}
            <path
              d="M 68 34 C 62 25 48 22 36 28 C 22 35 18 55 24 68 C 30 80 50 84 64 78 C 74 72 78 60 78 48 L 50 48"
              stroke={isDarkCanvas ? '#FAFBF9' : '#FFFFFF'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Leaf sprout accent inside the G */}
            <path
              d="M 50 48 C 50 36 58 26 70 24 C 70 34 64 44 50 48 Z"
              fill={goldHighlight}
            />
          </svg>
        )}

        {variant === 'seal' && (
          /* Minimalist Architectural Botanical Seal */
          <svg
            width={dim}
            height={dim}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="GreenThumb Botanical Seal"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill={isDarkCanvas ? (customPrimary || '#133824') : '#FAFBF9'}
              stroke={isDarkCanvas ? '#FAFBF9' : (customPrimary || '#133824')}
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke={goldAccent}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Botanical Frond Center */}
            <path
              d="M 50 74 C 50 50 35 38 35 28 C 45 28 50 42 50 74 Z"
              fill={leafGreen}
            />
            <path
              d="M 50 74 C 50 50 65 38 65 28 C 55 28 50 42 50 74 Z"
              fill={goldAccent}
              opacity="0.9"
            />
            <line x1="50" y1="74" x2="50" y2="22" stroke={defaultPrimary} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Typography Wordmark & Subtitle */}
      {showWordmark && (
        <div className="flex flex-col justify-center text-left leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className="text-lg sm:text-xl font-black tracking-tight"
              style={{ color: defaultPrimary, fontFamily: 'var(--font-heading)' }}
            >
              GreenThumb
            </span>
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-wider"
              style={{ color: goldAccent }}
            >
              Services
            </span>
          </div>
          <span
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] mt-1"
            style={{ color: subtitleColor }}
          >
            Lawn & Landscape
          </span>
        </div>
      )}
    </div>
  );
};
