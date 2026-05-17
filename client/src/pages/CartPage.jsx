import { useState, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/cartpage.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) => `₦${Number(n).toLocaleString()}`;

// ── Quantity control ──────────────────────────────────────────────────────────
function QtyControl({ item, onDecrement, onIncrement }) {
  return (
    <div className="cp__qty" role="group" aria-label={`Quantity for ${item.dish}`}>
      <button
        className="cp__qty-btn"
        onClick={onDecrement}
        disabled={(item.quantity || 1) <= 1}
        aria-label={`Decrease quantity of ${item.dish}`}
        type="button"
      >
        <i className="fas fa-minus" aria-hidden="true"></i>
      </button>
      <span
        className="cp__qty-val"
        aria-live="polite"
        aria-atomic="true"
      >
        {item.quantity || 1}
      </span>
      <button
        className="cp__qty-btn"
        onClick={onIncrement}
        aria-label={`Increase quantity of ${item.dish}`}
        type="button"
      >
        <i className="fas fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  );
}

// ── Clear cart confirmation modal ─────────────────────────────────────────────
function ClearCartModal({ onConfirm, onClose }) {
  return (
    <div
      className="cp__modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cp-clear-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="cp__modal-box">
        <h2 className="cp__modal-title" id="cp-clear-title">
          <i className="fas fa-trash-alt" aria-hidden="true"></i>
          Clear Cart?
        </h2>
        <p className="cp__modal-text">
          This will remove all items. This cannot be undone.
        </p>
        <div className="cp__modal-actions">
          <button className="cp__modal-keep" onClick={onClose} type="button">
            Keep Items
          </button>
          <button className="cp__modal-confirm" onClick={onConfirm} type="button">
            Yes, Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CartPage() {
  const { cart, removeItem, clearCart, updateQuantity } = useCart();
  const [showClearModal, setShowClearModal] = useState(false);
  const [removingId,     setRemovingId]     = useState(null);

  const subtotal    = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 500 : 0;
  const platformFee = Math.round(subtotal * 0.05);
  const total       = subtotal + deliveryFee + platformFee;

  const restaurantName = cart[0]?.restaurant ?? "";

  const handleRemove = useCallback((id) => {
    setRemovingId(id);
    setTimeout(() => { removeItem(id); setRemovingId(null); }, 300);
  }, [removeItem]);

  const handleClearConfirm = useCallback(() => {
    clearCart();
    setShowClearModal(false);
  }, [clearCart]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="cp cp--empty" aria-labelledby="cp-empty-heading">
        <div className="cp__empty-inner">
          <div className="cp__empty-icon" aria-hidden="true">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <h1 className="cp__empty-title" id="cp-empty-heading">
            Your cart is empty
          </h1>
          <p className="cp__empty-sub">
            Browse restaurants and add your favourite dishes.
          </p>
          <Link to="/restaurants" className="cp__empty-cta">
            <i className="fas fa-store" aria-hidden="true"></i>
            Browse Restaurants
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cp" id="cart-page" aria-labelledby="cp-heading">
      <div className="cp__inner">

        {/* ── Header ── */}
        <div className="cp__header">
          <div>
            <span className="cp__eyebrow">
              <i className="fas fa-shopping-bag" aria-hidden="true"></i>
              {cart.length} item{cart.length !== 1 ? "s" : ""}
            </span>
            <h1 className="cp__title" id="cp-heading">Your Cart</h1>
            {restaurantName && (
              <p className="cp__restaurant">
                <i className="fas fa-store" aria-hidden="true"></i>
                Ordering from <strong>{restaurantName}</strong>
              </p>
            )}
          </div>
          <Link to="/restaurants" className="cp__continue-link">
            <i className="fas fa-plus" aria-hidden="true"></i>
            Add more items
          </Link>
        </div>

        <div className="cp__layout">

          {/* ── Cart items ── */}
          <div className="cp__items-wrap">
            <ul className="cp__items" aria-label={`Cart items from ${restaurantName}`}>
              {cart.map((item) => {
                const key       = item.id || `${item.dish}-${item.restaurant}`;
                const itemTotal = item.price * (item.quantity || 1);
                const removing  = removingId === item.id;
                return (
                  <li
                    key={key}
                    className={`cp__item${removing ? " cp__item--removing" : ""}`}
                    aria-label={`${item.dish} — ${fmt(itemTotal)}`}
                  >
                    <div className="cp__item-info">
                      <span className="cp__dish">{item.dish}</span>
                      <span className="cp__from">from {item.restaurant}</span>
                      <span className="cp__unit-price">{fmt(item.price)} each</span>
                    </div>

                    <div className="cp__item-controls">
                      <QtyControl
                        item={item}
                        onDecrement={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        onIncrement={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      />
                      <span className="cp__item-total" aria-label={`Subtotal: ${fmt(itemTotal)}`}>
                        {fmt(itemTotal)}
                      </span>
                      <button
                        className="cp__remove-btn"
                        onClick={() => handleRemove(item.id)}
                        aria-label={`Remove ${item.dish} from cart`}
                        type="button"
                      >
                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cp__clear-wrap">
              <button
                className="cp__clear-btn"
                onClick={() => setShowClearModal(true)}
                type="button"
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Order summary ── */}
          <aside className="cp__summary" aria-label="Order summary">
            <h2 className="cp__summary-title">
              <i className="fas fa-receipt" aria-hidden="true"></i>
              Order Summary
            </h2>

            <div className="cp__summary-rows" aria-live="polite" aria-atomic="true">
              <div className="cp__summary-row">
                <span>Subtotal</span>
                <span className="cp__summary-val">{fmt(subtotal)}</span>
              </div>
              <div className="cp__summary-row">
                <span>Delivery Fee</span>
                <span className="cp__summary-val">{fmt(deliveryFee)}</span>
              </div>
              <div className="cp__summary-row">
                <span>
                  Service Fee
                  <span className="cp__fee-hint"> (5%)</span>
                </span>
                <span className="cp__summary-val">{fmt(platformFee)}</span>
              </div>
              <div className="cp__summary-divider" aria-hidden="true"></div>
              <div className="cp__summary-row cp__summary-row--total">
                <span>Total</span>
                <span className="cp__summary-total">{fmt(total)}</span>
              </div>
            </div>

            <p className="cp__secure-note">
              <i className="fas fa-shield-alt" aria-hidden="true"></i>
              Secure checkout — your order is protected
            </p>

            <Link to="/checkout" className="cp__checkout-btn">
              <i className="fas fa-lock" aria-hidden="true"></i>
              Proceed to Checkout
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </Link>

            <a
              href={`https://wa.me/2348000000000?text=Hi, I'd like to order from ${encodeURIComponent(restaurantName)}`}
              className="cp__whatsapp-alt"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Order via WhatsApp"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              Or order via WhatsApp
            </a>
          </aside>
        </div>
      </div>

      {showClearModal && (
        <ClearCartModal
          onConfirm={handleClearConfirm}
          onClose={() => setShowClearModal(false)}
        />
      )}
    </main>
  );
}