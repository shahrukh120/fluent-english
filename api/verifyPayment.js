import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getSupabase } from './_supabase.js';

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

function adminEmailHtml(d) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E4E9F5;">
    <div style="background:#0B1426;color:#fff;padding:20px 24px;">
      <h2 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;">New Payment Received</h2>
      <p style="margin:6px 0 0;font-size:11px;color:#F0CC78;letter-spacing:0.18em;text-transform:uppercase;">Fluent English Admin Notification</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;color:#1E2D50;">
      ${[
        ['Name', d.name],
        ['Email', d.email],
        ['Phone', d.phone],
        ['Country / State', `${d.country || '—'} / ${d.state || '—'}`],
        ['Profile', d.profile || '—'],
        ...(d.profile === 'Working Professional' ? [['Profession', d.profession || '—']] : []),
        ...(d.profile === 'Student' ? [
          ['College', d.college || '—'],
          ['Course of Study', d.course_field || '—'],
          ['Year', d.year || '—'],
        ] : []),
        ['Level of English', d.englishLevel || '—'],
        ['Programme', d.programme || d.course || '—'],
        ['Duration', d.duration || '—'],
        ['Amount', `₹${d.amount}`],
        ['Payment ID', d.payment_id],
        ['Order ID', d.order_id],
      ]
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;font-weight:600;width:170px;vertical-align:top;">${k}</td><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
  </div>`;
}

function userEmailHtml(d) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:620px;margin:auto;background:#fff;border:1px solid #E4E9F5;">
    <div style="background:#0B1426;color:#fff;padding:32px 28px;text-align:center;">
      <p style="margin:0;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AA4A;">Welcome to Fluent English</p>
      <h1 style="margin:14px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:30px;color:#fff;">FLUENT <span style="color:#F0CC78;">ENGLISH</span></h1>
      <p style="margin:8px 0 0;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;color:rgba(255,255,255,0.7);font-size:14px;">Building That Mind to Mouth Connection</p>
    </div>

    <div style="padding:32px 28px;color:#1E2D50;font-size:13px;line-height:1.7;">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:700;color:#0B1426;margin:0 0 14px;">Hi ${escapeHtml(d.name)},</p>
      <p style="margin:0 0 16px;">Your payment of <strong>₹${escapeHtml(String(d.amount))}</strong> for <strong>${escapeHtml(d.course)}</strong> is confirmed. Welcome to Fluent English.</p>

      <div style="background:#FDF6E3;border-left:3px solid #B8922A;padding:16px 18px;margin:18px 0;font-style:italic;font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;color:#1E2D50;">
        "We don't teach English. We build the bridge between how you think and how the world hears you."
      </div>

      <p style="margin:18px 0 8px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#D4AA4A;font-weight:600;">What Happens Next</p>
      <ul style="padding-left:18px;margin:0 0 16px;color:#3A4D7A;">
        <li style="margin-bottom:6px;">Our team will contact you within <strong>24 hours</strong>.</li>
        <li style="margin-bottom:6px;">We'll schedule your first session at a time that works for you.</li>
        <li style="margin-bottom:6px;">You'll receive a personalised programme built around your goals.</li>
      </ul>

      <p style="margin:24px 0 0;font-size:12px;color:#3A4D7A;">If you have any questions, simply reply to this email — we'll be in touch.</p>

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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      course,
      amount,
      country,
      state,
      profile,
      profession,
      college,
      course_field,
      year,
      englishLevel,
      programme,
      duration,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment fields.' });
    }
    if (!name || !email || !phone || !course || !amount) {
      return res.status(400).json({ error: 'Missing user fields.' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return res.status(500).json({ error: 'Server misconfigured.' });

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const sigBuf = Buffer.from(razorpay_signature, 'utf8');
    const expBuf = Buffer.from(expected, 'utf8');
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return res.status(400).json({ error: 'Invalid payment signature.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const data = {
      name,
      email,
      phone,
      course,
      amount,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      country,
      state,
      profile,
      profession,
      college,
      course_field,
      year,
      englishLevel,
      programme,
      duration,
    };

    // Log to Supabase first (fail-soft). `payment_id` is unique → upsert prevents
    // duplicates if verifyPayment somehow runs twice for the same payment.
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('enrollments').upsert(
          {
            name,
            email,
            phone,
            country: country || null,
            state: state || null,
            profile: profile || null,
            profession: profession || null,
            college: college || null,
            course_field: course_field || null,
            year: year || null,
            english_level: englishLevel || null,
            programme: programme || course || null,
            duration: duration || null,
            amount: Number(amount) || null,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
          },
          { onConflict: 'payment_id' }
        );
      } catch (e) {
        console.error('enrollments insert failed:', e);
      }
    }

    await Promise.all([
      transporter.sendMail({
        from: `"Fluent English Bookings" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Payment Received — ${name} (${course})`,
        html: adminEmailHtml(data),
      }),
      transporter.sendMail({
        from: `"Fluent English" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Fluent English — Your Payment is Confirmed',
        html: userEmailHtml(data),
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('verifyPayment error:', err);
    return res.status(500).json({ error: 'Verification failed.' });
  }
}
