/**
 * FE kite mark — pure SVG, scales cleanly from 28px (nav) up to 240px (hero).
 * Letters drawn as <text> in Cormorant Garamond (already loaded site-wide).
 */
function FEMark({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="feKite1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0CC78" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#B8922A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1A3A8F" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="feKite2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0CC78" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B8922A" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="feGoldF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0CC78" />
          <stop offset="55%" stopColor="#B8922A" />
          <stop offset="100%" stopColor="#8A6010" />
        </linearGradient>
        <linearGradient id="feGoldE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0F3FA" />
          <stop offset="60%" stopColor="#F0CC78" />
          <stop offset="100%" stopColor="#B8922A" />
        </linearGradient>
      </defs>

      {/* Rotating kite frame — rotates around exact center (120,120) */}
      <g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 120 120"
          to="360 120 120"
          dur="30s"
          repeatCount="indefinite"
        />
        {/* Outer kite */}
        <path d="M120,8 L228,120 L120,232 L12,120 Z" stroke="url(#feKite1)" strokeWidth="1.2" fill="none" />
        {/* Inner kite */}
        <path d="M120,20 L216,120 L120,220 L24,120 Z" stroke="url(#feKite2)" strokeWidth="0.6" fill="none" />

        {/* Tip ticks */}
        <line x1="120" y1="8" x2="120" y2="18" stroke="#F0CC78" strokeWidth="1.2" opacity="0.8" />
        <line x1="228" y1="120" x2="218" y2="120" stroke="#F0CC78" strokeWidth="1.2" opacity="0.8" />
        <line x1="120" y1="232" x2="120" y2="222" stroke="#F0CC78" strokeWidth="1.2" opacity="0.8" />
        <line x1="12" y1="120" x2="22" y2="120" stroke="#F0CC78" strokeWidth="1.2" opacity="0.8" />

        {/* Mid ticks */}
        <line x1="174" y1="64" x2="168.5" y2="69.5" stroke="#B8922A" strokeWidth="0.8" opacity="0.55" />
        <line x1="174" y1="176" x2="168.5" y2="170.5" stroke="#B8922A" strokeWidth="0.8" opacity="0.55" />
        <line x1="66" y1="176" x2="71.5" y2="170.5" stroke="#B8922A" strokeWidth="0.8" opacity="0.55" />
        <line x1="66" y1="64" x2="71.5" y2="69.5" stroke="#B8922A" strokeWidth="0.8" opacity="0.55" />

        {/* Diamond gems at 4 tips */}
        <rect x="116.5" y="4.5" width="7" height="7" transform="rotate(45 120 8)" fill="#F0CC78" opacity="0.9" />
        <rect x="224.5" y="116.5" width="7" height="7" transform="rotate(45 228 120)" fill="#F0CC78" opacity="0.9" />
        <rect x="116.5" y="228.5" width="7" height="7" transform="rotate(45 120 232)" fill="#F0CC78" opacity="0.9" />
        <rect x="8.5" y="116.5" width="7" height="7" transform="rotate(45 12 120)" fill="#F0CC78" opacity="0.9" />

        {/* Accent inner line */}
        <path d="M120,14 L222,120 L120,226 L18,120 Z" stroke="#1A3A8F" strokeWidth="0.4" fill="none" opacity="0.5" />
      </g>

      {/* FE monogram — centered on (120, 120), does NOT rotate */}
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
      >
        <tspan fontSize="105" fontWeight="700" fill="url(#feGoldF)">F</tspan>
        <tspan fontSize="78" fontWeight="500" fill="url(#feGoldE)" opacity="0.9" dx="-4">E</tspan>
      </text>
    </svg>
  );
}

/**
 * Horizontal lockup — small kite mark + wordmark.
 * Used in nav and footer.
 */
export function LogoInline({ markSize = 36, wordmarkSize = 22 }) {
  return (
    <span className="inline-flex items-center gap-3">
      <FEMark size={markSize} />
      <span
        className="font-serif font-bold text-white tracking-brand leading-none"
        style={{ fontSize: wordmarkSize }}
      >
        FLUENT <span className="text-gold-light">ENGLISH</span>
      </span>
    </span>
  );
}

/**
 * Stacked lockup — large kite mark + divider + wordmark + tagline.
 * Used in the hero.
 */
export function LogoStacked({ markSize = 200 }) {
  return (
    <div className="flex flex-col items-center text-center">
      <FEMark size={markSize} />

      {/* Divider */}
      <div className="flex items-center gap-3 mt-2 mb-4">
        <span
          className="block h-px"
          style={{ width: 70, background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.75))' }}
        />
        <span
          className="block w-[6px] h-[6px] rotate-45 bg-gold-light"
          style={{ boxShadow: '0 0 6px rgba(240,204,120,0.5)' }}
        />
        <span
          className="block h-px"
          style={{ width: 70, background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.75))' }}
        />
      </div>

      {/* Wordmark */}
      <p
        className="font-serif font-medium text-offwhite uppercase"
        style={{ fontSize: 22, letterSpacing: '0.45em' }}
      >
        Fluent <span>English</span>
      </p>

      {/* Tagline */}
      <p
        className="font-serif italic mt-2 uppercase"
        style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(184,146,42,0.7)' }}
      >
        Mastery through language
      </p>
    </div>
  );
}

export default LogoInline;
