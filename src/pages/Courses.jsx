import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { COURSES } from '../data/courses.js';

function CourseSection({ c }) {
  return (
    <section id={c.id} className="scroll-mt-32">
      <div
        className="text-white px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{ background: c.bg }}
      >
        <div>
          <p className="text-[8.5px] uppercase tracking-wider text-gold-mid font-sans">{c.tier}</p>
          <h2 className="font-serif font-bold text-[28px] mt-1 text-white">{c.name}</h2>
        </div>
        <div className="flex flex-col md:items-end">
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-[34px] text-white">{c.priceLabel.split('/')[0]}</span>
            <span className="text-white/60 text-[12px]">/ session</span>
          </div>
          <span className="text-white/55 text-[11px] mt-0.5">{c.priceUsdLabel.replace('/ hr', '/ session')}</span>
        </div>
      </div>

      <div className="bg-white px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 border border-border-light border-t-0">
        <div className="lg:col-span-2">
          <p className="font-sans font-semibold text-[10px] uppercase text-navy-royal mb-2">This Course Is For You If…</p>
          <ul className="space-y-2">
            {c.forYou.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[11px] text-ink-slate" style={{ lineHeight: 1.72 }}>
                <span className="mt-[6px] block w-[6px] h-[6px] bg-gold rotate-45 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="font-sans font-semibold text-[10px] uppercase text-navy-royal mt-7 mb-2">What You'll Learn</p>
          <p className="text-[10px] text-gold leading-relaxed">{c.learn.join(' · ')}</p>

          <div className="mt-7 p-5" style={{ background: 'rgba(26,58,143,0.05)', border: '1px solid rgba(26,58,143,0.12)' }}>
            <p className="text-[8px] uppercase tracking-wider text-navy-royal font-semibold">Your Journey By Duration</p>
            <div className="mt-3 space-y-2">
              {c.journey.map(([d, t]) => (
                <div key={d} className="flex items-baseline gap-4 text-[9px]">
                  <span className="font-semibold text-navy-royal min-w-[60px]">{d}</span>
                  <span className="text-ink-slate">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 pt-4 text-[10px] text-forest border-t border-dashed border-border-light">
            ◆ By the end: {c.achievement}
          </p>
        </div>

        <div className="bg-offwhite border-l border-border-light p-5">
          <p className="text-[9px] uppercase tracking-wider text-ink-slate font-semibold">Fee Breakdown</p>
          <div className="mt-3 space-y-2">
            {c.fees.map(([d, p, u]) => (
              <div key={d} className="flex justify-between items-baseline text-[11px]">
                <span className="text-ink-slate">{d}</span>
                <span className="text-right">
                  <span className="font-semibold text-navy-royal">{p}</span>
                  <span className="block text-[9.5px] text-ink-slate/70 mt-0.5">{u}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-border-light px-6 md:px-10 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-navy-dark">
        {(c.sessionInfo || ['60 Min / Session', 'Live & 1-on-1', 'Customised & Flexible', 'Daily Progress Report']).map((x) => (
          <span key={x} className="inline-flex items-center gap-2">
            <span className="block w-[5px] h-[5px] bg-gold rotate-45" />
            {x}
          </span>
        ))}
      </div>

      <div className="bg-white px-6 md:px-10 py-6 border border-t-0 border-border-light">
        <Link
          to={`/contact?course=${encodeURIComponent(c.name)}&amount=${c.price}`}
          className="inline-flex bg-gold hover:bg-gold-mid text-navy font-sans font-semibold text-[12px] px-6 py-3 transition-colors"
        >
          Enrol in This Course
        </Link>
      </div>
    </section>
  );
}

export default function Courses() {
  const [active, setActive] = useState(COURSES[0].id);

  const onTab = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageHero
        label="Our Programmes"
        title="Five courses. One"
        italicWord="destination."
        sub="Private · Live · 1-on-1 · 60 Minutes · Built Around You"
      />

      <div className="sticky top-16 z-30 bg-white border-b border-border-light">
        <div className="container-fe overflow-x-auto no-scrollbar">
          <div className="flex gap-2 py-3 min-w-max">
            {COURSES.map((c) => (
              <button
                key={c.id}
                onClick={() => onTab(c.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${
                  active === c.id ? 'bg-navy text-white' : 'bg-white text-navy-dark border border-border-light hover:border-gold'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-offwhite py-12">
        <div className="container-fe space-y-10">
          {COURSES.map((c) => (
            <div key={c.id} className="reveal">
              <CourseSection c={c} />
            </div>
          ))}
        </div>
      </div>

      <section className="bg-offwhite border-y border-border-light py-8">
        <div className="container-fe flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[9.5px] uppercase tracking-wider font-semibold text-navy-royal">Combo Packages Available</p>
            <p className="body-text mt-1">Pair any two programmes for a custom combined plan tailored to your goals.</p>
          </div>
          <Link to="/contact" className="font-serif italic text-[18px] text-gold hover:text-gold-mid">
            Ask us →
          </Link>
        </div>
      </section>
    </>
  );
}
