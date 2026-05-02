import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { GoldDiamondBullet } from '../components/Ornaments.jsx';

const VALUES = [
  ['Personalisation over process', 'No two students follow the same path. Your curriculum is written for you, updated each session.'],
  ['Confidence before correction', 'We build the environment first. You must feel safe to speak before you can speak well.'],
  ['Practice over theory', 'Every session is a live communication exercise. We don\'t lecture. We coach.'],
  ['Progress you can see', 'After every class, you have written proof of what changed. Growth at Fluent English is never invisible.'],
];

const DELIVERABLES = [
  'Daily progress report — improvements and gaps identified',
  'Personalised assessment sheet',
  'Detailed feedback from your coach',
  'Access to our premium community',
  'Daily vocabulary and grammar tips',
  'Specific action points for your next session',
];

export default function About() {
  return (
    <>
      <PageHero
        label="About Fluent English"
        title="We don't teach English."
        italicWord="We build the bridge."
        sub="Where language mastery meets professional performance."
      />

      <section className="bg-white py-20">
        <div className="container-fe reveal max-w-4xl">
          <div className="pull-quote">
            "The world is full of brilliant people who cannot communicate their brilliance. Fluent English is our answer to that."
          </div>
          <div className="mt-8 space-y-5">
            <p className="body-text">
              Fluent English was founded in 2026 by two English Honours graduates who saw a gap the education system wasn't filling. Not a gap in knowledge — but a gap in expression.
            </p>
            <p className="body-text">
              The platform was built on one idea: that communication is not a soft skill. It is the hard edge that separates professionals who are noticed from those who are overlooked. Every session at Fluent English is private, live, and built from scratch around the individual — their industry, their hesitation patterns, their specific goals.
            </p>
            <p className="body-text">
              We have conducted over 800 sessions across students, professionals, and leaders — and in every case, the transformation was the same. Not just better English. Better thinking. Better presence. Better outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-fe reveal">
          <p className="label-cap">Our Approach</p>
          <h2 className="section-title mt-3">Our values, in practice.</h2>
          <span className="gold-bar" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {VALUES.map(([t, d]) => (
              <div key={t} className="card-base card-top-navy">
                <h3 className="font-serif italic text-[18px] text-navy">{t}</h3>
                <p className="body-text mt-3">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-20">
        <div className="container-fe reveal">
          <p className="label-cap">After Every Session</p>
          <h2 className="section-title-light mt-3">
            What you walk away <span className="italic font-normal">with.</span>
          </h2>
          <span className="block w-8 h-[2px] bg-gold mt-3 mb-8" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[12px] text-white/75">
                <span className="mt-[7px] block w-[6px] h-[6px] bg-gold rotate-45 flex-shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-dark text-white py-12">
        <div className="container-fe grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[['5', 'Specialist Programmes'], ['60', 'Minutes Per Session'], ['1:1', 'Private Coaching'], ['800+', 'Sessions Conducted']].map(([n, l]) => (
            <div key={l} className="bg-navy-dark px-6 py-6 text-center">
              <div className="font-serif font-bold text-gold-light" style={{ fontSize: 28 }}>{n}</div>
              <div className="mt-1 text-[9px] uppercase tracking-wider text-white/40">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 text-center">
        <div className="container-fe reveal">
          <Link to="/contact" className="inline-flex bg-gold hover:bg-gold-mid text-navy font-sans font-semibold text-[13px] px-7 py-4 transition-colors">
            Book My Free Call
          </Link>
        </div>
      </section>
    </>
  );
}
