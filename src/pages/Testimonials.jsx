import { useState, useMemo } from 'react';
import PageHero from '../components/PageHero.jsx';
import { TESTIMONIALS, FEATURED_TESTIMONIAL } from '../data/testimonials.js';

const PROGRAMMES = ['All Programmes', 'Communication Mastery', 'Professional English', 'Interview Advantage', 'Public Speaking'];

export default function Testimonials() {
  const [stars, setStars] = useState(0);
  const [prog, setProg] = useState('All Programmes');

  const filtered = useMemo(
    () =>
      TESTIMONIALS.filter(
        (t) =>
          (stars === 0 || t.stars === stars) &&
          (prog === 'All Programmes' || t.course === prog)
      ),
    [stars, prog]
  );

  return (
    <>
      <PageHero
        label="What Our Students Say"
        title="Words from those who found"
        italicWord="their edge."
        sub="Real results from real students across our programmes."
        height={240}
      />

      <section className="bg-white py-12">
        <div className="container-fe max-w-4xl">
          <div className="pull-quote">
            <em>Our students don't just speak better — they carry themselves differently. They walk into interviews and meetings with something they didn't have before: certainty.</em>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <span className="absolute top-6 right-10 font-serif text-white/[0.04] select-none pointer-events-none" style={{ fontSize: 130, lineHeight: 1 }}>"</span>
        <div className="container-fe reveal max-w-3xl">
          <p className="font-serif italic text-[18px] text-white/85" style={{ lineHeight: 1.6 }}>
            "{FEATURED_TESTIMONIAL.quote}"
          </p>
          <p className="text-[9.5px] uppercase tracking-wider text-gold-mid mt-6">
            — {FEATURED_TESTIMONIAL.name}, {FEATURED_TESTIMONIAL.role} · {FEATURED_TESTIMONIAL.course} · {'★'.repeat(FEATURED_TESTIMONIAL.stars)}
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-fe reveal">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider text-ink-slate">Filter by stars:</span>
              <button onClick={() => setStars(0)} className={`text-[11px] px-3 py-1 ${stars === 0 ? 'bg-navy text-white' : 'bg-offwhite text-navy-dark'}`}>All</button>
              {[5, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setStars(s)}
                  className={`text-[12px] tracking-widest px-3 py-1 ${stars === s ? 'bg-navy text-gold-light' : 'bg-offwhite text-gold'}`}
                >
                  {'★'.repeat(s)}
                </button>
              ))}
            </div>

            <select
              value={prog}
              onChange={(e) => setProg(e.target.value)}
              className="border border-border-light px-3 py-2 text-[11px] text-navy-dark"
            >
              {PROGRAMMES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((t) => (
              <div key={t.name} className="bg-white border border-border-light p-6 relative">
                <span className="absolute top-3 right-5 font-serif text-border-light select-none pointer-events-none" style={{ fontSize: 60, lineHeight: 1 }}>"</span>
                <div className="text-gold tracking-widest text-[14px]">
                  {'★'.repeat(t.stars)}<span className="text-border-light">{'★'.repeat(5 - t.stars)}</span>
                </div>
                <p className="font-serif italic text-[13px] text-navy mt-4" style={{ lineHeight: 1.65 }}>
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-[30px] h-[30px] bg-navy text-white font-serif font-bold flex items-center justify-center text-[13px]">{t.name[0]}</div>
                  <div>
                    <p className="font-sans font-semibold text-[11px] text-navy-dark">{t.name}</p>
                    <p className="font-sans text-[9.5px] text-ink-slate">{t.role} · {t.course}</p>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center body-text py-10">No testimonials match these filters yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-14">
        <div className="container-fe grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['4.8 / 5', 'Average Rating'],
            ['100%', 'Would Recommend'],
            ['800+', 'Sessions Completed'],
          ].map(([n, l]) => (
            <div key={l} className="bg-white border-t-[3px] border-t-navy-royal p-6 text-center">
              <div className="font-serif font-bold text-navy-royal" style={{ fontSize: 34 }}>{n}</div>
              <p className="text-[9px] uppercase tracking-wider text-ink-slate mt-2">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
