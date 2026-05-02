import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LogoInline } from './Logo.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/founders', label: 'Our Founders' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gold transition-colors duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur' : 'bg-navy'
      }`}
      style={{ height: 64 }}
    >
      <div className="container-fe h-full flex items-center justify-between">
        <Link to="/" aria-label="Fluent English — Home">
          <LogoInline markSize={36} wordmarkSize={20} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `font-sans text-[13px] tracking-nav uppercase font-medium text-white relative pb-1 ${
                  isActive ? 'after:absolute after:left-0 after:right-0 after:bottom-[-22px] after:h-[2px] after:bg-gold' : 'hover:text-gold-light'
                } transition-colors`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex bg-gold hover:bg-gold-mid text-white font-sans font-semibold text-[12px] px-5 py-[10px] transition-colors"
        >
          Book a Free Call
        </Link>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`h-[2px] bg-white transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] bg-white transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <div className="container-fe flex flex-col py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `py-3 font-sans text-[13px] tracking-nav uppercase font-medium ${
                    isActive ? 'text-gold-light' : 'text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-3 bg-gold text-white font-sans font-semibold text-[12px] px-5 py-3 text-center"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
