import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import OrderTypeModal from "../components/OrderTypeModal";
import "../styles/restaurantdetail.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
function isOpen(r) {
  if (!r.isOpen) return false;
  try {
    const now     = new Date();
    const [oH,oM] = r.openingTime.split(":").map(Number);
    const [cH,cM] = r.closingTime.split(":").map(Number);
    const cur     = now.getHours() * 60 + now.getMinutes();
    return cur >= oH * 60 + oM && cur < cH * 60 + cM;
  } catch { return r.isOpen; }
}

function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="rd__stars" aria-hidden="true">
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(empty)}
    </span>
  );
}

// Placeholder reviews — replace with real API data when backend is ready
const PLACEHOLDER_REVIEWS = [
  { id: 1, author: "Blessing A.",    stars: 5, text: "Great food and fast delivery! The Afang soup was exactly like home cooking.", date: "2 days ago"  },
  { id: 2, author: "Emeka O.",       stars: 4, text: "Loved the portions — very filling. Will definitely order again.",             date: "1 week ago" },
  { id: 3, author: "Favour U.",      stars: 5, text: "Best local food in Uyo. Always fresh, always on time.",                      date: "2 weeks ago"},
];

// ── Quantity control ──────────────────────────────────────────────────────────
function QtyControl({ value, onDecrement, onIncrement, min = 0, max = 99 }) {
  return (
    <div className="rd__qty" role="group" aria-label="Quantity">
      <button
        className="rd__qty-btn"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        type="button"
      >
        <i className="fas fa-minus" aria-hidden="true"></i>
      </button>
      <span className="rd__qty-val" aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        className="rd__qty-btn"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        type="button"
      >
        <i className="fas fa-plus" aria-hidden="true"></i>
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RestaurantDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { cart, addItem, updateQuantity } = useCart();
  const pageRef      = useRef(null);

  // FIX: find by restaurant.id (string) not array index
  const restaurant = useMemo(
    () => restaurants.find((r) => r.id === id),
    [id]
  );

  const openNow = restaurant ? isOpen(restaurant) : false;

  // Per-item local quantity state (for the "add to cart" flow)
  const [quantities,   setQuantities]  = useState({});
  const [notification, setNote]        = useState(null);
  const [addedMap,     setAddedMap]    = useState({});
  const [modalOpen,    setModalOpen]   = useState(false);
  const [orderType,    setOrderType]   = useState("delivery");

  const showNote = useCallback((msg, type = "success") => {
    setNote({ msg, type });
    setTimeout(() => setNote(null), 3500);
  }, []);

  // Get quantity already in cart for a given dish
  const cartQty = useCallback((dishName) => {
    const found = cart.find(
      (i) => i.restaurant === restaurant?.name && i.dish === dishName
    );
    return found?.quantity ?? 0;
  }, [cart, restaurant]);

  // FIX: cart conflict guard
  const handleAdd = useCallback((item, qty = 1) => {
    if (!openNow) {
      showNote(`${restaurant.name} is currently closed.`, "warn");
      return;
    }
    if (cart.length > 0) {
      const current = cart[0].restaurant;
      if (current !== restaurant.name) {
        showNote(`Clear your cart from "${current}" before ordering here.`, "warn");
        return;
      }
    }
    const localQty = quantities[item.id] ?? 1;
    addItem({
      restaurant: restaurant.name,
      dish:       item.name,
      price:      item.price,
      quantity:   qty || localQty,
    });
    // Flash added state
    setAddedMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedMap((prev) => { const n = {...prev}; delete n[item.id]; return n; }), 1800);
    showNote(`${item.name} added to cart ✓`);
    // Reset local qty
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  }, [openNow, cart, restaurant, quantities, addItem, showNote]);

  const setQty = useCallback((itemId, val) => {
    setQuantities((prev) => ({ ...prev, [itemId]: Math.max(1, val) }));
  }, []);

  // IntersectionObserver animations
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const targets = page.querySelectorAll(".rd__animate");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { targets.forEach((el) => el.classList.add("rd__visible")); return; }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("rd__visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [restaurant]);

  // ── 404 state ──
  if (!restaurant) {
    return (
      <main className="rd__not-found" aria-labelledby="rd-404-heading">
        <div className="rd__not-found-inner">
          <i className="fas fa-store" aria-hidden="true"></i>
          <h1 id="rd-404-heading">Restaurant not found</h1>
          <p>This restaurant may have moved or no longer be available.</p>
          <Link to="/restaurants" className="rd__back-btn">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Back to Restaurants
          </Link>
        </div>
      </main>
    );
  }

  const cartCount = cart.reduce((s, i) => s + (i.quantity ?? 1), 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0);

  return (
    <main
      className="rd"
      id="restaurant-detail"
      aria-labelledby="rd-heading"
      ref={pageRef}
    >

      {/* ── Hero banner ── */}
      <div className="rd__hero">
        <img
          src={restaurant.image}
          alt={`${restaurant.name} — ${restaurant.category} restaurant in Uyo`}
          className="rd__hero-img"
          width="1200"
          height="400"
          fetchpriority="high"
        />
        <div className="rd__hero-overlay" aria-hidden="true"></div>
        <div className="rd__hero-content">
          <span className="rd__hero-cat">{restaurant.category}</span>
          <h1 className="rd__hero-name" id="rd-heading">{restaurant.name}</h1>
          <p className="rd__hero-tagline">{restaurant.description}</p>
          <div className="rd__hero-meta">
            <span>
              <StarRating rating={restaurant.rating} />
              <span className="rd__hero-rating-val" aria-label={`Rated ${restaurant.rating} out of 5`}>
                {restaurant.rating}
              </span>
            </span>
            <span className="rd__hero-dot" aria-hidden="true">·</span>
            <span>
              <i className="fas fa-clock" aria-hidden="true"></i>
              {restaurant.baseDeliveryTime} min delivery
            </span>
            <span className="rd__hero-dot" aria-hidden="true">·</span>
            <span className={`rd__hero-status${openNow ? " open" : " closed"}`}>
              {openNow ? "● Open now" : "● Closed"}
            </span>
            {restaurant.supportsPickup && (
              <>
                <span className="rd__hero-dot" aria-hidden="true">·</span>
                <span>
                  <i className="fas fa-walking" aria-hidden="true"></i> Pickup available
                </span>
              </>
            )}
          </div>
        </div>
        {/* Back button */}
        <Link to="/restaurants" className="rd__hero-back" aria-label="Back to restaurants">
          <i className="fas fa-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>

      {/* ── Info bar ── */}
      <div className="rd__infobar rd__animate">
        <div className="rd__infobar-inner">
          <div className="rd__infobar-address">
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            <div>
              <span className="rd__infobar-label">Ordering from</span>
              <span className="rd__infobar-val">{restaurant.address || "Uyo, Akwa Ibom"}</span>
            </div>
          </div>
          <div className="rd__infobar-hours">
            <i className="fas fa-door-open" aria-hidden="true"></i>
            <div>
              <span className="rd__infobar-label">Hours</span>
              <span className="rd__infobar-val">
                {restaurant.openingTime} – {restaurant.closingTime}
              </span>
            </div>
          </div>
          {/* Action buttons */}
          <div className="rd__infobar-actions">
            {/* Change Outlet — opens modal to switch restaurant */}
            <button
              className="rd__change-outlet-btn"
              onClick={() => setModalOpen(true)}
              type="button"
              aria-label="Switch to a different restaurant"
            >
              <i className="fas fa-exchange-alt" aria-hidden="true"></i>
              Change Outlet
            </button>

            {/* WhatsApp direct order */}
            <a
              href={`https://wa.me/2348000000000?text=Hi, I'd like to order from ${encodeURIComponent(restaurant.name)}`}
              className="rd__whatsapp-btn"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Order from ${restaurant.name} via WhatsApp`}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="rd__inner">

        {/* ── Menu section ── */}
        <section aria-labelledby="rd-menu-heading">
          <div className="rd__section-header rd__animate" style={{ "--delay": "0.05s" }}>
            <h2 className="rd__section-title" id="rd-menu-heading">
              <i className="fas fa-utensils" aria-hidden="true"></i>
              Menu
            </h2>
            <span className="rd__section-count">
              {restaurant.menu.length} item{restaurant.menu.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div
            className="rd__menu-grid"
            role="list"
            aria-label={`Menu for ${restaurant.name}`}
          >
            {restaurant.menu.map((item, idx) => {
              const inCart  = cartQty(item.name);
              const added   = !!addedMap[item.id];
              const localQty = quantities[item.id] ?? 1;

              return (
                <article
                  key={item.id}
                  className="rd__menu-card rd__animate"
                  role="listitem"
                  style={{ "--delay": `${idx * 0.07}s` }}
                  aria-label={`${item.name} — ₦${item.price.toLocaleString()}`}
                >
                  {/* Image */}
                  <div className="rd__menu-img-wrap">
                    <img
                      src={item.image || restaurant.image}
                      alt={`${item.name} from ${restaurant.name}`}
                      className="rd__menu-img"
                      width="300"
                      height="180"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                    {/* In-cart indicator */}
                    {inCart > 0 && (
                      <span className="rd__in-cart" aria-label={`${inCart} in cart`}>
                        {inCart} in cart
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="rd__menu-body">
                    <h3 className="rd__menu-name">{item.name}</h3>
                    <p className="rd__menu-price" aria-label={`Price: ₦${item.price.toLocaleString()}`}>
                      ₦{item.price.toLocaleString()}
                    </p>

                    {/* Quantity + Add */}
                    <div className="rd__menu-actions">
                      <QtyControl
                        value={localQty}
                        onDecrement={() => setQty(item.id, localQty - 1)}
                        onIncrement={() => setQty(item.id, localQty + 1)}
                        min={1}
                      />
                      <button
                        className={`rd__add-btn${added ? " added" : ""}${!openNow ? " closed" : ""}`}
                        onClick={() => handleAdd(item, localQty)}
                        disabled={!openNow}
                        type="button"
                        aria-label={
                          openNow
                            ? `Add ${localQty} ${item.name} to cart`
                            : `${restaurant.name} is closed`
                        }
                      >
                        {added ? (
                          <><i className="fas fa-check" aria-hidden="true"></i> Added!</>
                        ) : openNow ? (
                          <><i className="fas fa-cart-plus" aria-hidden="true"></i> Add to Cart</>
                        ) : (
                          <><i className="fas fa-clock" aria-hidden="true"></i> Closed</>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Reviews section ── */}
        <section aria-labelledby="rd-reviews-heading" className="rd__reviews-section">
          <div className="rd__section-header rd__animate" style={{ "--delay": "0.1s" }}>
            <h2 className="rd__section-title" id="rd-reviews-heading">
              <i className="fas fa-star" aria-hidden="true"></i>
              Reviews
            </h2>
            <span className="rd__section-count">
              {PLACEHOLDER_REVIEWS.length} reviews
            </span>
          </div>

          <div className="rd__reviews-grid rd__animate" style={{ "--delay": "0.15s" }}>
            {PLACEHOLDER_REVIEWS.map((rev) => (
              <div key={rev.id} className="rd__review-card">
                <div className="rd__review-header">
                  <div className="rd__review-avatar" aria-hidden="true">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <span className="rd__review-author">{rev.author}</span>
                    <span className="rd__review-date">{rev.date}</span>
                  </div>
                  <div
                    className="rd__review-stars"
                    aria-label={`${rev.stars} out of 5 stars`}
                  >
                    {"★".repeat(rev.stars)}{"☆".repeat(5 - rev.stars)}
                  </div>
                </div>
                <p className="rd__review-text">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Sticky cart bar — shows when cart has items ── */}
      {cartCount > 0 && (
        <div className="rd__cart-bar" role="status" aria-live="polite">
          <div className="rd__cart-bar-inner">
            <span className="rd__cart-bar-info">
              <i className="fas fa-shopping-bag" aria-hidden="true"></i>
              <strong>{cartCount}</strong> item{cartCount !== 1 ? "s" : ""} · ₦{cartTotal.toLocaleString()}
            </span>
            <Link to="/cart" className="rd__cart-bar-btn">
              View Cart
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      )}

      {/* ── Toast notification ── */}
      {notification && (
        <div
          className={`rd__toast${notification.type === "warn" ? " rd__toast--warn" : ""}`}
          role="status"
          aria-live="polite"
        >
          <i className={`fas ${notification.type === "warn" ? "fa-exclamation-circle" : "fa-check-circle"}`} aria-hidden="true"></i>
          {notification.msg}
        </div>
      )}

      {/* ── Change outlet modal ── */}
      <OrderTypeModal
        isOpen={modalOpen}
        orderType={orderType}
        setOrderType={setOrderType}
        onClose={() => setModalOpen(false)}
        defaultOutlet={restaurant.name}
      />
    </main>
  );
}