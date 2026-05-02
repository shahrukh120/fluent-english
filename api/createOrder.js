import Razorpay from 'razorpay';

// Razorpay's `notes` field rejects 4-byte UTF-8 (emoji / characters outside the BMP)
// and most ASCII control characters. Strip them defensively so user input never breaks
// order creation.
function sanitize(s, max) {
  return String(s == null ? '' : s)
    .replace(/[\u{10000}-\u{10FFFF}]/gu, '')   // emoji + astral plane
    .replace(/[\x00-\x1F\x7F]/g, '')           // ASCII control chars
    .trim()
    .slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, course, amount } = req.body || {};

    if (!name || !email || !phone || !course || !amount) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < 1) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return res.status(500).json({ error: 'Payment gateway not configured.' });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: Math.round(numericAmount * 100), // paise
      currency: 'INR',
      receipt: `fe_${Date.now()}`,
      notes: {
        name: sanitize(name, 100),
        email: sanitize(email, 120),
        phone: sanitize(phone, 20),
        course: sanitize(course, 80),
      },
    });

    return res.status(200).json({
      order_id: order.id,
      key_id: keyId,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('createOrder error:', err);
    const rzpMsg =
      err?.error?.description ||
      err?.message ||
      'Could not create order.';
    return res.status(500).json({ error: `Razorpay: ${rzpMsg}` });
  }
}
