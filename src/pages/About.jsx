import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

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

const FEATURES = [
  ['Customised Curriculum', 'Designed around your specific goals, profession, and current communication level. No two students follow the same path.'],
  ['Live, Interactive Sessions', 'All coaching happens in real-time. Each 60-minute session is a focused, interactive practice environment — not a lecture.'],
  ['Flexible Scheduling', 'Sessions are scheduled around your calendar. Morning, evening, weekdays, weekends — your coach works with your availability.'],
  ['Measurable Progress', 'After every session, you receive a detailed progress report, feedback sheet, and improvement action points.'],
];

const PILLS = [
  'Interactive Live Sessions',
  'Practical Speaking Exercises',
  'Personalised Feedback',
  'Real-Life Communication',
  'Confidence-First Environment',
];

const OBJECTIVES = [
  ['Build Confidence', 'Help every student overcome hesitation, eliminate self-doubt, and speak English with natural confidence in any situation — social, academic, or professional.'],
  ['Develop Clarity', 'Train students to organise their thoughts before they speak — so their words are precise, structured, and impactful, not vague or rambling.'],
  ['Real-World Readiness', 'Prepare students for the exact environments they will face — boardrooms, interviews, presentations, client calls, and everyday professional interactions.'],
  ['Personalised Growth', 'Deliver coaching entirely tailored to the individual — their industry, their level, their specific weaknesses — not a one-size-fits-all programme.'],
  ['Professional Excellence', 'Elevate professional communication — email writing, presentation delivery, corporate vocabulary, and workplace etiquette — for career advancement.'],
  ['Lasting Transformation', 'Ensure changes in communication are permanent — a rewiring of how students think and express themselves in English, for life.'],
];

const AUDIENCES = [
  'Chartered Accountants',
  'Finance Professionals',
  'MBA Students',
  'Lawyers & Consultants',
  'Founders & Entrepreneurs',
  'Corporate Professionals',
  'Interview Aspirants',
  'Tech Professionals',
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

      {/* Our Story */}
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

      {/* Company Overview — Precision coaching for people who mean BUSINESS */}
      <section className="bg-offwhite py-20">
        <div className="container-fe reveal">
          <p className="label-cap">Who We Are</p>
          <h2 className="section-title mt-3">
            Precision coaching for people who mean <span className="text-gold">BUSINESS.</span>
          </h2>
          <span className="gold-bar" />

          <div className="mt-8 max-w-4xl space-y-4">
            <p className="body-text">
              Fluent English is an elite English communication coaching platform offering fully personalised, one-on-one live sessions. We exist at the intersection of language mastery and professional performance — combining structured pedagogy with real-world application so our students don't just speak better, they <em>think</em> better on their feet.
            </p>
            <p className="body-text">
              Every session is <strong>customised, flexible</strong>, and built around you — your vocabulary gaps, your hesitation patterns, your industry, your goals. There are no batch classes, no pre-recorded lectures, no generic curriculum.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map(([t, d]) => (
              <div key={t} className="bg-white border border-border-light p-5 border-l-[3px] border-l-navy-royal">
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-navy-royal">{t}</p>
                <p className="body-text mt-2">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy text-white px-5 py-5 flex flex-wrap items-center justify-around gap-x-6 gap-y-3 text-center">
            {PILLS.map((p) => (
              <span key={p} className="inline-flex flex-col items-center text-[11px] text-white">
                <span className="block w-[6px] h-[6px] bg-gold rotate-45 mb-2" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Objectives */}
      <section className="bg-white py-20">
        <div className="container-fe reveal">
          <p className="label-cap">What We Set Out To Do</p>
          <h2 className="section-title mt-3">
            Our Mission & <span className="text-gold">Objectives</span>
          </h2>
          <span className="gold-bar" />

          <div className="pull-quote mt-8 max-w-4xl">
            Our purpose is singular — to eliminate the gap between your knowledge and your ability to express it. Communication is the hard edge that separates professionals who are noticed from those who are overlooked.
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {OBJECTIVES.map(([t, d], i) => (
              <div key={t} className="bg-offwhite border-t-[3px] border-t-navy-royal p-6 relative">
                <span className="block font-serif font-bold text-border-light leading-none" style={{ fontSize: 42 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans font-semibold text-[11px] uppercase tracking-wider text-navy-royal mt-3">{t}</p>
                <p className="body-text mt-3">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
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

      {/* Who Our Students Are */}
      <section className="bg-white py-16">
        <div className="container-fe reveal">
          <p className="label-cap">Who Our Students Are</p>
          <h2 className="section-title mt-3">
            Universal student <span className="italic font-normal">outreach.</span>
          </h2>
          <span className="gold-bar" />

          <div className="mt-8 flex flex-wrap gap-3">
            {AUDIENCES.map((a) => (
              <span
                key={a}
                className="bg-offwhite border border-border-light text-navy-dark text-[11px] px-4 py-2"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* After Every Session — deliverables */}
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

      {/* Teaching Promise + Results Promise */}
      <section className="bg-navy-dark text-white py-16 border-t border-white/10">
        <div className="container-fe grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
          <div className="border-l-[3px] border-l-gold pl-6">
            <p className="text-[10px] uppercase tracking-label text-gold-mid font-medium">Our Teaching Promise</p>
            <p className="text-[13px] text-white/85 mt-3 leading-relaxed">
              We work on your specific hesitation patterns, vocabulary gaps, and professional context. Your coach knows your name, your goals, and your progress — every single session.
            </p>
          </div>
          <div className="border-l-[3px] border-l-gold pl-6">
            <p className="text-[10px] uppercase tracking-label text-gold-mid font-medium">Our Results Promise</p>
            <p className="text-[13px] text-white/85 mt-3 leading-relaxed">
              After every session, you will have a written record of where you improved and exactly what to work on next. Progress is never invisible at Fluent English.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* CTA */}
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
