import nodemailer from 'nodemailer';
import { getSupabase } from './_supabase.js';

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatDateTime = (iso) => {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
};

function adminEmailHtml(d) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E4E9F5;">
    <div style="background:#0B1426;color:#fff;padding:20px 24px;">
      <h2 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;">New Demo Session Request</h2>
      <p style="margin:6px 0 0;font-size:11px;color:#F0CC78;letter-spacing:0.18em;text-transform:uppercase;">Fluent English — Demo Booking</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;color:#1E2D50;">
      ${[
        ['Name', d.name],
        ['Email', d.email],
        ['Phone', d.phone],
        ['Preferred Date & Time', formatDateTime(d.datetime)],
        ['Communication Challenges', d.issues || '—'],
      ]
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;font-weight:600;width:180px;vertical-align:top;">${k}</td><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
  </div>`;
}

function userEmailHtml(d) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:auto;background:#fff;border:1px solid #E4E9F5;">
    <div style="background:#0B1426;color:#fff;padding:32px 28px;text-align:center;">
      <p style="margin:0;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AA4A;">Demo Session Requested</p>
      <h1 style="margin:14px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:30px;color:#fff;">FLUENT <span style="color:#F0CC78;">ENGLISH</span></h1>
      <p style="margin:8px 0 0;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;color:rgba(255,255,255,0.7);font-size:14px;">Building That Mind to Mouth Connection</p>
    </div>
    <div style="padding:32px 28px;color:#1E2D50;font-size:13px;line-height:1.7;">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:700;color:#0B1426;margin:0 0 14px;">Hi ${escapeHtml(d.name)},</p>
      <p style="margin:0 0 16px;">Thank you for requesting a free demo session with Fluent English. We've received your details and our team will reach out within <strong>24 hours</strong> to confirm your slot.</p>

      <div style="background:#FDF6E3;border-left:3px solid #B8922A;padding:16px 18px;margin:18px 0;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;color:#1E2D50;">
        Your preferred time: <strong>${escapeHtml(formatDateTime(d.datetime))}</strong>
      </div>

      <p style="margin:18px 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#D4AA4A;font-weight:600;">What To Expect</p>
      <ul style="padding-left:18px;margin:0 0 16px;color:#3A4D7A;">
        <li style="margin-bottom:6px;">A 45-minute one-on-one session.</li>
        <li style="margin-bottom:6px;">No payment required.</li>
        <li style="margin-bottom:6px;">A practical assessment of your communication patterns.</li>
        <li style="margin-bottom:6px;">A clear next-step recommendation.</li>
      </ul>

      <p style="margin:24px 0 0;font-size:12px;color:#3A4D7A;">If you have any questions, simply reply to this email.</p>
      <p style="margin:28px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:14px;color:#1E2D50;">Warmly,<br/>The Fluent English Team</p>
    </div>
    <div style="background:#0B1426;color:rgba(255,255,255,0.4);padding:16px 28px;font-size:10px;text-align:center;letter-spacing:0.06em;">
      Fluent English © 2026 · contact.fluentenglishedu@gmail.com · @fluentenglish_edu
    </div>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, datetime, issues, website } = req.body || {};
    if (!name || !email || !phone || !datetime) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Honeypot — real users never see/fill the `website` field. Bots usually do.
    // Pretend success so the spammer doesn't probe further.
    if (website && String(website).trim() !== '') {
      console.warn('submitDemo honeypot tripped:', { email, phone });
      return res.status(200).json({ success: true });
    }

    // Rate-limit: same email or phone can only submit once every 10 minutes.
    // Uses Supabase as the store — no extra service needed.
    const supabaseEarly = getSupabase();
    if (supabaseEarly) {
      const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { count, error: rlErr } = await supabaseEarly
        .from('demo_requests')
        .select('id', { count: 'exact', head: true })
        .or(`email.eq.${email},phone.eq.${phone}`)
        .gte('created_at', tenMinAgo);
      if (rlErr) {
        console.error('submitDemo rate-limit check error:', rlErr);
      } else if ((count || 0) > 0) {
        return res.status(429).json({
          error: 'A demo request from this email or phone was already received recently. Please wait a few minutes before trying again, or contact us at contact.fluentenglishedu@gmail.com.',
        });
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const data = { name, email, phone, datetime, issues };

    // Log to Supabase first (fail-soft — never block the user on a logging error)
    const supabase = getSupabase();
    if (!supabase) {
      console.error('demo_requests insert skipped: Supabase env vars missing');
    } else {
      try {
        const { error } = await supabase.from('demo_requests').insert({
          name,
          email,
          phone,
          preferred_at: datetime ? new Date(datetime).toISOString() : null,
          issues: issues || null,
        });
        if (error) console.error('demo_requests insert error:', error);
      } catch (e) {
        console.error('demo_requests insert threw:', e);
      }
    }

    await Promise.all([
      transporter.sendMail({
        from: `"Fluent English Bookings" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Demo Request — ${name}`,
        html: adminEmailHtml(data),
      }),
      transporter.sendMail({
        from: `"Fluent English" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Free Demo Session — Fluent English',
        html: userEmailHtml(data),
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('submitDemo error:', err);
    return res.status(500).json({ error: 'Could not submit your request.' });
  }
}
