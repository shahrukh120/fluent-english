import PageHero from '../components/PageHero.jsx';

const FOUNDERS = [
  {
    name: 'Bisma Fareed',
    role: 'Founder · Fluent English',
    image: '/founders/bisma.png',
    instagram: 'https://instagram.com/heyy_bisma',
    instagramHandle: '@heyy_bisma',
    linkedin: 'https://www.linkedin.com/in/bisma-fareed-1a522b291',
    tags: ['Elite Communication Coach', 'Public Speaker', 'Debator', 'LinkedIn Writer 9K+'],
    bio: 'An English Honours student at Hansraj College, Bisma is an elite communication coach, a polished public speaker, and a seasoned debator. She has conducted 500+ English speaking sessions across multiple platforms, developing a reputation for transforming hesitant speakers into confident communicators. As a LinkedIn writer with over 9,000 followers, her content on language, confidence, and professional communication reaches thousands daily. Bisma founded Fluent English with a single conviction: that every brilliant mind deserves to be heard clearly.',
  },
  {
    name: 'Sunan Fareed',
    role: 'Co-Founder · Fluent English',
    image: '/founders/sunan.png',
    instagram: 'https://instagram.com/fynsunan',
    instagramHandle: '@fynsunan',
    linkedin: 'https://www.linkedin.com/in/sunan-farid-b46a17375',
    tags: ['Certified Mentor', 'Communication Coach', 'Public Speaker', 'Social Media Strategist'],
    bio: 'A convent-educated student pursuing English Honours, Sunan is a certified mentor and communication coach with 300+ sessions under her belt. Known for her structured teaching style and warm coaching presence, she has mentored students as a freelancer while simultaneously building Fluent English\'s brand from the ground up. She is the creative and strategic mind behind our marketing and social media — and the reason Fluent English speaks with one clear, compelling voice.',
  },
];

export default function Founders() {
  return (
    <>
      <PageHero
        label="The People Behind Fluent English"
        title="Meet Our"
        italicWord="Founders"
        sub="English Honours graduates · Communication coaches · Builders of the Mind to Mouth method"
      />

      <section className="bg-white py-16">
        <div className="container-fe grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUNDERS.map((f) => (
            <article key={f.name} className="border border-border-light reveal">
              <div className="relative h-[320px] bg-navy overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center top' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,20,38,0.7) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-5 left-5">
                  <p className="font-serif font-bold text-[26px] text-white leading-tight">{f.name}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gold-mid mt-1">{f.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span key={t} className="bg-offwhite border border-border-light text-[8.5px] uppercase tracking-wide text-navy-dark px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[9px] uppercase tracking-wider text-ink-slate font-semibold mt-6 pb-2 border-b border-border-light">About</p>
                <p className="text-[11px] text-ink-slate mt-3" style={{ lineHeight: 1.72 }}>
                  {f.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <a href={f.linkedin} target="_blank" rel="noreferrer" className="border border-border-light text-[9px] uppercase tracking-wider px-3 py-2 hover:border-gold transition-colors">LinkedIn</a>
                  <a href={f.instagram} target="_blank" rel="noreferrer" className="border border-border-light text-[9px] uppercase tracking-wider px-3 py-2 hover:border-gold transition-colors">Instagram</a>
                  <span className="text-[10px] text-ink-slate">{f.instagramHandle}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="container-fe text-center reveal">
          <p className="font-serif italic text-[20px] text-white/85 max-w-3xl mx-auto leading-relaxed">
            "We are English graduates who noticed something: the world is full of brilliant people who cannot communicate their brilliance.{' '}
            <strong className="not-italic font-semibold text-gold-light">Fluent English is our answer to that.</strong>"
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-16">
        <div className="container-fe reveal">
          <p className="label-cap">Our Credentials & Approach</p>
          <h2 className="section-title mt-3">Built on academic rigour. Refined in the room.</h2>
          <span className="gold-bar" />

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mt-8">
            {[
              'English Honours academic background',
              'Structured, pedagogy-driven teaching',
              'Elite communication & public speaking expertise',
              'Context-aware professional coaching',
              'Feedback-first approach every session',
              'Comfortable, confidence-building environment',
            ].map((c) => (
              <li key={c} className="flex items-start gap-3 text-[11px] text-ink-slate" style={{ lineHeight: 1.75 }}>
                <span className="mt-[7px] block w-[6px] h-[6px] bg-gold rotate-45 flex-shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
