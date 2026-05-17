import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "../assets/images/gallery/rider2.gif";
import OrderTypeModal from "./OrderTypeModal";
import "../styles/heroBanner.css";

// ── Static data outside component — not recreated on every render ──
const HEADLINES = [
  "You don chop today?",
  "Ame adia mkpo mfin?",
  "Fresh Afang soup dey wait you!",
  "Order now, we deliver to your door.",
  "Have you eaten? Make we fix that.",
];

const STATS = [
  { value: "50+", label: "Restaurants" },
  { value: "20min", label: "Avg. Delivery" },
  { value: "5,000+", label: "Happy Customers" },
];

export default function HeroBanner() {
  const [search, setSearch] = useState("");
  const [headlineIdx, setIdx] = useState(0);
  const [orderType, setOrderType] = useState("delivery");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // ── Rotate headlines every 4 seconds ──
  useEffect(() => {
    const id = setInterval(
      () => setIdx((prev) => (prev + 1) % HEADLINES.length),
      4000
    );

    return () => clearInterval(id);
  }, []);

  // ── Clear geo error after 4s ──
  useEffect(() => {
    if (!geoError) return;

    const id = setTimeout(() => setGeoError(""), 4000);

    return () => clearTimeout(id);
  }, [geoError]);

  // ── Handlers ──
  const handleSearch = useCallback(() => {
    const q = search.trim();

    const base = q
      ? `/restaurants?search=${encodeURIComponent(q)}&type=${orderType}`
      : `/restaurants?type=${orderType}`;

    navigate(base);
  }, [search, orderType, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // FIX: geolocation with proper error handling
  const handleGeo = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setGeoLoading(false);

        navigate(
          `/restaurants?lat=${coords.latitude}&lng=${coords.longitude}&type=${orderType}`
        );
      },
      (err) => {
        setGeoLoading(false);

        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError(
              "Location access denied. Please enter your address manually."
            );
            break;

          case err.POSITION_UNAVAILABLE:
            setGeoError(
              "Location unavailable. Please enter your address manually."
            );
            break;

          default:
            setGeoError("Could not get location. Please try again.");
        }
      },
      { timeout: 8000 }
    );
  }, [orderType, navigate]);

  return (
    <section className="hero" aria-label="Hero — order food in Uyo">
      {/* Background image */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="hero__bg-img"
        fetchpriority="high"
      />

      {/* Overlays */}
      <div className="hero__overlay" aria-hidden="true"></div>
      <div className="hero__overlay-bottom" aria-hidden="true"></div>

      {/* Content */}
      <div className="hero__content">
        {/* Badge */}
        <div className="hero__badge" aria-label="Now live in Uyo">
          <span className="hero__badge-dot" aria-hidden="true"></span>
          Now live in Uyo, Akwa Ibom
        </div>

        {/* Rotating headline */}
        {/* FIX: aria-live so screen readers announce changes */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="hero__headline-wrap"
        >
          <h1 className="hero__headline" key={headlineIdx}>
            {HEADLINES[headlineIdx]}
          </h1>
        </div>

        <p className="hero__subtext">
          Order from your favourite local restaurants in Uyo —
          <span className="hero__subtext-accent">
            {" "}
            fast, fresh, and easy.
          </span>
        </p>

        {/* Delivery / Pickup toggle */}
        <div
          className="hero__toggle"
          role="group"
          aria-label="Order type"
        >
          <button
            className={`hero__toggle-btn${
              orderType === "delivery" ? " active" : ""
            }`}
            onClick={() => {
              setOrderType("delivery");
              setIsModalOpen(true);
            }}
            aria-pressed={orderType === "delivery"}
          >
            <i className="fas fa-motorcycle" aria-hidden="true"></i>
            Delivery
          </button>

          <button
            className={`hero__toggle-btn${
              orderType === "pickup" ? " active" : ""
            }`}
            onClick={() => {
              setOrderType("pickup");
              setIsModalOpen(true);
            }}
            aria-pressed={orderType === "pickup"}
          >
            <i className="fas fa-walking" aria-hidden="true"></i>
            Pick Up
          </button>
        </div>

        {/* Search bar */}
        <div className="hero__search-wrap">
          <div className="hero__search" role="search">
            <i
              className="fas fa-search hero__search-icon"
              aria-hidden="true"
            ></i>

            <input
              type="text"
              className="hero__search-input"
              placeholder="Enter a delivery address or search food…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Enter delivery address or search food"
              autoComplete="off"
            />

            {/* FIX: geo button with aria-label + loading state */}
            <button
              className={`hero__geo-btn${
                geoLoading ? " loading" : ""
              }`}
              onClick={handleGeo}
              aria-label={
                geoLoading
                  ? "Detecting location…"
                  : "Use my current location"
              }
              disabled={geoLoading}
              type="button"
            >
              {geoLoading ? (
                <i
                  className="fas fa-spinner fa-spin"
                  aria-hidden="true"
                ></i>
              ) : (
                <i
                  className="fas fa-map-marker-alt"
                  aria-hidden="true"
                ></i>
              )}
            </button>

            <button
              className="hero__search-btn"
              onClick={handleSearch}
              type="button"
            >
              <i className="fas fa-bolt" aria-hidden="true"></i>
              Order Now
            </button>
          </div>

          {/* FIX: Geo error message */}
          {geoError && (
            <p
              className="hero__geo-error"
              role="alert"
              aria-live="assertive"
            >
              <i
                className="fas fa-exclamation-circle"
                aria-hidden="true"
              ></i>
              {geoError}
            </p>
          )}
        </div>

        {/* CTA — FIX: Link not <a href> */}
        <div className="hero__cta-row">
          <Link to="/restaurants" className="hero__cta-primary">
            <i className="fas fa-utensils" aria-hidden="true"></i>
            Explore Restaurants
          </Link>

          <Link
            to="/restaurants?type=pickup"
            className="hero__cta-secondary"
          >
            See what's nearby
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        {/* Trust stats */}
        <div className="hero__stats" aria-label="Platform statistics">
          {STATS.map((s) => (
            <div className="hero__stat" key={s.label}>
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <i className="fas fa-chevron-down"></i>
      </div>

      {/* Order Type Modal */}
      <OrderTypeModal
        isOpen={isModalOpen}
        orderType={orderType}
        setOrderType={setOrderType}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}