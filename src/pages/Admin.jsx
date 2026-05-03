import { useEffect, useState, useMemo } from 'react';
import { supabase, ADMIN_EMAIL } from '../lib/supabase.js';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (!supabase) return setLoadingSession(false);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingSession(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <Wrapper>
        <Box>
          <h1 className="font-serif font-bold text-[26px] text-navy">Admin not configured</h1>
          <p className="body-text mt-2">Supabase env vars are missing on this deployment.</p>
        </Box>
      </Wrapper>
    );
  }

  if (loadingSession) {
    return <Wrapper><Box><p className="body-text">Loading…</p></Box></Wrapper>;
  }

  if (!session) return <SignIn />;

  if (session.user.email !== ADMIN_EMAIL) {
    return (
      <Wrapper>
        <Box>
          <h1 className="font-serif font-bold text-[26px] text-navy">Access denied</h1>
          <p className="body-text mt-3">
            You're signed in as <strong>{session.user.email}</strong>. This panel is restricted to {ADMIN_EMAIL}.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-6 bg-navy text-white text-[12px] uppercase tracking-wider px-5 py-3 hover:bg-navy-dark"
          >
            Sign out
          </button>
        </Box>
      </Wrapper>
    );
  }

  return <Dashboard email={session.user.email} />;
}

/* ────────────────────────────────────────────── */
function Wrapper({ children }) {
  return <div className="min-h-screen bg-offwhite pt-24 pb-16"><div className="container-fe">{children}</div></div>;
}

function Box({ children }) {
  return <div className="bg-white border border-border-light p-8 max-w-md mx-auto">{children}</div>;
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus({ state: 'loading', msg: 'Sending magic link…' });
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (error) setStatus({ state: 'error', msg: error.message });
    else setStatus({ state: 'sent', msg: 'Check your inbox for the magic link.' });
  };

  return (
    <Wrapper>
      <Box>
        <p className="label-cap">Admin Panel</p>
        <h1 className="font-serif font-bold text-[26px] text-navy mt-2">Sign in</h1>
        <p className="body-text mt-2">Enter the founder email to receive a one-time magic link.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact.fluentenglishedu@gmail.com"
            className="w-full border border-border-light px-3 py-3 text-[13px] text-navy-dark"
            required
          />
          <button
            type="submit"
            disabled={status.state === 'loading' || status.state === 'sent'}
            className="w-full bg-gold hover:bg-gold-mid disabled:bg-gold/50 transition-colors text-white font-sans font-semibold text-[13px] py-3"
          >
            {status.state === 'loading' ? 'Sending…' : status.state === 'sent' ? 'Link sent ✓' : 'Send magic link'}
          </button>
          {status.state === 'sent' && <p className="text-[11px] text-forest">{status.msg}</p>}
          {status.state === 'error' && <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{status.msg}</p>}
        </form>
      </Box>
    </Wrapper>
  );
}

