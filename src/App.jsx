import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Courses from './pages/Courses.jsx';
import Founders from './pages/Founders.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Contact from './pages/Contact.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reveal = () => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in-view');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      const els = document.querySelectorAll('.reveal:not(.in-view)');
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in-view');
        } else {
          obs.observe(el);
        }
      });
      return obs;
    };
    const id = requestAnimationFrame(() => {
      window.__feObs = reveal();
    });
    return () => {
      cancelAnimationFrame(id);
      window.__feObs?.disconnect();
    };
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <ScrollReveal />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </div>
  );
}
