import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/featured.css";
import "../styles/featuredCard.css";
import "../styles/featuredSkeleton.css";

import jollofImg        from "../assets/images/gallery/jollof.webp";
import afangImg         from "../assets/images/gallery/afang.webp";
import afiaEfereImg     from "../assets/images/gallery/Afiaefere.webp";
import ekpangImg        from "../assets/images/gallery/ekpang.webp";
import edikangIkongImg  from "../assets/images/gallery/edikangikong.webp";
import chickenRepublicImg from "../assets/images/gallery/chickenrepublic.webp";
import crunchiesImg     from "../assets/images/gallery/coconut.webp";
import kilimanjaroImg   from "../assets/images/gallery/burger.png";

// ── Static data — outside component ─────────────────────────────────────────
// rating: numeric 0–5 (renders stars from this)
// price:  ₦ price range label
// time:   estimated delivery time
// tag:    category slug (matches Categories component)
// isNew / isHot: badge flags
const FEATURED_ITEMS = [
  {
    id: 1,
    name:        "Smoky Jollof Rice",
    image:       jollofImg,
    rating:      5,
    reviews:     124,
    description: "Authentic wood-fire smoky jollof, cooked fresh every morning.",
    price:       "₦1,500 – ₦2,500",
    time:        "20–30 min",
    tag:         "rice",
    isHot:       true,
    isNew:       false,
    restaurantId: 1,
  },
  {
    id: 2,
    name:        "Afang Soup",
    image:       afangImg,
    rating:      4.5,
    reviews:     98,
    description: "Rich, spicy, and full of Akwa Ibom flavour. Served with eba or fufu.",
    price:       "₦2,000 – ₦3,500",
    time:        "25–40 min",
    tag:         "soup",
    isHot:       true,
    isNew:       false,
    restaurantId: 2,
  },
  {
    id: 3,
    name:        "Afia Efere",
    image:       afiaEfereImg,
    rating:      4.5,
    reviews:     76,
    description: "Classic Efik white soup — hearty, milky, and deeply satisfying.",
    price:       "₦1,800 – ₦3,000",
    time:        "20–35 min",
    tag:         "soup",
    isHot:       false,
    isNew:       false,
    restaurantId: 2,
  },
  {
    id: 4,
    name:        "Ekpang Nkukwo",
    image:       ekpangImg,
    rating:      5,
    reviews:     112,
    description: "Traditional cocoyam dish wrapped in fresh leaves — a Uyo staple.",
    price:       "₦2,500 – ₦4,000",
    time:        "30–45 min",
    tag:         "soup",
    isHot:       false,
    isNew:       true,
    restaurantId: 3,
  },
  {
    id: 5,
    name:        "Edikang Ikong",
    image:       edikangIkongImg,
    rating:      5,
    reviews:     143,
    description: "Nutritious mixed vegetable soup packed with assorted meat and fish.",
    price:       "₦2,200 – ₦3,800",
    time:        "25–40 min",
    tag:         "afang",
    isHot:       true,
    isNew:       false,
    restaurantId: 3,
  },
  {
    id: 6,
    name:        "Chicken & Jollof Combo",
    image:       chickenRepublicImg,
    rating:      4,
    reviews:     89,
    description: "Perfectly seasoned grilled chicken with party jollof rice.",
    price:       "₦2,800 – ₦4,500",
    time:        "15–25 min",
    tag:         "rice",
    isHot:       false,
    isNew:       false,
    restaurantId: 4,
  },
  {
    id: 7,
    name:        "Coconut Rice",
    image:       crunchiesImg,
    rating:      4,
    reviews:     65,
    description: "Fragrant coconut rice with plantain and a side of fried fish.",
    price:       "₦1,500 – ₦2,500",
    time:        "20–30 min",
    tag:         "rice",
    isHot:       false,
    isNew:       true,
    restaurantId: 5,
  },
  {
    id: 8,
    name:        "Gourmet Burger",
    image:       kilimanjaroImg,
    rating:      4,
    reviews:     54,
    description: "Juicy double-patty burger with caramelised onions and house sauce.",
    price:       "₦2,000 – ₦3,200",
    time:        "15–20 min",
    tag:         "snacks",
    isHot:       false,
    isNew:       true,
    restaurantId: 6,
  },
];

