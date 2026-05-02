# Fluent English — Website + Razorpay Backend

Production-ready React + Vite + Tailwind frontend and Vercel serverless backend
for **Fluent English — Elite English Communication Coaching**.

```
fluentedge/
├── api/                          # Vercel serverless functions
│   ├── createOrder.js            # POST /api/createOrder
│   └── verifyPayment.js          # POST /api/verifyPayment
├── src/
│   ├── components/               # Navbar, Footer, Ornaments, etc.
│   ├── pages/                    # Home, About, Courses, Founders, Testimonials, Contact
│   ├── data/                     # courses.js, testimonials.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
├── package.json
└── .env.example
```

## 1. Setup

```bash
cd fluentedge
npm install
cp .env.example .env
# fill in RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, EMAIL_USER, EMAIL_PASS
```

### Gmail App Password
Use a **Gmail App Password** (not your normal password) for `EMAIL_PASS`.
Generate one at: https://myaccount.google.com/apppasswords (requires 2FA enabled).

### Razorpay Keys
Get test keys from the Razorpay dashboard → Settings → API Keys.

## 2. Run locally

The frontend alone (no backend):

```bash
npm run dev
# http://localhost:5173
```

The full stack (frontend + serverless API), using the Vercel CLI:

```bash
npm i -g vercel
vercel dev
# http://localhost:3000
```

`vercel dev` runs `/api/*.js` as serverless functions and serves the Vite app.

## 3. Deploy to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new → Import the repo.
3. Framework preset: **Vite**. Build command and output dir are auto-detected.
4. Add the four environment variables in the Vercel project settings:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Deploy. The frontend lives at `/` and the API at `/api/createOrder` and `/api/verifyPayment` on the same domain — no CORS setup needed.

## 4. API Reference

### `POST /api/createOrder`

Request:
```json
{
  "name": "Aarav Mehta",
  "email": "aarav@example.com",
  "phone": "+919999999999",
  "course": "Professional English",
  "amount": 499
}
```

Response:
```json
{
  "order_id": "order_OqXXXXXXXXXXXX",
  "key_id": "rzp_test_xxxxxxxxxxxx",
  "amount": 49900,
  "currency": "INR"
}
```

### `POST /api/verifyPayment`

Request:
```json
{
  "razorpay_order_id": "...",
  "razorpay_payment_id": "...",
  "razorpay_signature": "...",
  "name": "Aarav Mehta",
  "email": "aarav@example.com",
  "phone": "+919999999999",
  "course": "Professional English",
  "amount": 499,
  "challenge": "I freeze in board meetings",
  "preferred_time": "Evening"
}
```

Verifies the HMAC-SHA256 signature with `RAZORPAY_KEY_SECRET`, then sends both
the admin notification and the branded user confirmation email. Returns:

```json
{ "success": true }
```

If the signature is invalid → `400 { "error": "Invalid payment signature." }`.

## 5. Frontend → Backend flow

The Contact page (`src/pages/Contact.jsx`) handles the entire flow:

```js
// 1. Create order
const orderRes = await fetch('/api/createOrder', { method:'POST', /* ... */ });
const { order_id, key_id } = await orderRes.json();

// 2. Open Razorpay checkout
const rzp = new window.Razorpay({
  key: key_id,
  order_id,
  handler: async (resp) => {
    // 3. Verify on the server
    await fetch('/api/verifyPayment', { method:'POST', body: JSON.stringify({
      razorpay_order_id: resp.razorpay_order_id,
      razorpay_payment_id: resp.razorpay_payment_id,
      razorpay_signature:  resp.razorpay_signature,
      ...formData,
    })});
  },
});
rzp.open();
```

The Razorpay checkout JS is loaded once in `index.html`.

## 6. Design System

All pages strictly follow the Fluent English Brand Guide:

- Colours mapped in `tailwind.config.js` (`navy`, `gold`, `offwhite`, etc.)
- **Sharp corners everywhere** (a global `border-radius: 0` override is in `index.css`)
- Cormorant Garamond (display/serif) + Inter (body) loaded from Google Fonts
- Gold used as accent only — never as a large background
- Section transitions: `white → #F0F3FA → white` or `light → dark navy` for emphasis
- Sticky nav, fade-in/slide-up animations, scroll-reveal for every section
- Floating WhatsApp + back-to-top buttons
- Mobile-responsive, hamburger nav under 1024px

## 7. Security notes

- The frontend NEVER trusts payment success. We always re-verify the
  signature server-side before sending emails.
- `RAZORPAY_KEY_SECRET` and `EMAIL_PASS` live only in Vercel env vars;
  they are never exposed to the client.
- Signature comparison uses `crypto.timingSafeEqual` to avoid timing
  side channels.
- All user-supplied strings in admin/user emails are HTML-escaped.

## 8. Customising the booking amount

By default, the contact form charges a small ₹99 confirmation deposit. If
the user lands on the Contact page from a Course CTA, the URL carries
`?course=...&amount=...` and that course's hourly price is used as the
booking amount. Adjust `DEFAULT_AMOUNT` in `src/pages/Contact.jsx` to
change the default.
