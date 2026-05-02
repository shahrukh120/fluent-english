import Razorpay from 'razorpay';

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
        name: String(name).slice(0, 100),
        email: String(email).slice(0, 120),
        phone: String(phone).slice(0, 20),
        course: String(course).slice(0, 80),
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
    return res.status(500).json({ error: 'Could not create order.' });
  }
}
