import { Link } from 'react-router-dom';
import { CornerBracket, DiamondOrnament, TripleDiamondDivider, GoldDiamondBullet } from '../components/Ornaments.jsx';
import { LogoStacked } from '../components/Logo.jsx';
import { COURSES } from '../data/courses.js';
import { TESTIMONIALS, FEATURED_TESTIMONIAL } from '../data/testimonials.js';

const STATS = [
  ['5', 'Specialist Programmes'],
  ['60', 'Minutes Per Session'],
  ['1:1', 'Private Coaching'],
  ['800+', 'Sessions Conducted'],
];

function Hero() {
  return (
    <section className="relative bg-navy text-white min-h-screen pt-16 overflow-hidden flex flex-col">
      <CornerBracket position="tl" />
      <CornerBracket position="br" />
      {/* Diagonal gold line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top right, transparent 0%, transparent 49.7%, rgba(184,146,42,0.07) 49.8%, rgba(184,146,42,0.07) 50.2%, transparent 50.3%)',
        }}
        aria-hidden
      />
      {/* Right vertical panel */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-white/[0.015] pointer-events-none" aria-hidden />
      {/* Dot grid 3x2 top-right */}
      <div className="absolute top-28 right-12 grid grid-cols-3 gap-3 pointer-events-none" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="block w-[3px] h-[3px] bg-gold/15 rounded-full" />
        ))}
      </div>
      {/* FE watermark */}
      <span
        className="absolute bottom-4 right-6 font-serif font-bold pointer-events-none select-none"
        style={{ fontSize: 240, lineHeight: 1, color: 'rgba(255,255,255,0.025)' }}
        aria-hidden
      >
        FE
      </span>

      <div className="container-fe flex-1 flex flex-col justify-center items-center text-center relative z-10 py-20">
        <p className="label-cap fade-in" style={{ animationDelay: '0.05s' }}>
          Elite English Communication Coaching
        </p>

        <div className="mt-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <LogoStacked markSize={220} />
        </div>

        <p
          className="mt-8 font-serif italic text-white/70 fade-in-up"
          style={{ fontSize: 22, letterSpacing: '0.02em', animationDelay: '0.4s' }}
        >
          Building That Mind to Mouth Connection
        </p>

        <p
          className="mt-6 font-sans text-[12px] text-white/45 fade-in-up max-w-2xl"
          style={{ lineHeight: 2, letterSpacing: '0.04em', animationDelay: '0.5s' }}
        >
          Personalised · Live · One-on-One · 60-Minute Sessions For Professionals & Ambitious Learners
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link to="/contact" className="btn-gold">
            Book a Free Demo Call
          </Link>
          <Link to="/courses" className="btn-ghost">
            Explore Our Programmes
          </Link>
        </div>
      </div>

      {/* Stat bar */}
      <div
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.06] slide-up"
        style={{ background: 'rgba(11,20,38,0.6)', gap: '1px' }}
      >
        {STATS.map(([n, label]) => (
          <div key={label} className="px-6 py-6 text-center bg-navy">
            <div className="font-serif font-bold text-gold-light" style={{ fontSize: 28 }}>{n}</div>
            <div className="mt-1 text-[9px] uppercase tracking-wider text-white/40 font-sans">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  const cards = [
    { title: 'You blank out', text: 'You know exactly what you want to say — until it\'s time to say it. The words disappear the moment all eyes are on you.' },
    { title: 'You trail off', text: 'You start strong but lose the thread midway. Your sentences fade, your point gets lost, and confidence follows.' },
    { title: 'You hesitate', text: 'Every conversation feels like a test. You rehearse what you\'ll say, then say something else entirely — or say nothing at all.' },
  ];
  return (
    <section className="bg-white py-20">
      <div className="container-fe reveal">
        <p className="label-cap">Why Fluent English Exists</p>
        <h2 className="section-title mt-3">
          You have the knowledge. <span className="italic font-normal">The words just won't come.</span>
        </h2>
        <span className="gold-bar" />
        <p className="body-text max-w-3xl">
          Most people who struggle to communicate aren't lacking intelligence — they're lacking the bridge between thought and speech. Fluent English was built for exactly that gap. We don't run batch classes or hand you a generic syllabus. We sit with you, one-on-one, and rebuild the way you think, organise, and deliver your words — in every setting that matters.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="card-base card-top-navy">
              <p className="label-cap">The Problem</p>
              <h3 className="font-serif font-bold text-[20px] text-navy mt-2">{c.title}</h3>
              <p className="body-text mt-3">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="pull-quote mt-10 max-w-4xl">
          <em>"We don't teach English. We build the bridge between </em><strong className="not-italic font-semibold">how you think</strong><em> and </em><strong className="not-italic font-semibold">how the world hears you</strong><em>."</em>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['Demo Call (Free)', 'We spend 45 minutes understanding your communication challenges, goals, and industry. No sales pressure — just clarity.'],
    ['Custom Programme Design', 'Your coach designs a session plan built entirely around your specific gaps. Every session has a purpose.'],
    ['Live 1-on-1 Sessions', '60-minute private sessions at your chosen time. Interactive, practical, and intensely focused on you.'],
    ['Daily Progress Reports', 'After every session, you receive a written report — what improved, what to work on, and your next steps.'],
  ];
  return (
    <section className="bg-offwhite py-20">
      <div className="container-fe reveal">
        <p className="label-cap">How It Works</p>
        <h2 className="section-title mt-3">
          From first session <span className="italic font-normal">to lasting change.</span>
        </h2>
        <span className="gold-bar" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map(([title, text], i) => (
            <div key={title} className="relative bg-white border border-border-light p-6 overflow-hidden">
              <span
                className="absolute top-2 right-3 font-serif font-bold text-border-light pointer-events-none select-none"
                style={{ fontSize: 42 }}
              >
                0{i + 1}
              </span>
              <div className="mb-3"><DiamondOrnament size={24} /></div>
              <p className="text-[11px] uppercase font-sans font-semibold text-navy-royal tracking-wider">{title}</p>
              <p className="body-text mt-3">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammesOverview() {
  return (
    <section className="bg-navy py-20 text-white">
      <div className="container-fe reveal">
        <p className="label-cap">Our Programmes</p>
        <h2 className="section-title-light mt-3">
          Five courses. One <span className="italic font-normal">destination.</span>
        </h2>
        <p className="text-[11px] text-white/45 mt-2">Every programme is private, live, and built entirely around you.</p>

        <div className="mt-10 flex md:grid md:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0">
          {COURSES.map((c) => (
            <Link
              key={c.id}
              to="/courses"
              className="group min-w-[260px] md:min-w-0 p-5 border-t-[3px] border-t-gold transition-transform duration-300 hover:-translate-y-1"
              style={{ background: `linear-gradient(180deg, ${c.bg} 0%, #0A1832 100%)` }}
            >
              <p className="text-[8.5px] uppercase tracking-wider text-gold-mid font-sans">{c.tier}</p>
              <h3 className="font-serif font-bold text-[20px] mt-2 text-white">{c.name}</h3>
              <p className="font-serif font-bold text-[28px] mt-3 text-white">{c.priceLabel}</p>
              <p className="text-[11px] text-white/55 mt-0.5">{c.priceUsdLabel}</p>
              <p className="text-[11px] text-white/65 mt-3 leading-relaxed">{c.hook}</p>
              <span className="block mt-5 text-[11px] text-gold-light group-hover:text-gold transition-colors">Learn More →</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[14px] text-white/85 font-serif italic">Not sure which programme is right for you?</p>
          <Link to="/contact" className="btn-gold !text-navy">
            <span className="text-navy">Book a Free Demo Call</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyFluentEnglish() {
  const rows = [
    ['Session format', 'Private 1-on-1', 'Group batches'],
    ['Curriculum', 'Built for you', 'Generic syllabus'],
    ['Scheduling', 'Your time, flexible', 'Fixed slots'],
    ['Progress tracking', 'Daily reports', 'None or monthly'],
    ['Industry-specific prep', 'Yes', 'No'],
    ['Coach attention', '100% on you', 'Split across batch'],
    ['Post-session feedback', 'Written, detailed', 'Generic'],
    ['Speed of improvement', 'Fast — 4-6 weeks', 'Slow — months'],
  ];
  return (
    <section className="bg-white py-20">
      <div className="container-fe reveal">
        <p className="label-cap">The Fluent English Edge</p>
        <h2 className="section-title mt-3">
          Why private coaching <span className="italic font-normal">outperforms</span> everything else.
        </h2>
        <span className="gold-bar" />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border-light">
                <th className="py-3 pr-6 font-sans text-[11px] text-navy-dark font-medium">Feature</th>
                <th className="py-3 px-4 font-sans text-[11px] font-semibold text-navy-royal" style={{ borderBottom: '2px solid #B8922A' }}>Fluent English</th>
                <th className="py-3 px-4 font-sans text-[11px] text-ink-muted" style={{ borderBottom: '2px solid #E4E9F5' }}>Generic Group Classes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-border-light">
                  <td className="py-3 pr-6 text-[11px] text-navy-dark">{r[0]}</td>
                  <td className="py-3 px-4 text-[11px] text-navy-royal font-medium">{r[1]}</td>
                  <td className="py-3 px-4 text-[11px] text-ink-muted">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['3×', 'Faster Progress', '1-on-1 coaching produces significantly faster results.'],
            ['100%', 'Your Session', 'Every minute is focused entirely on you.'],
            ['800+', 'Sessions Delivered', 'Hundreds of students across industries.'],
          ].map(([n, l, t]) => (
            <div key={l} className="bg-offwhite border-t-[3px] border-t-navy-royal p-6">
              <div className="font-serif font-bold text-navy-royal" style={{ fontSize: 34 }}>{n}</div>
              <p className="text-[11px] uppercase tracking-wider text-navy-royal font-medium mt-1">{l}</p>
              <p className="body-text mt-3">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniTestimonials() {
  const t = TESTIMONIALS.slice(0, 2);
  return (
    <section className="bg-offwhite py-20">
      <div className="container-fe reveal">
        <p className="label-cap">What Our Students Say</p>
        <h2 className="section-title mt-3">
          Words from those who found <span className="italic font-normal">their edge.</span>
        </h2>
        <span className="gold-bar" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.map((q) => (
            <div key={q.name} className="bg-white border border-border-light p-6 relative">
              <span className="absolute top-3 right-5 font-serif text-border-light select-none pointer-events-none" style={{ fontSize: 60, lineHeight: 1 }}>"</span>
              <div className="text-gold text-[14px] tracking-widest">
                {'★'.repeat(q.stars)}<span className="text-border-light">{'★'.repeat(5 - q.stars)}</span>
              </div>
              <p className="font-serif italic text-[13px] text-navy mt-4 leading-[1.65]">"{q.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-[30px] h-[30px] bg-navy text-white font-serif font-bold flex items-center justify-center text-[13px]">{q.name[0]}</div>
                <div>
                  <p className="font-sans font-semibold text-[11px] text-navy-dark">{q.name}</p>
                  <p className="font-sans text-[9.5px] text-ink-slate">{q.role} · {q.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/testimonials" className="text-[12px] font-serif italic text-gold hover:text-gold-mid">
            Read All Reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FoundersTeaser() {
  return (
    <section className="bg-navy text-white py-20">
      <div className="container-fe reveal">
        <h2 className="section-title-light text-center">
          Coached by the best. <span className="italic font-normal">Built for you.</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { name: 'Bisma Fareed', role: 'Founder & Lead Coach', cred: 'English Honours · Hansraj College · 500+ sessions', image: '/founders/bisma.png', pos: '50% 35%' },
            { name: 'Sunan Fareed', role: 'Co-Founder & Coach', cred: 'English Honours · Certified Mentor · 300+ sessions', image: '/founders/sunan.png', pos: '70% 35%' },
          ].map((f) => (
            <div key={f.name} className="border border-white/10 p-6 flex items-center gap-5">
              <img
                src={f.image}
                alt={f.name}
                className="w-[100px] h-[100px] flex-shrink-0 object-cover"
                style={{ clipPath: 'circle(50% at 50% 50%)', objectPosition: f.pos }}
                loading="lazy"
              />
              <div>
                <p className="font-serif font-bold text-[18px] text-white">{f.name}</p>
                <p className="text-[9.5px] uppercase tracking-wider text-gold-mid mt-1">{f.role}</p>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">{f.cred}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/founders" className="text-gold-light hover:text-gold text-[13px] font-serif italic">
            Meet Our Founders →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-navy text-white py-20 border-t border-white/5">
      <div className="container-fe text-center reveal">
        <h2 className="section-title-light">
          Ready to build your <span className="italic font-normal">Mind to Mouth</span> connection?
        </h2>
        <p className="text-[11px] text-white/45 mt-4 max-w-xl mx-auto">
          Enrolments open. Limited seats per cohort. Book your free 45-minute demo call today.
        </p>
        <Link to="/contact" className="inline-flex mt-8 bg-gold hover:bg-gold-mid text-navy font-sans font-semibold text-[13px] px-7 py-4 transition-colors">
          Book My Free Call
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <ProgrammesOverview />
      <WhyFluentEnglish />
      <MiniTestimonials />
      <FoundersTeaser />
      <FinalCTA />
    </>
  );
}
