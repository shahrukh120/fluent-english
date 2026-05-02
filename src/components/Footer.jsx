import { Link } from 'react-router-dom';
import { LogoInline } from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div
        className="h-1"
        style={{
          background: 'linear-gradient(to right, #B8922A, #F0CC78, #B8922A)',
        }}
      />
      <div className="container-fe py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" aria-label="Fluent English — Home">
            <LogoInline markSize={44} wordmarkSize={20} />
          </Link>
          <p className="mt-3 font-serif italic text-[13px] text-white/45">
            Building That Mind to Mouth Connection
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://instagram.com/fluentedge_edu"
              target="_blank"
              rel="noreferrer"
              className="border border-white/15 px-3 py-2 text-[9px] uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/fluentedgeenglish/"
              target="_blank"
              rel="noreferrer"
              className="border border-white/15 px-3 py-2 text-[9px] uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <p className="text-[8.5px] uppercase tracking-label text-gold-mid mb-4">Quick Links</p>
          <ul className="space-y-2">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Courses', '/courses'],
              ['Our Founders', '/founders'],
              ['Testimonials', '/testimonials'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-[11px] text-white/55 hover:text-gold-light transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[8.5px] uppercase tracking-label text-gold-mid mb-4">Contact Us</p>
          <ul className="space-y-2 text-[11px] text-white/65">
            <li>
              <a href="mailto:contact.fluentenglishedu@gmail.com" className="hover:text-gold-light">
                contact.fluentenglishedu@gmail.com
              </a>
            </li>
            <li>+91 92107 83250</li>
            <li>+91 93106 33126</li>
            <li>
              <a href="https://instagram.com/fluentedge_edu" target="_blank" rel="noreferrer" className="hover:text-gold-light">
                @fluentedge_edu
              </a>
            </li>
            <li>Fluent English (LinkedIn)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-fe py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/20">Fluent English © 2026. All rights reserved.</p>
          <p className="font-serif italic text-[10px] text-white/20">
            Building That Mind to Mouth Connection
          </p>
        </div>
      </div>
    </footer>
  );
}
