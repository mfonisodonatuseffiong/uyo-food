import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/deals.css";

import afangImg        from "../assets/images/gallery/afang.webp";
import ekpangImg       from "../assets/images/gallery/ekpang.webp";
import edikangIkongImg from "../assets/images/gallery/edikangikong.webp";

// ── Deal data — outside component ────────────────────────────────────────────
const DEALS = [
  {
    id:            1,
    title:         "20% Off Afang Soup",
    description:   "Authentic Afang Soup from Afedndia Kitchen — rich, spicy, and full of Uyo flavour.",
    image:         afangImg,
    alt:           "A bowl of fresh Afang Soup with assorted meat",
    tag:           "🔥 Hot Deal",
    tagType:       "hot",
    originalPrice: 2300,
    dealPrice:     1840,
    discount:      "20% OFF",
    restaurantId:  "rest_002",
    restaurantName:"Afedndia Kitchen",
    expiresAt:     (() => { const d = new Date(); d.setHours(d.getHours() + 5, 30, 0, 0); return d.toISOString(); })(),
  },
  {
    id:            2,
    title:         "Ekpang Combo Deal",
    description:   "Ekpang Nkukwo + chilled drink from Esandidia. A true Uyo classic, now bundled.",
    image:         ekpangImg,
    alt:           "Ekpang Nkukwo traditional cocoyam dish",
    tag:           "🎁 Bundle",
    tagType:       "bundle",
    originalPrice: 3200,
    dealPrice:     2500,
    discount:      "₦700 OFF",
    restaurantId:  "rest_001",
    restaurantName:"Esandidia",
    expiresAt:     (() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(20, 0, 0, 0); return d.toISOString(); })(),
  },
  {
    id:            3,
    title:         "Family Edikang Ikong Pack",
    description:   "Feed the whole family — large pot of Edikang Ikong with 4 wraps of fufu.",
    image:         edikangIkongImg,
    alt:           "Large pot of Edikang Ikong vegetable soup",
    tag:           "👨‍👩‍👧 Family",
    tagType:       "family",
    originalPrice: 5500,
    dealPrice:     4200,
    discount:      "24% OFF",
    restaurantId:  "rest_002",
    restaurantName:"Afedndia Kitchen",
    expiresAt:     (() => { const d = new Date(); d.setDate(d.getDate() + 2); d.setHours(18, 0, 0, 0); return d.toISOString(); })(),
  },
];

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(expiresAt) {
  const calc = useCallback(() => {
    const diff = new Date(expiresAt) - new Date();
    if (diff <= 0) return { expired: true, h: 0, m: 0, s: 0 };
    return {
      expired: false,
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  }, [expiresAt]);

  const [t, setT] = useState(calc);
  useEffect(() => {
    if (t.expired) return;
    const id = setInterval(() => setT(calc()), 1_000);
    return () => clearInterval(id);
  }, [calc, t.expired]);
  return t;
}

function Countdown({ expiresAt }) {
  const { expired, h, m, s } = useCountdown(expiresAt);
  const pad = (n) => String(n).padStart(2, "0");
  if (expired) return (
    <span className="ds__countdown ds__countdown--expired" aria-live="polite">
      Deal expired
    </span>
  );
  return (
    <div className="ds__countdown" aria-label={`Expires in ${h}h ${m}m ${s}s`}>
      <i className="fas fa-clock" aria-hidden="true"></i>
      <span aria-hidden="true">
        {h > 0 && <><strong>{pad(h)}</strong>h </>}
        <strong>{pad(m)}</strong>m <strong>{pad(s)}</strong>s left
      </span>
    </div>
  );
}

function DealCard({ deal, idx, onOrder }) {
  return (
    <article
      className="ds__card ds__animate"
      style={{ "--delay": `${idx * 0.12}s` }}
      aria-label={`${deal.title} — ${deal.discount} from ${deal.restaurantName}`}
    >
      <div className="ds__img-wrap">
        <img
          src={deal.image}
          alt={deal.alt}
          className="ds__img"
          width="340"
          height="200"
          loading={idx === 0 ? "eager" : "lazy"}
        />
        <span className="ds__discount" aria-hidden="true">{deal.discount}</span>
        {/* FIX: renamed from .badge to .ds__tag — avoids Bootstrap conflict */}
        <span className={`ds__tag ds__tag--${deal.tagType}`} aria-hidden="true">
          {deal.tag}
        </span>
      </div>

      <div className="ds__body">
        <h3 className="ds__card-title">{deal.title}</h3>
        <p className="ds__desc">{deal.description}</p>

        <Link
          to={`/restaurant/${deal.restaurantId}`}
          className="ds__restaurant"
          onClick={(e) => e.stopPropagation()}
          aria-label={`View ${deal.restaurantName}`}
        >
          <i className="fas fa-store" aria-hidden="true"></i>
          {deal.restaurantName}
        </Link>

        <div className="ds__price-row">
          <span className="ds__original-price" aria-label={`Original ₦${deal.originalPrice.toLocaleString()}`}>
            ₦{deal.originalPrice.toLocaleString()}
          </span>
          <span className="ds__deal-price" aria-label={`Deal price ₦${deal.dealPrice.toLocaleString()}`}>
            ₦{deal.dealPrice.toLocaleString()}
          </span>
          <span className="ds__savings" aria-hidden="true">
            Save ₦{(deal.originalPrice - deal.dealPrice).toLocaleString()}
          </span>
        </div>

        <Countdown expiresAt={deal.expiresAt} />

        <button
          className="ds__btn"
          onClick={() => onOrder(deal)}
          type="button"
          aria-label={`Order ${deal.title} for ₦${deal.dealPrice.toLocaleString()}`}
        >
          <i className="fas fa-shopping-bag" aria-hidden="true"></i>
          Grab This Deal
        </button>
      </div>
    </article>
  );
}

export default function DealsSpotlight() {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (loading) return;
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll(".ds__animate");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { targets.forEach((el) => el.classList.add("ds__visible")); return; }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("ds__visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const handleOrder = useCallback((deal) => {
    navigate(`/restaurant/${deal.restaurantId}?deal=${deal.id}`);
  }, [navigate]);

  const activeDeals = DEALS.filter((d) => new Date(d.expiresAt) > new Date());

  return (
    <section
      className="ds"
      id="deals"
      aria-labelledby="ds-heading"
      ref={sectionRef}
    >
      <div className="ds__inner">

        {/* Header */}
        <div className="ds__header ds__animate">
          <div>
            <span className="ds__eyebrow">
              <i className="fas fa-bolt" aria-hidden="true"></i>
              Limited Time Only
            </span>
            <h2 className="ds__title-main" id="ds-heading">
              Deals & Spotlight
            </h2>
            <div className="ds__underline" aria-hidden="true"></div>
            <p className="ds__subtitle">
              Grab these offers before they expire — fresh deals every day.
            </p>
          </div>
          {!loading && (
            <div className="ds__active-count" aria-live="polite">
              <span className="ds__active-dot" aria-hidden="true"></span>
              <strong>{activeDeals.length}</strong> active deals
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="ds__grid" aria-busy="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="ds__skeleton" aria-hidden="true">
                <div className="ds__skeleton-img"></div>
                <div className="ds__skeleton-body">
                  <div className="ds__skeleton-line ds__skeleton-line--title"></div>
                  <div className="ds__skeleton-line ds__skeleton-line--long"></div>
                  <div className="ds__skeleton-line ds__skeleton-line--short"></div>
                  <div className="ds__skeleton-line ds__skeleton-line--btn"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activeDeals.length === 0 ? (
          <div className="ds__empty" role="status">
            <i className="fas fa-tag" aria-hidden="true"></i>
            <p>No active deals right now — check back soon!</p>
            <Link to="/restaurants" className="ds__empty-cta">Browse Restaurants</Link>
          </div>
        ) : (
          <div className="ds__grid" role="list" aria-label="Current deals">
            {activeDeals.map((deal, idx) => (
              <div role="listitem" key={deal.id}>
                <DealCard deal={deal} idx={idx} onOrder={handleOrder} />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {!loading && activeDeals.length > 0 && (
          <div className="ds__footer ds__animate" style={{ "--delay": "0.5s" }}>
            <p className="ds__footer-text">Deals refresh daily — don't miss out.</p>
            <Link to="/deals" className="ds__footer-btn">
              <i className="fas fa-fire" aria-hidden="true"></i>
              View All Deals
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}