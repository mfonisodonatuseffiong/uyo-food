import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import restaurants from "../data/restaurants";
import "../styles/localdishes.css";

const SKELETON_COUNT = 4;

// ── Helpers ──────────────────────────────────────────────────────────────────
// Check real-time open status against restaurant's opening/closing hours
function isRestaurantOpen(r) {
  if (!r.isOpen) return false;
  try {
    const now     = new Date();
    const [oH, oM] = r.openingTime.split(":").map(Number);
    const [cH, cM] = r.closingTime.split(":").map(Number);
    const current  = now.getHours() * 60 + now.getMinutes();
    return current >= (oH * 60 + oM) && current < (cH * 60 + cM);
  } catch {
    return r.isOpen;
  }
}

function Stars({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span aria-hidden="true" className="ld__stars">
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(empty)}
    </span>
  );
}

export default function LocalDishes() {
  const navigate   = useNavigate();
  const scrollRef  = useRef(null);
  const sectionRef = useRef(null);

  const [loading,        setLoading]        = useState(true);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Enrich each restaurant with real-time open status + menu count
  const spots = restaurants.map((r) => ({
    ...r,
    openNow:   isRestaurantOpen(r),
    menuCount: r.menu?.length ?? 0,
  }));

  const openCount = spots.filter((s) => s.openNow).length;

  // Simulate async fetch — replace with real API call when backend is ready
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(id);
  }, []);

  // ── Scroll arrow visibility ─────────────────────────────────────────────
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || loading) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, loading]);

  // ── IntersectionObserver animations ────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll(".ld__animate");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      targets.forEach((el) => el.classList.add("ld__visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ld__visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const scroll = useCallback((dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);

  return (
    <section
      className="ld"
      id="local-spots"
      aria-labelledby="ld-heading"
      ref={sectionRef}
    >
      <div className="ld__inner">

        {/* ── Header ── */}
        <div className="ld__header ld__animate">
          <div>
            <span className="ld__eyebrow">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              Uyo, Akwa Ibom
            </span>
            <h2 className="ld__title" id="ld-heading">
              Local Favourite Spots
            </h2>
            <p className="ld__subtitle">
              Trusted local restaurants delivering across Uyo.
            </p>
          </div>
          <Link to="/restaurants" className="ld__see-all">
            See all restaurants
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        {/* ── Live status bar ── */}
        {!loading && (
          <div className="ld__statusbar ld__animate" style={{ "--delay": "0.1s" }}>
            <span className="ld__statusbar-dot" aria-hidden="true"></span>
            <strong>{openCount}</strong>&nbsp;of&nbsp;
            <strong>{spots.length}</strong>&nbsp;restaurants open right now
          </div>
        )}

        {/* ── Scroll row ── */}
        <div className="ld__row-wrap">

          <button
            className={`ld__arrow ld__arrow--left${canScrollLeft ? " visible" : ""}`}
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            type="button"
            tabIndex={canScrollLeft ? 0 : -1}
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div
            className="ld__scroll"
            ref={scrollRef}
            role="list"
            aria-label="Local restaurants in Uyo"
            aria-busy={loading}
          >
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={i} className="ld__skeleton" role="listitem" aria-hidden="true">
                    <div className="ld__skeleton-img"></div>
                    <div className="ld__skeleton-body">
                      <div className="ld__skeleton-line ld__skeleton-line--title"></div>
                      <div className="ld__skeleton-line ld__skeleton-line--short"></div>
                      <div className="ld__skeleton-line ld__skeleton-line--med"></div>
                      <div className="ld__skeleton-line ld__skeleton-line--btn"></div>
                    </div>
                  </div>
                ))
              : spots.map((spot, idx) => (
                  <article
                    key={spot.id}
                    className={`ld__card ld__animate${!spot.openNow ? " ld__card--closed" : ""}`}
                    role="listitem"
                    style={{ "--delay": `${idx * 0.09}s` }}
                    onClick={() => navigate(`/restaurant/${spot.id}`)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/restaurant/${spot.id}`);
                      }
                    }}
                    aria-label={`${spot.name}. ${spot.category}. Rated ${spot.rating} stars. ${spot.openNow ? "Open now" : "Currently closed"}`}
                  >
                    {/* Image */}
                    <div className="ld__img-wrap">
                      <img
                        src={spot.image}
                        alt={`${spot.name} — local restaurant in Uyo`}
                        className="ld__img"
                        width="240"
                        height="140"
                        loading="lazy"
                      />
                      <span className={`ld__status${spot.openNow ? " open" : " closed"}`} aria-hidden="true">
                        {spot.openNow ? "● Open" : "● Closed"}
                      </span>
                      {spot.supportsPickup && (
                        <span className="ld__pickup" aria-hidden="true">
                          <i className="fas fa-walking"></i> Pickup
                        </span>
                      )}
                      <span className="ld__tag" aria-hidden="true">
                        {spot.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="ld__body">
                      <h3 className="ld__name">{spot.name}</h3>
                      <p className="ld__tagline">{spot.tagline}</p>

                      <div className="ld__rating" aria-label={`Rated ${spot.rating} out of 5`}>
                        <Stars rating={spot.rating} />
                        <span className="ld__rating-val">{spot.rating}</span>
                      </div>

                      <div className="ld__info">
                        <span className="ld__info-item">
                          <i className="fas fa-clock" aria-hidden="true"></i>
                          {spot.baseDeliveryTime} min
                        </span>
                        <span className="ld__info-divider" aria-hidden="true">·</span>
                        <span className="ld__info-item">
                          <i className="fas fa-utensils" aria-hidden="true"></i>
                          {spot.menuCount} dishes
                        </span>
                      </div>

                      <p className="ld__hours">
                        <i className="fas fa-door-open" aria-hidden="true"></i>
                        {spot.openingTime} – {spot.closingTime}
                      </p>

                      <button
                        className={`ld__btn${!spot.openNow ? " ld__btn--closed" : ""}`}
                        onClick={(e) => { e.stopPropagation(); navigate(`/restaurant/${spot.id}`); }}
                        disabled={!spot.openNow}
                        type="button"
                        aria-label={spot.openNow ? `Order from ${spot.name}` : `${spot.name} is closed`}
                      >
                        {spot.openNow ? (
                          <><i className="fas fa-shopping-bag" aria-hidden="true"></i> Order Now</>
                        ) : (
                          <><i className="fas fa-clock" aria-hidden="true"></i> Opens {spot.openingTime}</>
                        )}
                      </button>
                    </div>
                  </article>
                ))}
          </div>

          <button
            className={`ld__arrow ld__arrow--right${canScrollRight ? " visible" : ""}`}
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            type="button"
            tabIndex={canScrollRight ? 0 : -1}
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>

        {/* ── Footer ── */}
        {!loading && (
          <div className="ld__footer ld__animate" style={{ "--delay": "0.4s" }}>
            <p className="ld__footer-text">
              {spots.length} local restaurants in Uyo
            </p>
            <Link to="/restaurants" className="ld__footer-btn">
              <i className="fas fa-store" aria-hidden="true"></i>
              View All Restaurants
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}