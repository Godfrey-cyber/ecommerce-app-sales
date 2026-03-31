import { useState } from "react";

// ─── Mock Cart Items ──────────────────────────────────────────────────────────
const cartItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
    title: "Premium Minimalist Watch",
    variant: "Silver / 40mm",
    qty: 1,
    price: 12500,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=120&h=120&fit=crop",
    title: "Leather Bifold Wallet",
    variant: "Cognac Brown",
    qty: 2,
    price: 3200,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=120&h=120&fit=crop",
    title: "Ultraboost Running Shoes",
    variant: "Cloud White / Size 42",
    qty: 1,
    price: 17850,
  },
];

const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
const shipping = 350;
const tax = Math.round(subtotal * 0.16);
const total = subtotal + shipping + tax;

const fmt = (n) => `KSh ${n.toLocaleString()}`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CardIcon = ({ brand }) => {
  const icons = {
    visa: (
      <span className="text-[10px] font-black tracking-tighter text-blue-800 bg-white px-1 py-0.5 rounded border border-slate-200">VISA</span>
    ),
    mastercard: (
      <span className="flex gap-0.5">
        <span className="w-4 h-4 rounded-full bg-red-500 opacity-90" />
        <span className="w-4 h-4 rounded-full bg-yellow-400 -ml-2 opacity-90" />
      </span>
    ),
    amex: (
      <span className="text-[9px] font-black tracking-tight text-blue-900 bg-blue-50 px-1 py-0.5 rounded border border-blue-200">AMEX</span>
    ),
  };
  return icons[brand] ?? null;
};

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({ label, placeholder, type = "text", half = false, icon, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-150 bg-white
          ${focused
            ? "border-violet-500 ring-2 ring-violet-100 shadow-sm"
            : "border-slate-200 hover:border-slate-300"
          }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300 font-medium"
        />
        {icon && (
          <span className="pr-4 text-slate-300 flex-shrink-0">{icon}</span>
        )}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────
const DummyCheck = () => {
  const [payMethod, setPayMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "Kenya",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2200);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-sm text-slate-500 mb-1">Your order has been placed.</p>
          <p className="text-xs text-slate-400 font-mono mb-8">Order #ORD-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <p className="text-sm font-semibold text-slate-700 mb-6">{fmt(total)} charged to your card.</p>
          <button
            onClick={() => setDone(false)}
            className="px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* Top Nav */}
      <header className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">ShopKenya</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <LockIcon />
            <span>Secured by Stripe</span>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {["Cart", "Information", "Payment"].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className={i === 2 ? "text-violet-600 font-semibold" : i < 2 ? "text-slate-500" : "text-slate-300"}>
                {step}
              </span>
              {i < arr.length - 1 && <ChevronRight />}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-[1fr_380px] gap-8 items-start">

        {/* ── LEFT: Form ── */}
        <div className="space-y-6">

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <SectionHeader number="1" title="Contact Information" subtitle="We'll send your receipt here" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email Address" placeholder="you@email.com" type="email" value={form.email} onChange={set("email")} />
              <Field label="Full Name" placeholder="John Doe" value={form.fullName} onChange={set("fullName")} />
              <Field label="Phone Number" placeholder="+254 712 345 678" half value={form.phone} onChange={set("phone")} />
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <SectionHeader number="2" title="Shipping Address" subtitle="Where should we deliver?" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Street Address" placeholder="123 Kimathi Street" value={form.address} onChange={set("address")} />
              <Field label="City" placeholder="Nairobi" half value={form.city} onChange={set("city")} />
              <Field label="Postal Code" placeholder="00100" half value={form.zip} onChange={set("zip")} />
              <Field label="Country" placeholder="Kenya" value={form.country} onChange={set("country")} />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <SectionHeader number="3" title="Payment Method" />

            {/* Method tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { key: "card", label: "Card", icon: "💳" },
                { key: "mpesa", label: "M-Pesa", icon: "📱" },
                { key: "bank", label: "Bank", icon: "🏦" },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setPayMethod(key)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-semibold transition-all duration-150
                    ${payMethod === key
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  <span className="text-base">{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Card form */}
            {payMethod === "card" && (
              <div className="space-y-4">
                {/* Card number */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234  5678  9012  3456"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                        setForm((f) => ({ ...f, cardNumber: v }));
                      }}
                      className="w-full px-4 py-3 pr-28 text-sm font-mono text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-300 placeholder:font-sans transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <CardIcon brand="visa" />
                      <CardIcon brand="mastercard" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
                      value={form.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 2) v = v.slice(0, 2) + " / " + v.slice(2, 4);
                        setForm((f) => ({ ...f, expiry: v }));
                      }}
                      className="w-full px-4 py-3 text-sm font-mono text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-300 placeholder:font-sans transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      CVV / CVC
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={form.cvv}
                        onChange={set("cvv")}
                        className="w-full px-4 py-3 text-sm font-mono text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-300 transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="As it appears on your card"
                    value={form.cardName}
                    onChange={set("cardName")}
                    className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-300 transition-all"
                  />
                </div>

                {/* Save card toggle */}
                <div
                  className="flex items-center gap-3 cursor-pointer select-none group"
                  onClick={() => setSaveCard(!saveCard)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${saveCard ? "bg-violet-600 border-violet-600 text-white" : "border-slate-300 group-hover:border-slate-400"}`}
                  >
                    {saveCard && <CheckIcon />}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Save this card for future purchases
                  </span>
                </div>
              </div>
            )}

            {/* M-Pesa */}
            {payMethod === "mpesa" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-xs">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">M-Pesa STK Push</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Enter your Safaricom number to receive a payment prompt</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    M-Pesa Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0712 345 678"
                    className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 placeholder:text-slate-300 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You will receive an STK push prompt on your phone. Enter your M-Pesa PIN to complete the payment.
                </p>
              </div>
            )}

            {/* Bank Transfer */}
            {payMethod === "bank" && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  {[
                    ["Bank Name", "Equity Bank Kenya"],
                    ["Account Name", "ShopKenya Ltd"],
                    ["Account Number", "0123456789012"],
                    ["Branch", "Nairobi CBD"],
                    ["Reference", `ORD-${Math.floor(Math.random() * 90000 + 10000)}`],
                  ].map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-medium">{key}</span>
                      <span className="text-xs font-bold text-slate-700 font-mono">{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transfer the exact amount and include the reference number. Orders are processed after payment confirmation (1–2 business days).
                </p>
              </div>
            )}
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2.5 transition-all duration-200
              ${loading
                ? "bg-violet-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 active:scale-[0.99] shadow-lg shadow-violet-200 hover:shadow-violet-300"
              }`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing payment…
              </>
            ) : (
              <>
                <LockIcon />
                Pay {fmt(total)}
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 py-2">
            {["256-bit SSL", "PCI DSS", "Stripe Secure"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <svg className="w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="space-y-4 sticky top-6">

          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Order Summary</h2>
              <p className="text-xs text-slate-400 mt-0.5">{cartItems.length} items</p>
            </div>

            {/* Items */}
            <div className="px-5 divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 py-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-slate-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">{item.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.variant}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-mono whitespace-nowrap">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="px-5 py-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-100 placeholder:text-slate-300 transition-all"
                />
                <button className="px-4 py-2.5 text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="px-5 py-4 border-t border-slate-100 space-y-2.5">
              {[
                ["Subtotal", fmt(subtotal)],
                ["Shipping", fmt(shipping)],
                ["Tax (16% VAT)", fmt(tax)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-semibold text-slate-700 font-mono">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">Total</span>
                <span className="text-base font-black text-slate-900 font-mono">{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Free delivery on orders over KSh 5,000</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Estimated delivery: <span className="text-slate-600 font-medium">3–5 business days</span>
                </p>
              </div>
            </div>
          </div>

          {/* Returns */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">30-day free returns</p>
                <p className="text-[11px] text-slate-400 mt-0.5">No questions asked return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DummyCheck