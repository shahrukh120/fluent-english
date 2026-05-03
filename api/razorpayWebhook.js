import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Vercel auto-parses JSON, but webhook signature verification needs the
// raw request body byte-for-byte. Disable the parser.
export const config = { api: { bodyParser: false } };

const escapeHtml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const rawBody = await readRawBody(req);
    const sig = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) return res.status(500).json({ error: 'Webhook secret not configured.' });
    if (!sig) return res.status(400).json({ error: 'Missing signature header.' });

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    const sigBuf = Buffer.from(sig, 'utf8');
    const expBuf = Buffer.from(expected, 'utf8');
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return res.status(400).json({ error: 'Invalid signature.' });
    }

    const event = JSON.parse(rawBody);

    // Only act on successful payment captures — ignore everything else.
    if (event.event !== 'payment.captured') {
      return res.status(200).json({ received: true, ignored: event.event });
    }

    const p = event.payload?.payment?.entity || {};
    const notes = p.notes || {};
    const amountInr = (Number(p.amount) || 0) / 100;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #E4E9F5;">
        <div style="background:#0B1426;color:#fff;padding:20px 24px;">
          <h2 style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;">Webhook: Payment Captured</h2>
          <p style="margin:6px 0 0;font-size:11px;color:#F0CC78;letter-spacing:0.18em;text-transform:uppercase;">
            Razorpay safety-net notification
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;color:#1E2D50;">
          ${[
            ['Name (notes)', notes.name || '—'],
            ['Email (notes)', notes.email || p.email || '—'],
            ['Phone (notes)', notes.phone || p.contact || '—'],
            ['Course (notes)', notes.course || '—'],
            ['Amount', `₹${amountInr}`],
            ['Method', p.method || '—'],
            ['Payment ID', p.id || '—'],
            ['Order ID', p.order_id || '—'],
            ['Status', p.status || '—'],
          ]
            .map(
              ([k, v]) =>
                `<tr><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;font-weight:600;width:160px;vertical-align:top;">${k}</td><td style="padding:10px 16px;border-bottom:1px solid #E4E9F5;">${escapeHtml(v)}</td></tr>`
            )
            .join('')}
        </table>
        <p style="padding:14px 24px;font-size:11px;color:#6B7AB8;background:#F0F3FA;margin:0;">
          This is the Razorpay webhook safety-net. If you also received a "New Payment Received" email
          from the site, both refer to the same transaction.
        </p>
      </div>`;

    await transporter.sendMail({
      from: `"Fluent English Webhook" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Webhook: Payment Captured — ₹${amountInr} (${p.id})`,
      html,
    });

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('razorpayWebhook error:', err);
    // Always return 200 so Razorpay doesn't retry indefinitely on our bugs;
    // log so we can debug.
    return res.status(200).json({ received: true, error: 'Internal error logged.' });
  }
}
