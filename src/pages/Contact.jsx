import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { COURSES } from '../data/courses.js';

const PROGRAMMES = [
  ...COURSES.map((c) => c.name),
  'Not sure yet',
];

const SESSION_TIMES = ['Morning', 'Afternoon', 'Evening', 'Flexible'];

// Default amount for the demo call deposit (₹) — adjust as needed.
// If a course is preselected via query param, its hourly price is used.
const DEFAULT_AMOUNT = 99;

export default function Contact() {
  const [params] = useSearchParams();
  const presetCourse = params.get('course');
  const presetAmount = Number(params.get('amount')) || DEFAULT_AMOUNT;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: presetCourse || '',
    challenge: '',
    time: '',
  });
  const [amount] = useState(presetAmount);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  useEffect(() => {
    if (presetCourse) setForm((f) => ({ ...f, course: presetCourse }));
  }, [presetCourse]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) return 'Please enter a valid phone number.';
    if (!form.course) return 'Please select a programme.';
    if (!form.challenge.trim()) return 'Please describe your communication challenge.';
    if (!form.time) return 'Please select a preferred session time.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: 'error', msg: err });
      return;
    }

    setStatus({ state: 'loading', msg: 'Creating secure payment order…' });

    try {
      const orderRes = await fetch('/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          amount,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Could not create payment order.');
      }

      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please refresh the page.');
      }

      const rzp = new window.Razorpay({
        key: orderData.key_id,
        amount: amount * 100,
        currency: 'INR',
        name: 'Fluent English',
        description: `${form.course} — Booking`,
        order_id: orderData.order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          course: form.course,
          challenge: form.challenge.slice(0, 200),
          preferred_time: form.time,
        },
        theme: { color: '#0B1426' },
        handler: async (resp) => {
          setStatus({ state: 'loading', msg: 'Verifying payment…' });
          try {
            const verifyRes = await fetch('/api/verifyPayment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
                name: form.name,
                email: form.email,
                phone: form.phone,
                course: form.course,
                amount,
                challenge: form.challenge,
                preferred_time: form.time,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setStatus({ state: 'success', msg: '' });
            } else {
              setStatus({ state: 'error', msg: verifyData.error || 'Payment could not be verified.' });
            }
          } catch (err) {
            setStatus({ state: 'error', msg: 'Network error during verification. Please contact us.' });
          }
        },
        modal: {
          ondismiss: () => setStatus({ state: 'idle', msg: '' }),
        },
      });
      rzp.on('payment.failed', (resp) =>
        setStatus({ state: 'error', msg: resp.error?.description || 'Payment failed.' })
      );
      rzp.open();
    } catch (err) {
      setStatus({ state: 'error', msg: err.message });
    }
  };

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Ready to build your"
        italicWord="Mind to Mouth connection?"
        sub="Enrolments open. Limited seats per cohort. Book your free demo call today."
      />

      <section className="bg-white py-16">
        <div className="container-fe grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column — contact info */}
          <div className="reveal">
            <p className="label-cap">Reach Us Directly</p>
            <div className="mt-6 space-y-6">
              {[
                ['Email', 'fluentedgeedu@gmail.com', 'mailto:fluentedgeedu@gmail.com'],
                ['Phone / WhatsApp', '+91 92107 83250\n+91 93106 33126', 'tel:+919210783250'],
                ['Instagram', '@fluentedge_edu', 'https://instagram.com/fluentedge_edu'],
                ['LinkedIn', 'Fluent English', '#'],
              ].map(([label, value, href]) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="mt-2 block w-[8px] h-[8px] bg-gold rotate-45 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] uppercase tracking-label text-gold-mid font-medium">{label}</p>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="block text-[12px] text-navy-dark hover:text-gold whitespace-pre-line"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 font-serif italic text-[14px] text-ink-slate max-w-md">
              "Reach out. We'll take it from there."
            </p>
          </div>

          {/* Right column — form */}
          <div className="bg-white border border-border-light p-6 md:p-10 reveal">
            {status.state === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex w-14 h-14 items-center justify-center bg-navy text-gold-light text-3xl">✓</div>
                <h3 className="font-serif font-bold text-navy text-[22px] mt-5">Thank you!</h3>
                <p className="body-text mt-3 max-w-sm mx-auto">
                  Payment confirmed. We've sent a confirmation email — our team will be in touch within 24 hours to schedule your session.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif font-bold text-[22px] text-navy">Book Your Free 45-Min Demo Call</h3>
                  <p className="text-[10px] text-ink-slate mt-1">A small ₹{amount} confirmation deposit secures your slot.</p>
                </div>

                <Field label="Full Name" name="name" value={form.name} onChange={onChange} />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} />

                <SelectField label="Which programme interests you?" name="course" value={form.course} onChange={onChange} options={PROGRAMMES} />

                <div>
                  <label className="block text-[9px] uppercase tracking-label text-gold-mid mb-2">What is your biggest communication challenge?</label>
                  <textarea
                    name="challenge"
                    rows={4}
                    value={form.challenge}
                    onChange={onChange}
                    className="w-full border border-border-light px-3 py-3 text-[12px] text-navy-dark"
                  />
                </div>

                <SelectField label="Preferred session time" name="time" value={form.time} onChange={onChange} options={SESSION_TIMES} />

                {status.state === 'error' && (
                  <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{status.msg}</p>
                )}

                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="w-full bg-gold hover:bg-gold-mid disabled:bg-gold/50 transition-colors text-white font-sans font-semibold text-[13px] py-4"
                >
                  {status.state === 'loading' ? status.msg || 'Processing…' : 'Book My Free Call'}
                </button>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-[10px] text-ink-slate">
                  {['No payment required for the call', '45 minutes, no pressure', 'Limited spots per cohort'].map((x) => (
                    <span key={x} className="inline-flex items-center gap-2">
                      <span className="block w-[6px] h-[6px] bg-gold rotate-45" />
                      {x}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="block text-[9px] uppercase tracking-label text-gold-mid mb-2">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-border-light px-3 py-3 text-[12px] text-navy-dark"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[9px] uppercase tracking-label text-gold-mid mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-border-light px-3 py-3 text-[12px] text-navy-dark bg-white"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
