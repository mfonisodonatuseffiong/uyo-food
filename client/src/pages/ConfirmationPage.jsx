import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/confirmation.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt     = (n) => `₦${Number(n).toLocaleString()}`;
const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-NG", {
      weekday: "short", day: "numeric", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch { return ""; }
};

const PAYMENT_LABELS = {
  whatsapp: "WhatsApp Coordination",
  transfer: "Bank Transfer",
  card:     "Card Payment",
};

// ── CSS-only confetti ─────────────────────────────────────────────────────────
// Lightweight — no library needed
const CONFETTI_COLORS = ["#006400","#E8431A","#FFB30E","#fff","#4caf50","#ff6b35"];
const CONFETTI_COUNT  = 60;

function Confetti({ active }) {
  const pieces = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id:    i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left:  `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    dur:   `${2.5 + Math.random() * 2}s`,
    size:  `${6 + Math.random() * 8}px`,
    rotate:`${Math.random() * 360}deg`,
  }));

  if (!active) return null;
  return (
    <div className="cf__wrap" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="cf__piece"
          style={{
            left:             p.left,
            width:            p.size,
            height:           p.size,
            background:       p.color,
            animationDelay:   p.delay,
            animationDuration: p.dur,
            transform:        `rotate(${p.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // FIX: get order data from router state (set by CheckoutPage)
  const order = location.state?.order ?? null;

  const [confetti,   setConfetti]   = useState(true);
  const [copied,     setCopied]     = useState(false);
  const printRef = useRef(null);

  // Stop confetti after 5s
  useEffect(() => {
    const id = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(id);
  }, []);

  // Copy order ID to clipboard
  const handleCopy = async () => {
    if (!order?.id) return;
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — select text
    }
  };

  // Print receipt
  const handlePrint = () => window.print();

  // Build QR URL from order ID
  const qrUrl = order?.id
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(order.id)}&bgcolor=ffffff&color=006400`
    : null;

  // ── Fallback — no order data (direct navigation / refresh) ────────────────
  if (!order) {
    return (
      <main className="conf conf--fallback" aria-labelledby="conf-fallback-heading">
        <div className="conf__fallback-inner">
          <i className="fas fa-receipt" aria-hidden="true"></i>
          <h1 id="conf-fallback-heading">No order found</h1>
          <p>
            This page is only accessible right after placing an order.
            If you just ordered, please check your WhatsApp for confirmation.
          </p>
          <div className="conf__fallback-actions">
            <Link to="/restaurants" className="conf__btn-primary">
              <i className="fas fa-store" aria-hidden="true"></i>
              Browse Restaurants
            </Link>
            <Link to="/tracking" className="conf__btn-secondary">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              Track an Order
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="conf"
      id="confirmation-page"
      aria-labelledby="conf-heading"
      ref={printRef}
    >
      <Confetti active={confetti} />

      <div className="conf__inner">

        {/* ── Success banner ── */}
        <div className="conf__banner">
          <div className="conf__check-circle" aria-hidden="true">
            <i className="fas fa-check"></i>
          </div>
          <div>
            <h1 className="conf__title" id="conf-heading">
              Order Confirmed! 🎉
            </h1>
            <p className="conf__subtitle">
              Thank you, <strong>{order.customer?.name}</strong>! Your order from{" "}
              <strong>{order.restaurant}</strong> has been placed successfully.
            </p>
          </div>
        </div>

        <div className="conf__layout">

          {/* ── Left: order receipt ── */}
          <div className="conf__receipt">

            {/* Order ID row */}
            <div className="conf__id-row">
              <div>
                <span className="conf__id-label">Order ID</span>
                <span className="conf__id-val">#{order.id}</span>
              </div>
              <button
                className="conf__copy-btn"
                onClick={handleCopy}
                type="button"
                aria-label="Copy order ID"
              >
                <i className={`fas ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true"></i>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Order meta */}
            <div className="conf__meta-grid">
              <div className="conf__meta-item">
                <span className="conf__meta-label">
                  <i className="fas fa-store" aria-hidden="true"></i> Restaurant
                </span>
                <span className="conf__meta-val">{order.restaurant}</span>
              </div>
              <div className="conf__meta-item">
                <span className="conf__meta-label">
                  <i className="fas fa-clock" aria-hidden="true"></i> Placed at
                </span>
                <span className="conf__meta-val">{fmtDate(order.placedAt)}</span>
              </div>
              <div className="conf__meta-item">
                <span className="conf__meta-label">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Delivering to
                </span>
                <span className="conf__meta-val">{order.customer?.address}</span>
              </div>
              <div className="conf__meta-item">
                <span className="conf__meta-label">
                  <i className="fas fa-wallet" aria-hidden="true"></i> Payment
                </span>
                <span className="conf__meta-val">
                  {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
                </span>
              </div>
              {order.notes && (
                <div className="conf__meta-item conf__meta-item--full">
                  <span className="conf__meta-label">
                    <i className="fas fa-sticky-note" aria-hidden="true"></i> Notes
                  </span>
                  <span className="conf__meta-val">{order.notes}</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="conf__items-section">
              <h2 className="conf__section-title">
                <i className="fas fa-utensils" aria-hidden="true"></i>
                Items Ordered
              </h2>
              <ul className="conf__items" aria-label="Items ordered">
                {order.items?.map((item, idx) => (
                  <li key={item.id || `${item.dish}-${idx}`} className="conf__item">
                    <span className="conf__item-name">
                      {item.dish}
                      <span className="conf__item-qty"> ×{item.quantity || 1}</span>
                    </span>
                    <span className="conf__item-price">
                      {fmt(item.price * (item.quantity || 1))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Totals */}
            <div className="conf__totals" aria-label="Order totals" aria-live="polite">
              <div className="conf__total-row">
                <span>Subtotal</span>
                <span>{fmt(order.subtotal)}</span>
              </div>
              <div className="conf__total-row">
                <span>Delivery Fee</span>
                <span>{fmt(order.deliveryFee)}</span>
              </div>
              <div className="conf__total-row">
                <span>Service Fee <span className="conf__fee-hint">(5%)</span></span>
                <span>{fmt(order.platformFee)}</span>
              </div>
              <div className="conf__total-divider" aria-hidden="true"></div>
              <div className="conf__total-row conf__total-row--grand">
                <span>Total Paid</span>
                <span className="conf__grand-total">{fmt(order.total)}</span>
              </div>
            </div>

          </div>

          {/* ── Right: QR + actions ── */}
          <div className="conf__sidebar">

            {/* QR code */}
            {qrUrl && (
              <div className="conf__qr-card">
                <h2 className="conf__qr-title">
                  <i className="fas fa-qrcode" aria-hidden="true"></i>
                  Order QR Code
                </h2>
                <img
                  src={qrUrl}
                  alt={`QR code for order ${order.id}`}
                  className="conf__qr-img"
                  width="160"
                  height="160"
                />
                <p className="conf__qr-note">
                  Show this to the rider to verify your order.
                </p>
              </div>
            )}

            {/* WhatsApp reminder if payment method is WhatsApp */}
            {order.paymentMethod === "whatsapp" && (
              <div className="conf__wa-reminder">
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
                <div>
                  <strong>Check WhatsApp</strong>
                  <p>Your order summary has been sent. The restaurant will confirm shortly.</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="conf__actions">
              <Link to="/tracking" className="conf__btn-primary">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                Track My Order
              </Link>
              <button
                className="conf__btn-print"
                onClick={handlePrint}
                type="button"
                aria-label="Print this receipt"
              >
                <i className="fas fa-print" aria-hidden="true"></i>
                Print Receipt
              </button>
              <Link to="/restaurants" className="conf__btn-secondary">
                <i className="fas fa-utensils" aria-hidden="true"></i>
                Order Again
              </Link>
            </div>

            {/* Estimated delivery */}
            <div className="conf__eta">
              <i className="fas fa-motorcycle" aria-hidden="true"></i>
              <div>
                <span className="conf__eta-label">Estimated Delivery</span>
                <span className="conf__eta-val">25 – 40 minutes</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}