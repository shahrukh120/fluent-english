// Single source of truth for INR → USD display conversion.
// Razorpay always charges in INR; the USD figure is shown only as a
// reference for international visitors. Update USD_RATE here when the
// exchange rate moves significantly (every 3–6 months is fine).
export const USD_RATE = 95.89; // ₹ per $1

const inrFromAny = (v) =>
  typeof v === 'number' ? v : Number(String(v).replace(/[^\d.]/g, '')) || 0;

export const inrToUsd = (inr) => Math.round(inrFromAny(inr) / USD_RATE);

export const formatInr = (inr) =>
  `₹${inrFromAny(inr).toLocaleString('en-IN')}`;

export const formatUsd = (inr) =>
  `~$${inrToUsd(inr).toLocaleString('en-US')}`;

// "₹4,485" → "₹4,485 · ~$53"
// 4485       → "₹4,485 · ~$53"
export const formatBoth = (inr) => `${formatInr(inr)} · ${formatUsd(inr)}`;

// "₹299/hr" → "₹299 · ~$4 / hr"
export const formatPerHourBoth = (priceLabel) => {
  const num = inrFromAny(priceLabel);
  return `₹${num} · ~$${inrToUsd(num)} / hr`;
};
