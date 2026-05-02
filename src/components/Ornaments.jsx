export function CornerBracket({ position = 'tl' }) {
  const styles = {
    tl: 'top-6 left-6 border-t-2 border-l-2',
    tr: 'top-6 right-6 border-t-2 border-r-2',
    bl: 'bottom-6 left-6 border-b-2 border-l-2',
    br: 'bottom-6 right-6 border-b-2 border-r-2',
  };
  return (
    <div
      className={`pointer-events-none absolute w-12 h-12 border-gold ${styles[position]}`}
      aria-hidden
    />
  );
}

export function DiamondOrnament({ size = 48 }) {
  const inner = Math.round(size / 3);
  return (
    <div
      className="relative inline-flex items-center justify-center rotate-45 border-[1.5px] border-gold"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="bg-gold"
        style={{ width: inner, height: inner }}
      />
    </div>
  );
}

export function TripleDiamondDivider({ light = false }) {
  return (
    <div className="flex items-center justify-center gap-3 my-5" aria-hidden>
      <span className={`h-px w-10 ${light ? 'bg-white/20' : 'bg-gold/40'}`} />
      <span className="block w-[5px] h-[5px] bg-gold rotate-45" />
      <span className="block w-[5px] h-[5px] bg-gold rotate-45" />
      <span className="block w-[5px] h-[5px] bg-gold rotate-45" />
      <span className={`h-px w-10 ${light ? 'bg-white/20' : 'bg-gold/40'}`} />
    </div>
  );
}

export function GoldDiamondBullet() {
  return <span className="inline-block w-[6px] h-[6px] bg-gold rotate-45 mr-2 align-middle" aria-hidden />;
}
