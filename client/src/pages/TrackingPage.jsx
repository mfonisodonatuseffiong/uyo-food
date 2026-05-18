import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/trackingpage.css";

// ── Constants ─────────────────────────────────────────────────────────────────
const STEPS = [
  { key: "placed",    label: "Order Placed",     icon: "fas fa-receipt",      desc: "Your order has been received by the restaurant."  },
  { key: "preparing", label: "Preparing",         icon: "fas fa-fire-burner",  desc: "The kitchen is preparing your meal."              },
  { key: "pickup",    label: "Out for Delivery",  icon: "fas fa-motorcycle",   desc: "Your rider is on the way to you."                 },
  { key: "delivered", label: "Delivered",          icon: "fas fa-check-circle", desc: "Your order has arrived. Enjoy your meal!"        },
];

const DELIVERY_MINUTES  = 15;
const CANCEL_WINDOW_SEC = 5 * 60;

const pad        = (n) => String(n).padStart(2, "0");
const fmt        = (n) => `₦${Number(n).toLocaleString()}`;
const formatTime = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

// ── Cancel modal ──────────────────────────────────────────────────────────────
function CancelModal({ onConfirm, onClose, cancelling }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="tp__modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tp-cancel-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="tp__modal-box">
        <div className="tp__modal-header">
          <h2 className="tp__modal-title" id="tp-cancel-title">
            <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
            Cancel Order?
          </h2>
          <button className="tp__modal-close" onClick={onClose} aria-label="Close" type="button">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="tp__modal-body">
          <p>Are you sure you want to cancel this order?</p>
          <p className="tp__modal-note">
            Refunds are processed within 5–7 business days.
          </p>
        </div>
        <div className="tp__modal-footer">
          <button className="tp__modal-keep" onClick={onClose} type="button">Keep Order</button>
          <button className="tp__modal-confirm" onClick={onConfirm} disabled={cancelling} type="button">
            {cancelling
              ? <><span className="tp__spinner" aria-hidden="true"></span> Cancelling…</>
              : "Yes, Cancel"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TrackingPage() {
  const location               = useLocation();
  const { orderId: paramId }   = useParams();

  const order   = location.state?.order ?? null;
  const orderId = order?.id ?? paramId ?? null;

  const [currentStep,  setStep]        = useState(0);
  const [timeLeft,     setTimeLeft]    = useState(DELIVERY_MINUTES * 60);
  const [showModal,    setShowModal]   = useState(false);
  const [cancelling,   setCancelling]  = useState(false);
  const [cancelled,    setCancelled]   = useState(false);
  const [cancelStatus, setCancelStatus]= useState(null);

  const isDelivered = currentStep === STEPS.length - 1;

  // Simulate progression — replace with WebSocket / polling when backend ready
  useEffect(() => {
    if (cancelled) return;
    const ids = [
      setTimeout(() => setStep(1), 8_000),
      setTimeout(() => setStep(2), 25_000),
      setTimeout(() => setStep(3), DELIVERY_MINUTES * 60_000),
    ];
    return () => ids.forEach(clearTimeout);
  }, [cancelled]);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0 || isDelivered || cancelled) return;
    const id = setInterval(() => setTimeLeft((p) => Math.max(0, p - 1)), 1_000);
    return () => clearInterval(id);
  }, [timeLeft, isDelivered, cancelled]);

  const elapsed        = DELIVERY_MINUTES * 60 - timeLeft;
  const canCancel      = elapsed <= CANCEL_WINDOW_SEC && currentStep < 2 && !cancelled;
  const cancelTimeLeft = Math.max(0, CANCEL_WINDOW_SEC - elapsed);
  const progressPct    = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const handleCancelOrder = useCallback(async () => {
    setCancelling(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // replace with real API
      setCancelled(true);
      setCancelStatus("success");
    } catch {
      setCancelStatus("error");
    } finally {
      setCancelling(false);
      setShowModal(false);
    }
  }, []);

  // ── Cancelled state ────────────────────────────────────────────────────────
  if (cancelled && cancelStatus === "success") {
    return (
      <main className="tp tp--cancelled" aria-labelledby="tp-cancelled-heading">
        <div className="tp__cancelled-inner">
          <div className="tp__cancelled-icon" aria-hidden="true">
            <i className="fas fa-times-circle"></i>
          </div>
          <h1 id="tp-cancelled-heading">Order Cancelled</h1>
          {orderId && <p>Order <strong>#{orderId}</strong> has been cancelled.</p>}
          <p className="tp__cancelled-note">
            A refund will be processed within 5–7 business days.
          </p>
          <div className="tp__cancelled-actions">
            <Link to="/restaurants" className="tp__btn-primary">
              <i className="fas fa-store" aria-hidden="true"></i> Order Again
            </Link>
            <Link to="/help-support" className="tp__btn-secondary">
              <i className="fas fa-headset" aria-hidden="true"></i> Contact Support
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="tp" id="tracking-page" aria-labelledby="tp-heading">
      <div className="tp__inner">

        {/* ── Header ── */}
        <div className="tp__header">
          <span className="tp__eyebrow">
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            Live Tracking
          </span>
          <h1 className="tp__title" id="tp-heading">Order Tracking</h1>
          {orderId && (
            <p className="tp__order-id">
              Order <strong>#{orderId}</strong>
              {order?.restaurant && <> · <strong>{order.restaurant}</strong></>}
            </p>
          )}
        </div>

        <div className="tp__layout">

          {/* ── Left: tracking ── */}
          <div className="tp__main-col">

            {/* Countdown */}
            <div
              className={`tp__countdown${isDelivered ? " tp__countdown--done" : ""}`}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="tp__countdown-icon" aria-hidden="true">
                <i className={isDelivered ? "fas fa-check-circle" : "fas fa-clock"}></i>
              </div>
              <div>
                <span className="tp__countdown-label">
                  {isDelivered ? "Delivered!" : "Estimated delivery in"}
                </span>
                {!isDelivered && (
                  <span className="tp__countdown-time" aria-hidden="true">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="tp__progress-wrap"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Order progress: ${STEPS[currentStep].label}`}
            >
              <div className="tp__progress-bar" style={{ width: `${progressPct}%` }}>
                <span aria-hidden="true">{STEPS[currentStep].label}</span>
              </div>
            </div>

            {/* Step tracker */}
            <div className="tp__steps" role="list" aria-label="Order progress steps">
              {STEPS.map((step, idx) => {
                const done   = idx < currentStep;
                const active = idx === currentStep;
                return (
                  <div
                    key={step.key}
                    className={`tp__step${done ? " done" : ""}${active ? " active" : ""}`}
                    role="listitem"
                    aria-label={`${step.label}: ${done ? "complete" : active ? "in progress" : "pending"}`}
                  >
                    {idx < STEPS.length - 1 && (
                      <div className={`tp__step-connector${done ? " done" : ""}`} aria-hidden="true"></div>
                    )}
                    <div className="tp__step-circle" aria-hidden="true">
                      {done ? <i className="fas fa-check"></i> : <i className={step.icon}></i>}
                    </div>
                    <div className="tp__step-content">
                      <span className="tp__step-label">{step.label}</span>
                      {(done || active) && (
                        <span className="tp__step-desc">{step.desc}</span>
                      )}
                    </div>
                    {active && <span className="tp__step-badge" aria-hidden="true">In Progress</span>}
                    {done  && <span className="tp__step-badge tp__step-badge--done" aria-hidden="true">Done ✓</span>}
                  </div>
                );
              })}
            </div>

            {/* Cancel section */}
            {currentStep < 2 && !cancelled && (
              <div className="tp__cancel-section">
                {canCancel ? (
                  <>
                    <div className="tp__cancel-info">
                      <i className="fas fa-clock" aria-hidden="true"></i>
                      Cancel window closes in <strong>{formatTime(cancelTimeLeft)}</strong>
                    </div>
                    <button
                      className="tp__cancel-btn"
                      onClick={() => setShowModal(true)}
                      type="button"
                    >
                      <i className="fas fa-times-circle" aria-hidden="true"></i>
                      Cancel Order
                    </button>
                  </>
                ) : (
                  <p className="tp__cancel-expired">
                    <i className="fas fa-lock" aria-hidden="true"></i>
                    Cancellation window expired.
                  </p>
                )}
                <Link to="/refund" className="tp__refund-link">View Refund Policy</Link>
              </div>
            )}

            {cancelStatus === "error" && (
              <div className="tp__cancel-error" role="alert">
                <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                Could not cancel. <Link to="/help-support" className="tp__support-link">Contact support</Link>
              </div>
            )}

            {/* WhatsApp contact */}
            <a
              href={`https://wa.me/2348000000000?text=Hi, question about order ${encodeURIComponent(orderId ?? "")}`}
              className="tp__whatsapp-contact"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              Need help? Chat with us on WhatsApp
            </a>
          </div>

          {/* ── Right: map + order summary ── */}
          <div className="tp__side-col">

            {/* Map */}
            <div className="tp__map-card">
              <h2 className="tp__map-title">
                <i className="fas fa-map" aria-hidden="true"></i>
                Live Map
              </h2>
              <div className="tp__map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Uyo,Akwa+Ibom,Nigeria"
                  title="Delivery location map"
                  allowFullScreen
                  loading="lazy"
                  className="tp__map-iframe"
                ></iframe>
                <div className="tp__map-overlay" aria-hidden="true">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Replace YOUR_API_KEY for live map</span>
                </div>
              </div>
              <p className="tp__map-note">
                <i className="fas fa-info-circle" aria-hidden="true"></i>
                Real-time rider location will appear once a rider is assigned.
              </p>
            </div>

            {/* Order summary */}
            {order && (
              <div className="tp__order-summary">
                <h2 className="tp__summary-title">
                  <i className="fas fa-receipt" aria-hidden="true"></i>
                  Your Order
                </h2>
                <ul className="tp__summary-items">
                  {order.items?.map((item, idx) => (
                    <li key={item.id || idx} className="tp__summary-item">
                      <span>{item.dish} ×{item.quantity || 1}</span>
                      <span>{fmt(item.price * (item.quantity || 1))}</span>
                    </li>
                  ))}
                </ul>
                <div className="tp__summary-total">
                  <span>Total</span>
                  <span className="tp__summary-total-val">{fmt(order.total)}</span>
                </div>
                {order.customer?.address && (
                  <p className="tp__summary-address">
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    {order.customer.address}
                  </p>
                )}
              </div>
            )}

            <div className="tp__actions">
              <Link to="/restaurants" className="tp__btn-primary">
                <i className="fas fa-utensils" aria-hidden="true"></i> Order More
              </Link>
              <Link to="/" className="tp__btn-secondary">
                <i className="fas fa-home" aria-hidden="true"></i> Home
              </Link>
            </div>

          </div>
        </div>
      </div>

      {showModal && canCancel && (
        <CancelModal
          onConfirm={handleCancelOrder}
          onClose={() => setShowModal(false)}
          cancelling={cancelling}
        />
      )}
    </main>
  );
}