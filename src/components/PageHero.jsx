import { CornerBracket } from './Ornaments.jsx';

export default function PageHero({ label, title, italicWord, sub, height = 260 }) {
  // title is rendered as plain text; italicWord (optional) is appended in italic
  return (
    <section
      className="relative bg-navy text-white pt-20 overflow-hidden"
      style={{ minHeight: height }}
    >
      <CornerBracket position="tl" />
      <CornerBracket position="br" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top right, transparent, transparent 49.5%, #B8922A 49.6%, #B8922A 50.4%, transparent 50.5%)',
        }}
      />
      <div className="container-fe relative pt-12 pb-14">
        <p className="label-cap text-gold-mid">{label}</p>
        <h1 className="font-serif font-bold text-[32px] md:text-[44px] mt-4 leading-[1.05]">
          {title}
          {italicWord && <span className="italic font-normal"> {italicWord}</span>}
        </h1>
        {sub && <p className="mt-4 text-[12px] md:text-[13px] text-white/55 max-w-2xl">{sub}</p>}
      </div>
    </section>
  );
}
