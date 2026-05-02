import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { COURSES } from '../data/courses.js';

const PROFILES = ['Student', 'Working Professional', 'Other'];
const ENGLISH_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Specialist'];

const parseFee = (label) => Number(String(label).replace(/[^\d]/g, '')) || 0;

export default function Contact() {
  const [params] = useSearchParams();
  const presetCourse = params.get('course');
  const presetMode = params.get('mode');

  const [mode, setMode] = useState(presetMode === 'enroll' || presetCourse ? 'enroll' : 'demo');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Ready to build your"
        italicWord="Mind to Mouth connection?"
        sub="Book a free demo session — or enrol directly in a programme."
      />

      <section className="bg-white py-16">
        <div className="container-fe grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div className="reveal">
            <p className="label-cap">Reach Us Directly</p>
            <div className="mt-6 space-y-6">
              <ContactItem label="Email" value="contact.fluentenglishedu@gmail.com" href="mailto:contact.fluentenglishedu@gmail.com" />
              <ContactItem label="Instagram" value="@fluentedge_edu" href="https://instagram.com/fluentedge_edu" />
              <ContactItem label="LinkedIn" value="Fluent English" href="https://www.linkedin.com/company/fluentedgeenglish/" />
            </div>
            <p className="mt-10 font-serif italic text-[14px] text-ink-slate max-w-md">
              "Reach out. We'll take it from there."
            </p>
          </div>

          <div className="bg-white border border-border-light p-6 md:p-10 reveal">
            {status.state === 'success' ? (
              <SuccessPanel mode={mode} reset={() => setStatus({ state: 'idle', msg: '' })} />
            ) : (
              <>
                <div className="grid grid-cols-2 border border-border-light mb-8">
                  {[['demo', 'Free Demo Session'], ['enroll', 'Enrol in a Programme']].map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => { setMode(k); setStatus({ state: 'idle', msg: '' }); }}
                      className={`py-3 px-4 text-[11px] uppercase tracking-wider font-medium transition-colors ${
                        mode === k ? 'bg-navy text-white' : 'bg-white text-navy-dark hover:bg-offwhite'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {mode === 'demo'
                  ? <DemoForm status={status} setStatus={setStatus} />
                  : <EnrollForm status={status} setStatus={setStatus} presetCourse={presetCourse} />
                }
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ label, value, href }) {
  return (
    <div className="flex items-start gap-4">
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
  );
}

function SuccessPanel({ mode, reset }) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex w-14 h-14 items-center justify-center bg-navy text-gold-light text-3xl">✓</div>
      <h3 className="font-serif font-bold text-navy text-[22px] mt-5">Thank you!</h3>
      <p className="body-text mt-3 max-w-sm mx-auto">
        {mode === 'demo'
          ? "Your free demo request is in. Our team will email you within 24 hours to confirm the session."
          : "Payment confirmed. We've sent a confirmation email — our team will be in touch within 24 hours to schedule your first session."}
      </p>
      <button onClick={reset} className="mt-6 text-[11px] uppercase tracking-wider text-gold hover:text-gold-mid">
        Submit another request
      </button>
    </div>
  );
}

/* ─── DEMO FORM (no payment) ─────────────────────────────── */
function DemoForm({ status, setStatus }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', datetime: '', issues: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) return 'Please enter a valid phone number.';
    if (!form.datetime) return 'Please pick a preferred date and time.';
    if (!form.issues.trim()) return 'Please describe your communication challenge.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ state: 'error', msg: err });
    setStatus({ state: 'loading', msg: 'Sending your demo request…' });
    try {
      const res = await fetch('/api/submitDemo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) setStatus({ state: 'success', msg: '' });
      else setStatus({ state: 'error', msg: data.error || 'Could not submit. Please try again.' });
    } catch {
      setStatus({ state: 'error', msg: 'Network error. Please try again.' });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <h3 className="font-serif font-bold text-[22px] text-navy">Book Your Free Demo Session</h3>
        <p className="text-[10px] text-ink-slate mt-1">A 45-minute one-on-one session — no payment required.</p>
      </div>

      <Field label="Full Name" name="name" value={form.name} onChange={onChange} />
      <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
      <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
      <Field label="Preferred Date & Time" name="datetime" type="datetime-local" value={form.datetime} onChange={onChange} />

      <div>
        <label className="block text-[9px] uppercase tracking-label text-gold-mid mb-2">
          What challenges do you face in English communication?
        </label>
        <textarea
          name="issues"
          rows={4}
          value={form.issues}
          onChange={onChange}
          className="w-full border border-border-light px-3 py-3 text-[12px] text-navy-dark"
        />
      </div>

      {status.state === 'error' && (
        <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{status.msg}</p>
      )}

      <button
        type="submit"
        disabled={status.state === 'loading'}
        className="w-full bg-gold hover:bg-gold-mid disabled:bg-gold/50 transition-colors text-white font-sans font-semibold text-[13px] py-4"
      >
        {status.state === 'loading' ? status.msg || 'Submitting…' : 'Request Free Demo'}
      </button>

      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-[10px] text-ink-slate">
        {['No payment required', '45 minutes, no pressure', 'Limited spots per cohort'].map((x) => (
          <span key={x} className="inline-flex items-center gap-2">
            <span className="block w-[6px] h-[6px] bg-gold rotate-45" />
            {x}
          </span>
        ))}
      </div>
    </form>
  );
}

/* ─── ENROLL FORM (with Razorpay) ────────────────────────── */
function EnrollForm({ status, setStatus, presetCourse }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    country: '', state: '',
    profile: '', profession: '',
    college: '', course_field: '', year: '',
    englishLevel: '',
    programme: presetCourse || '',
    duration: '',
  });

  useEffect(() => {
    if (presetCourse) setForm((f) => ({ ...f, programme: presetCourse }));
  }, [presetCourse]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === 'programme' ? { duration: '' } : {}),
    }));
  };

  const selectedCourse = useMemo(
    () => COURSES.find((c) => c.name === form.programme),
    [form.programme]
  );

  const amount = useMemo(() => {
    if (!selectedCourse || !form.duration) return 0;
    const fee = selectedCourse.fees.find(([d]) => d === form.duration);
    return fee ? parseFee(fee[1]) : 0;
  }, [selectedCourse, form.duration]);

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) return 'Please enter a valid phone number.';
    if (!form.country.trim()) return 'Please enter your country.';
    if (!form.state.trim()) return 'Please enter your state.';
    if (!form.profile) return 'Please select your profile.';
    if (form.profile === 'Working Professional' && !form.profession.trim()) return 'Please enter your profession.';
    if (form.profile === 'Student') {
      if (!form.college.trim()) return 'Please enter your college name.';
      if (!form.course_field.trim()) return 'Please enter your course of study.';
      if (!form.year.trim()) return 'Please enter your year.';
    }
    if (!form.englishLevel) return 'Please select your level of English.';
    if (!form.programme) return 'Please choose a programme.';
    if (!form.duration) return 'Please choose a duration.';
    if (amount < 1) return 'Could not determine the fee for this selection.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ state: 'error', msg: err });
    setStatus({ state: 'loading', msg: 'Creating secure payment order…' });

    try {
      const orderRes = await fetch('/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: `${form.programme} (${form.duration})`,
          amount,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) throw new Error(orderData.error || 'Could not create order.');

      if (typeof window.Razorpay === 'undefined') throw new Error('Razorpay SDK failed to load. Please refresh.');

      const rzp = new window.Razorpay({
        key: orderData.key_id,
        amount: amount * 100,
        currency: 'INR',
        name: 'Fluent English',
        description: `${form.programme} — ${form.duration}`,
        order_id: orderData.order_id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
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
                course: `${form.programme} (${form.duration})`,
                amount,
                country: form.country,
                state: form.state,
                profile: form.profile,
                profession: form.profession,
                college: form.college,
                course_field: form.course_field,
                year: form.year,
                englishLevel: form.englishLevel,
                programme: form.programme,
                duration: form.duration,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) setStatus({ state: 'success', msg: '' });
            else setStatus({ state: 'error', msg: verifyData.error || 'Payment could not be verified.' });
          } catch {
            setStatus({ state: 'error', msg: 'Network error during verification. Please contact us.' });
          }
        },
        modal: { ondismiss: () => setStatus({ state: 'idle', msg: '' }) },
      });
      rzp.on('payment.failed', (resp) =>
        setStatus({ state: 'error', msg: resp.error?.description || 'Payment failed.' })
      );
      rzp.open();
    } catch (err) {
      setStatus({ state: 'error', msg: err.message });
    }
  };

  const durationOptions = selectedCourse
    ? selectedCourse.fees.map(([d, p]) => ({ label: `${d} — ${p}`, value: d }))
    : [];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <h3 className="font-serif font-bold text-[22px] text-navy">Enrol in a Programme</h3>
        <p className="text-[10px] text-ink-slate mt-1">Tell us about you — we'll build your programme around it.</p>
      </div>

      <Field label="Full Name" name="name" value={form.name} onChange={onChange} />
      <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} />
      <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Country" name="country" value={form.country} onChange={onChange} />
        <Field label="State" name="state" value={form.state} onChange={onChange} />
      </div>

      <SelectField label="Your Profile" name="profile" value={form.profile} onChange={onChange}
        options={PROFILES.map((p) => ({ label: p, value: p }))} />

      {form.profile === 'Working Professional' && (
        <Field label="Your Profession" name="profession" value={form.profession} onChange={onChange} />
      )}

      {form.profile === 'Student' && (
        <div className="space-y-5 border-l-[3px] border-l-gold pl-5">
          <Field label="College Name" name="college" value={form.college} onChange={onChange} />
          <Field label="Course of Study" name="course_field" value={form.course_field} onChange={onChange} />
          <Field label="Year (e.g. 1st, 2nd, Final)" name="year" value={form.year} onChange={onChange} />
        </div>
      )}

      <SelectField label="Level of English" name="englishLevel" value={form.englishLevel} onChange={onChange}
        options={ENGLISH_LEVELS.map((l) => ({ label: l, value: l }))} />

      <SelectField label="Programme" name="programme" value={form.programme} onChange={onChange}
        options={COURSES.map((c) => ({ label: c.name, value: c.name }))} />

      {selectedCourse && (
        <SelectField label="Duration" name="duration" value={form.duration} onChange={onChange}
          options={durationOptions} />
      )}

      {amount > 0 && (
        <div className="bg-offwhite border-l-[3px] border-l-navy-royal p-4 flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-wider text-ink-slate">Total Amount</span>
          <span className="font-serif font-bold text-navy-royal text-[22px]">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>
      )}

      {status.state === 'error' && (
        <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{status.msg}</p>
      )}

      <button
        type="submit"
        disabled={status.state === 'loading'}
        className="w-full bg-gold hover:bg-gold-mid disabled:bg-gold/50 transition-colors text-white font-sans font-semibold text-[13px] py-4"
      >
        {status.state === 'loading' ? status.msg || 'Processing…' : 'Proceed to Secure Payment'}
      </button>

      <p className="text-[10px] text-ink-slate text-center pt-2">
        Payments are processed securely via Razorpay. We never store your card details.
      </p>
    </form>
  );
}

/* ─── shared field components ────────────────────────────── */
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
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