const FILTERS = [
  { label: "All",          value: "all"         },
  { label: "Beans",        value: "beans"        },
  { label: "Rice",         value: "rice"        },
  { label: "Soup",       value: "soup"      },
  { label: "Local Dishes", value: "afang"       },
];

const SORT_OPTIONS = [
  { label: "Popular",     value: "popular"  },
  { label: "Top Rated",   value: "rating"   },
  { label: "Fastest",     value: "fastest"  },
  { label: "Price: Low",  value: "price-lo" },
];

// ── Star renderer ────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div
      className="feat__rating"
      aria-label={`Rated ${rating} out of 5 — ${reviews} reviews`}
    >
      <span className="feat__stars" aria-hidden="true">
        {"★".repeat(full)}
        {half ? "½" : ""}
        {"☆".repeat(empty)}
      </span>
      <span className="feat__reviews">({reviews})</span>
    </div>
  );
}

// ── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="feat__card feat__skeleton" aria-hidden="true">
      <div className="feat__skeleton-img"></div>
      <div className="feat__skeleton-body">
        <div className="feat__skeleton-line feat__skeleton-line--title"></div>
        <div className="feat__skeleton-line feat__skeleton-line--short"></div>
        <div className="feat__skeleton-line feat__skeleton-line--long"></div>
        <div className="feat__skeleton-line feat__skeleton-line--btn"></div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FeaturedRestaurants() {
  const navigate = useNavigate();

  const [loading,    setLoading]    = useState(true);
  const [activeFilter, setFilter]  = useState("all");
  const [activeSort,   setSort]    = useState("popular");
  const [wishlist,   setWishlist]  = useState(() => {
    // Persist wishlist in localStorage
    try {
      return JSON.parse(localStorage.getItem("uyo_wishlist") || "[]");
    } catch { return []; }
  });
  const [addedToCart, setAddedToCart] = useState(null); // id of last added item
  const sectionRef = useRef(null);

  // Simulate data fetch
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(id);
  }, []);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem("uyo_wishlist", JSON.stringify(wishlist));
    } catch { /* storage unavailable */ }
  }, [wishlist]);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    if (loading) return;
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll(".feat__animate");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("feat__visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("feat__visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // ── Wishlist toggle ──────────────────────────────────────────────────────
  const toggleWishlist = useCallback((id, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // ── Add to cart feedback ─────────────────────────────────────────────────
  const handleOrder = useCallback((item, e) => {
    e.stopPropagation();
    // Navigate to restaurant page with dish pre-selected
    navigate(`/restaurant/${item.restaurantId}?dish=${item.id}`);
    // Brief "added" feedback
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 1800);
  }, [navigate]);

  // ── Filter + Sort ────────────────────────────────────────────────────────
  const displayedItems = useMemo(() => {
    let items = [...FEATURED_ITEMS];

    // Filter
    if (activeFilter !== "all") {
      items = items.filter((i) => i.tag === activeFilter);
    }

    // Sort
    switch (activeSort) {
      case "rating":
        items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "fastest":
        // Parse the first number from "20–30 min"
        items.sort((a, b) => {
          const aMin = parseInt(a.time, 10);
          const bMin = parseInt(b.time, 10);
          return aMin - bMin;
        });
        break;
      case "price-lo":
        // Parse the first ₦ amount
        items.sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/[^\d]/g, ""), 10);
          const bPrice = parseInt(b.price.replace(/[^\d]/g, ""), 10);
          return aPrice - bPrice;
        });
        break;
      default: // "popular" — reviews count
        items.sort((a, b) => b.reviews - a.reviews);
    }

    return items;
  }, [activeFilter, activeSort]);

  return (
    <section
      className="feat"
      id="featured-restaurants"
      aria-labelledby="feat-heading"
      ref={sectionRef}
    >
      <div className="feat__inner">

        {/* ── Header ── */}
        <div className="feat__header feat__animate">
          <span className="feat__eyebrow">
            <i className="fas fa-fire" aria-hidden="true"></i>
            Trending in Uyo
          </span>
          <h2 className="feat__title" id="feat-heading">
            Featured & Popular
          </h2>
          <div className="feat__underline" aria-hidden="true"></div>
          <p className="feat__subtitle">
            Hand-picked local favourites loved by the Uyo community.
          </p>
        </div>

        {/* ── Controls: filter + sort ── */}
        {!loading && (
          <div className="feat__controls feat__animate" style={{ "--delay": "0.1s" }}>
            {/* Filter pills */}
            <div
              className="feat__filters"
              role="group"
              aria-label="Filter by food type"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`feat__filter-btn${activeFilter === f.value ? " active" : ""}`}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={activeFilter === f.value}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="feat__sort-wrap">
              <label htmlFor="feat-sort" className="feat__sort-label">
                <i className="fas fa-sort-amount-down" aria-hidden="true"></i>
                Sort:
              </label>
              <select
                id="feat-sort"
                className="feat__sort"
                value={activeSort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort featured items"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ── Grid ── */}
        <div
          className="feat__grid"
          role="list"
          aria-label="Featured dishes"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div role="listitem" key={i}>
                  <SkeletonCard />
                </div>
              ))
            : displayedItems.length === 0
              ? (
                <div className="feat__empty" role="status">
                  <i className="fas fa-utensils" aria-hidden="true"></i>
                  <p>No dishes found in this category yet.</p>
                  <button
                    className="feat__empty-reset"
                    onClick={() => setFilter("all")}
                    type="button"
                  >
                    Show all dishes
                  </button>
                </div>
              )
              : displayedItems.map((item, idx) => (
                  <article
                    key={item.id}
                    className="feat__card feat__animate"
                    role="listitem"
                    style={{ "--delay": `${idx * 0.07}s` }}
                    aria-label={item.name}
                    onClick={() => navigate(`/restaurant/${item.restaurantId}`)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/restaurant/${item.restaurantId}`);
                      }
                    }}
                  >
                    {/* Image */}
                    <div className="feat__img-wrap">
                      <img
                        src={item.image}
                        alt={`${item.name} — available for delivery in Uyo`}
                        className="feat__img"
                        width="300"
                        height="195"
                        loading={idx < 4 ? "eager" : "lazy"}
                      />

                      {/* Badges */}
                      <div className="feat__badges" aria-label="Item badges">
                        {item.isHot && (
                          <span className="feat__badge feat__badge--hot">
                            🔥 Hot
                          </span>
                        )}
                        {item.isNew && (
                          <span className="feat__badge feat__badge--new">
                            ✨ New
                          </span>
                        )}
                      </div>

                      {/* Wishlist button */}
                      <button
                        className={`feat__wishlist${wishlist.includes(item.id) ? " saved" : ""}`}
                        onClick={(e) => toggleWishlist(item.id, e)}
                        aria-label={
                          wishlist.includes(item.id)
                            ? `Remove ${item.name} from wishlist`
                            : `Save ${item.name} to wishlist`
                        }
                        aria-pressed={wishlist.includes(item.id)}
                        type="button"
                      >
                        <i
                          className={wishlist.includes(item.id) ? "fas fa-heart" : "far fa-heart"}
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="feat__body">
                      {/* Title + rating */}
                      <div className="feat__meta">
                        <h3 className="feat__name">{item.name}</h3>
                        <StarRating rating={item.rating} reviews={item.reviews} />
                      </div>

                      {/* Description */}
                      <p className="feat__desc">{item.description}</p>

                      {/* Info row */}
                      <div className="feat__info">
                        <span className="feat__info-item">
                          <i className="fas fa-tag" aria-hidden="true"></i>
                          {item.price}
                        </span>
                        <span className="feat__info-item">
                          <i className="fas fa-clock" aria-hidden="true"></i>
                          {item.time}
                        </span>
                      </div>

                      {/* Order button */}
                      <button
                        className={`feat__order-btn${addedToCart === item.id ? " added" : ""}`}
                        onClick={(e) => handleOrder(item, e)}
                        aria-label={`Order ${item.name}`}
                        type="button"
                      >
                        {addedToCart === item.id ? (
                          <>
                            <i className="fas fa-check" aria-hidden="true"></i>
                            Added!
                          </>
                        ) : (
                          <>
                            <i className="fas fa-shopping-bag" aria-hidden="true"></i>
                            Order Now
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                ))}
        </div>

        {/* ── Footer CTA ── */}
        {!loading && displayedItems.length > 0 && (
          <div className="feat__footer feat__animate" style={{ "--delay": "0.5s" }}>
            <p className="feat__footer-text">
              Showing {displayedItems.length} of {FEATURED_ITEMS.length} dishes
            </p>
            <Link to="/restaurants" className="feat__view-all">
              <i className="fas fa-store" aria-hidden="true"></i>
              View All Restaurants
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}