/* ────────────────────────────────────────────── */
function Dashboard({ email }) {
  const [tab, setTab] = useState('demos');
  const [demos, setDemos] = useState(null);
  const [enrolls, setEnrolls] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    Promise.all([
      supabase.from('demo_requests').select('*').order('created_at', { ascending: false }).limit(500),
      supabase.from('enrollments').select('*').order('created_at', { ascending: false }).limit(500),
    ]).then(([d, e]) => {
      if (!alive) return;
      if (d.error) setError(d.error.message);
      if (e.error) setError(e.error.message);
      setDemos(d.data || []);
      setEnrolls(e.data || []);
    });
    return () => { alive = false; };
  }, []);

  const totalRevenue = useMemo(
    () => (enrolls || []).reduce((s, r) => s + (Number(r.amount) || 0), 0),
    [enrolls]
  );

  return (
    <div className="min-h-screen bg-offwhite pt-24 pb-16">
      <div className="container-fe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="label-cap">Admin Panel</p>
            <h1 className="font-serif font-bold text-[28px] text-navy mt-2">Bookings & Enrollments</h1>
            <p className="text-[11px] text-ink-slate mt-1">Signed in as {email}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-[11px] uppercase tracking-wider border border-border-light px-4 py-2 hover:border-gold w-fit"
          >
            Sign out
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <Kpi label="Demo Requests" value={demos === null ? '…' : demos.length} />
          <Kpi label="Enrollments" value={enrolls === null ? '…' : enrolls.length} />
          <Kpi label="Total Revenue" value={enrolls === null ? '…' : `₹${totalRevenue.toLocaleString('en-IN')}`} />
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 border border-border-light max-w-sm mb-6">
          {[['demos', 'Demos'], ['enrolls', 'Enrollments']].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`py-3 text-[11px] uppercase tracking-wider font-medium ${tab === k ? 'bg-navy text-white' : 'bg-white text-navy-dark hover:bg-offwhite'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {error && <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-3 py-2 mb-4">{error}</p>}

        {tab === 'demos'
          ? <DemosTable rows={demos} />
          : <EnrollsTable rows={enrolls} />
        }
      </div>
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="bg-white border-t-[3px] border-t-navy-royal p-6">
      <p className="text-[10px] uppercase tracking-wider text-ink-slate">{label}</p>
      <p className="font-serif font-bold text-navy-royal mt-1" style={{ fontSize: 32 }}>{value}</p>
    </div>
  );
}

const fmtDate = (iso) => iso ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

function DemosTable({ rows }) {
  if (rows === null) return <p className="body-text">Loading…</p>;
  if (rows.length === 0) return <p className="body-text">No demo requests yet.</p>;
  return (
    <div className="bg-white border border-border-light overflow-x-auto">
      <table className="w-full text-[11px] min-w-[800px]">
        <thead>
          <tr className="bg-offwhite text-left text-[10px] uppercase tracking-wider text-navy-dark">
            <Th>Submitted</Th><Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Preferred</Th><Th>Issues</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border-light">
              <Td>{fmtDate(r.created_at)}</Td>
              <Td><strong>{r.name}</strong></Td>
              <Td><a href={`mailto:${r.email}`} className="text-gold hover:underline">{r.email}</a></Td>
              <Td>{r.phone}</Td>
              <Td>{fmtDate(r.preferred_at)}</Td>
              <Td className="max-w-xs">{r.issues || '—'}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnrollsTable({ rows }) {
  if (rows === null) return <p className="body-text">Loading…</p>;
  if (rows.length === 0) return <p className="body-text">No enrollments yet.</p>;
  return (
    <div className="bg-white border border-border-light overflow-x-auto">
      <table className="w-full text-[11px] min-w-[1200px]">
        <thead>
          <tr className="bg-offwhite text-left text-[10px] uppercase tracking-wider text-navy-dark">
            <Th>Submitted</Th><Th>Name</Th><Th>Email</Th><Th>Phone</Th>
            <Th>Programme</Th><Th>Duration</Th><Th>Amount</Th>
            <Th>Profile</Th><Th>Country / State</Th><Th>Level</Th>
            <Th>Payment ID</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border-light">
              <Td>{fmtDate(r.created_at)}</Td>
              <Td><strong>{r.name}</strong></Td>
              <Td><a href={`mailto:${r.email}`} className="text-gold hover:underline">{r.email}</a></Td>
              <Td>{r.phone}</Td>
              <Td>{r.programme || '—'}</Td>
              <Td>{r.duration || '—'}</Td>
              <Td className="font-semibold text-navy-royal">₹{(r.amount || 0).toLocaleString('en-IN')}</Td>
              <Td>{r.profile || '—'}{r.profession ? ` · ${r.profession}` : ''}{r.college ? ` · ${r.college}` : ''}</Td>
              <Td>{[r.country, r.state].filter(Boolean).join(' / ') || '—'}</Td>
              <Td>{r.english_level || '—'}</Td>
              <Td className="font-mono text-[10px]">{r.payment_id || '—'}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Th = ({ children }) => <th className="px-3 py-3 font-medium">{children}</th>;
const Td = ({ children, className = '' }) => <td className={`px-3 py-3 text-ink-slate ${className}`}>{children}</td>;
