import { useState, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/checkoutpage.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) => `₦${Number(n).toLocaleString()}`;

// ── Validation rules ──────────────────────────────────────────────────────────
const VALIDATORS = {
  name:    (v) => v.trim().length >= 2  ? "" : "Please enter your full name.",
  phone:   (v) => /^(\+?234|0)[789]\d{9}$/.test(v.trim())
                   ? "" : "Enter a valid Nigerian phone number (e.g. 08012345678).",
  address: (v) => v.trim().length >= 10 ? "" : "Please enter a full delivery address (min 10 chars).",
};

// ── Payment method config ─────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    value: "whatsapp",
    label: "WhatsApp Coordination",
    icon:  "fab fa-whatsapp",
    desc:  "We'll send your order details via WhatsApp. Pay on delivery.",
    badge: "Recommended",
  },
  {
    value: "transfer",
    label: "Bank Transfer",
    icon:  "fas fa-university",
    desc:  "Transfer before delivery. Account details sent after order.",
    badge: null,
  },
  {
    value: "card",
    label: "Card Payment",
    icon:  "fas fa-credit-card",
    desc:  "Pay securely with debit or credit card. (Coming soon)",
    badge: "Soon",
    disabled: true,
  },
];

// ── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = ["Cart", "Details", "Confirm"];
  return (
    <div className="ck__steps" aria-label="Checkout progress">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`ck__step${i + 1 === step ? " active" : ""}${i + 1 < step ? " done" : ""}`}
          aria-current={i + 1 === step ? "step" : undefined}
        >
          <div className="ck__step-circle" aria-hidden="true">
            {i + 1 < step
              ? <i className="fas fa-check"></i>
              : i + 1}
          </div>
          <span className="ck__step-label">{s}</span>
          {i < steps.length - 1 && (
            <div className={`ck__step-line${i + 1 < step ? " done" : ""}`} aria-hidden="true"></div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Form field ────────────────────────────────────────────────────────────────
function Field({ id, label, error, children, required }) {
  return (
    <div className={`ck__field${error ? " ck__field--error" : ""}`}>
      <label htmlFor={id} className="ck__label">
        {label}
        {required && <span className="ck__required" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span className="ck__field-error" role="alert" id={`${id}-error`}>
          <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
          {error}
        </span>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:          "",
    phone:         "",
    address:       "",
    notes:         "",
    paymentMethod: "whatsapp",
  });

  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Totals
  const subtotal    = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 500 : 0;
  const platformFee = Math.round(subtotal * 0.05);
  const total       = subtotal + deliveryFee + platformFee;

  const restaurantName = cart[0]?.restaurant ?? "";

  // ── Field handlers ────────────────────────────────────────────────────────
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field] && VALIDATORS[field]) {
      setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](value) }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (VALIDATORS[field]) {
      setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](form[field]) }));
    }
  }, [form]);

  // ── Validate all fields ───────────────────────────────────────────────────
  const validateAll = useCallback(() => {
    const newErrors = {};
    let valid = true;
    Object.entries(VALIDATORS).forEach(([field, fn]) => {
      const err = fn(form[field]);
      if (err) { newErrors[field] = err; valid = false; }
    });
    setErrors(newErrors);
    setTouched({ name: true, phone: true, address: true });
    return valid;
  }, [form]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleConfirmOrder = useCallback(async () => {
    if (!validateAll()) return;
    if (loading) return;

    setLoading(true);

    // Build order object to pass to confirmation page
    const order = {
      id:            `UYO-${Date.now()}`,
      restaurant:    restaurantName,
      items:         cart,
      subtotal,
      deliveryFee,
      platformFee,
      total,
      customer:      { name: form.name, phone: form.phone, address: form.address },
      notes:         form.notes,
      paymentMethod: form.paymentMethod,
      placedAt:      new Date().toISOString(),
    };

    // Simulate API call — replace with real backend when ready
    await new Promise((r) => setTimeout(r, 1200));

    // If WhatsApp — open WhatsApp with order summary
    if (form.paymentMethod === "whatsapp") {
      const msg = [
        `🍽️ *New Order — Uyo Food*`,
        `*Restaurant:* ${restaurantName}`,
        `*Customer:* ${form.name}`,
        `*Phone:* ${form.phone}`,
        `*Address:* ${form.address}`,
        ``,
        `*Items:*`,
        ...cart.map((i) => `• ${i.dish} x${i.quantity || 1} — ${fmt(i.price * (i.quantity || 1))}`),
        ``,
        `*Total:* ${fmt(total)}`,
        form.notes ? `*Notes:* ${form.notes}` : "",
      ].filter(Boolean).join("\n");

      window.open(
        `https://wa.me/2348000000000?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }

    clearCart();
    setLoading(false);

    // Pass order data to confirmation page via navigation state
    navigate("/confirmation", { state: { order } });
  }, [validateAll, loading, form, cart, restaurantName, subtotal, deliveryFee, platformFee, total, clearCart, navigate]);

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="ck ck--empty" aria-labelledby="ck-empty-heading">
        <div className="ck__empty-inner">
          <i className="fas fa-shopping-bag" aria-hidden="true"></i>
          <h1 id="ck-empty-heading">Nothing to checkout</h1>
          <p>Add items to your cart first.</p>
          <Link to="/restaurants" className="ck__empty-cta">
            <i className="fas fa-store" aria-hidden="true"></i>
            Browse Restaurants
          </Link>
        </div>
      </main>
    );
  }

  const isFormValid = !Object.values(errors).some(Boolean) &&
    form.name && form.phone && form.address;

  return (
    <main className="ck" id="checkout-page" aria-labelledby="ck-heading">
      <div className="ck__inner">

        {/* Step indicator */}
        <StepBar step={2} />

        <h1 className="ck__title" id="ck-heading">
          <i className="fas fa-credit-card" aria-hidden="true"></i>
          Checkout
        </h1>

        <div className="ck__layout">

          {/* ── Left: form ── */}
          <div className="ck__form-col">

            {/* Delivery details */}
            <section className="ck__card" aria-labelledby="ck-delivery-heading">
              <h2 className="ck__card-title" id="ck-delivery-heading">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                Delivery Details
              </h2>

              <Field id="ck-name" label="Full Name" error={errors.name} required>
                <input
                  id="ck-name"
                  type="text"
                  className="ck__input"
                  placeholder="e.g. Blessing Okon"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  autoComplete="name"
                  aria-describedby={errors.name ? "ck-name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
              </Field>

              <Field id="ck-phone" label="Phone Number" error={errors.phone} required>
                <input
                  id="ck-phone"
                  type="tel"
                  className="ck__input"
                  placeholder="e.g. 08012345678"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  autoComplete="tel"
                  inputMode="tel"
                  aria-describedby={errors.phone ? "ck-phone-error" : undefined}
                  aria-invalid={!!errors.phone}
                />
              </Field>

              <Field id="ck-address" label="Delivery Address" error={errors.address} required>
                <textarea
                  id="ck-address"
                  className="ck__input ck__textarea"
                  placeholder="e.g. 12 Aka Road, opposite GTBank, Uyo"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                  autoComplete="street-address"
                  rows={3}
                  aria-describedby={errors.address ? "ck-address-error" : undefined}
                  aria-invalid={!!errors.address}
                />
              </Field>

              <Field id="ck-notes" label="Order Notes (optional)">
                <textarea
                  id="ck-notes"
                  className="ck__input ck__textarea"
                  placeholder="e.g. No pepper, extra fufu, call on arrival…"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={2}
                />
              </Field>
            </section>

            {/* Payment method */}
            <section className="ck__card" aria-labelledby="ck-payment-heading">
              <h2 className="ck__card-title" id="ck-payment-heading">
                <i className="fas fa-wallet" aria-hidden="true"></i>
                Payment Method
              </h2>

              <div
                className="ck__payment-options"
                role="radiogroup"
                aria-labelledby="ck-payment-heading"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.value}
                    className={`ck__payment-option${form.paymentMethod === pm.value ? " selected" : ""}${pm.disabled ? " disabled" : ""}`}
                    aria-disabled={pm.disabled}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.value}
                      checked={form.paymentMethod === pm.value}
                      onChange={() => !pm.disabled && handleChange("paymentMethod", pm.value)}
                      disabled={pm.disabled}
                      className="ck__radio"
                      aria-label={pm.label}
                    />
                    <i className={`${pm.icon} ck__payment-icon`} aria-hidden="true"></i>
                    <div className="ck__payment-info">
                      <span className="ck__payment-label">
                        {pm.label}
                        {pm.badge && (
                          <span className={`ck__payment-badge${pm.badge === "Recommended" ? " ck__payment-badge--rec" : " ck__payment-badge--soon"}`}>
                            {pm.badge}
                          </span>
                        )}
                      </span>
                      <span className="ck__payment-desc">{pm.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right: order summary ── */}
          <aside className="ck__summary-col" aria-label="Order summary">
            <div className="ck__card ck__summary">
              <h2 className="ck__card-title" id="ck-summary-heading">
                <i className="fas fa-receipt" aria-hidden="true"></i>
                Order Summary
              </h2>

              {restaurantName && (
                <p className="ck__summary-restaurant">
                  <i className="fas fa-store" aria-hidden="true"></i>
                  {restaurantName}
                </p>
              )}

              <ul className="ck__summary-items" aria-label="Cart items">
                {cart.map((item, idx) => (
                  <li key={item.id || `${item.dish}-${idx}`} className="ck__summary-item">
                    <span className="ck__summary-dish">
                      {item.dish}
                      <span className="ck__summary-qty"> ×{item.quantity || 1}</span>
                    </span>
                    <span className="ck__summary-price">
                      {fmt(item.price * (item.quantity || 1))}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="ck__summary-totals" aria-live="polite" aria-atomic="true">
                <div className="ck__total-row">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="ck__total-row">
                  <span>Delivery Fee</span>
                  <span>{fmt(deliveryFee)}</span>
                </div>
                <div className="ck__total-row">
                  <span>Service Fee <span className="ck__fee-hint">(5%)</span></span>
                  <span>{fmt(platformFee)}</span>
                </div>
                <div className="ck__total-divider" aria-hidden="true"></div>
                <div className="ck__total-row ck__total-row--grand">
                  <span>Total</span>
                  <span className="ck__grand-total">{fmt(total)}</span>
                </div>
              </div>

              {/* Confirm button */}
              <button
                className={`ck__confirm-btn${loading ? " loading" : ""}`}
                onClick={handleConfirmOrder}
                disabled={loading}
                type="button"
                aria-busy={loading}
                aria-label={loading ? "Processing order…" : `Confirm and pay ${fmt(total)}`}
              >
                {loading ? (
                  <>
                    <span className="ck__spinner" aria-hidden="true"></span>
                    Processing…
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock" aria-hidden="true"></i>
                    Confirm & Pay {fmt(total)}
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </>
                )}
              </button>

              {/* Validation nudge */}
              {!isFormValid && (submitted || Object.keys(touched).length > 0) && (
                <p className="ck__validation-nudge" role="alert">
                  <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                  Please fill in all required fields correctly.
                </p>
              )}

              <p className="ck__secure-note">
                <i className="fas fa-shield-alt" aria-hidden="true"></i>
                Your order and details are safe with us
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}