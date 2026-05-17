import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useCallback, useEffect, useState } from "react";
import "../styles/categories.css";

// ── Category data ─────────────────────────────────────────────────────────────
// slug   : used in URL query param  ?category=slug
// count  : how many restaurants serve this category (replace with real API data)
// popular: shows a "Popular" badge
const CATEGORIES = [
  { name: "Afang Soup",   icon: "🍲", slug: "afang",        count: 12, popular: true  },
  { name: "Pepper Soup",  icon: "🌶️", slug: "pepper-soup",  count: 9,  popular: true  },
  { name: " Fried Rice",  icon: "🍚", slug: "fried rice",   count: 18, popular: false },
  { name: "Jollof rice",  icon: "🥘", slug: "jollof rice",  count: 15, popular: false },
  { name: "Fisherman",    icon: "🍟", slug: "fishman",      count: 14, popular: false },
  { name: "Banga Soup",   icon: "🫕", slug: "banga",        count: 8,  popular: false },
  { name: "Edikang Ikong",icon: "🥬", slug: "edikang-ikong",count: 7,  popular: true  },
  { name: "Rice and Beans",icon: "🫘🍚", slug: "rice & beans",count: 13,  popular: true  },
];

// ── Skeleton placeholder count ────────────────────────────────────────────────
const SKELETON_COUNT = 6;

export default function Categories() {
  const navigate                        = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef                       = useRef(null);

  // ── URL sync: read active category from URL ──────────────────────────────
  const activeSlug = searchParams.get("category") || null;

  // ── Simulated loading state ──────────────────────────────────────────────
  // Replace `true` initial value with your real data-fetching logic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch — replace with your real API call
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, []);

  // ── Scroll arrow visibility ──────────────────────────────────────────────
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, loading]);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  }, []);

  // ── Category click: toggle selection + sync URL ──────────────────────────
  const handleCategoryClick = useCallback(
    (slug) => {
      if (activeSlug === slug) {
        // Clicking active category deselects it — clear filter
        const next = new URLSearchParams(searchParams);
        next.delete("category");
        setSearchParams(next, { replace: true });
        navigate(`/restaurants`);
      } else {
        setSearchParams({ category: slug }, { replace: true });
        navigate(`/restaurants?category=${slug}`);
      }
    },
    [activeSlug, navigate, searchParams, setSearchParams]
  );

  const handleViewAll = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    setSearchParams(next, { replace: true });
    navigate("/restaurants");
  }, [navigate, searchParams, setSearchParams]);

  return (
    <section
      className="categories"
      aria-labelledby="categories-heading"
    >
      {/* Top accent bar */}
      <div className="categories__accent" aria-hidden="true"></div>

      {/* Header */}
      <div className="categories__header">
        <div>
          <h2 className="categories__title" id="categories-heading">
            What are you craving?
          </h2>
          <p className="categories__subtitle">
            From fresh Afang soup to late-night shawarma — Uyo's best, delivered.
          </p>
        </div>

        {/* Active filter pill */}
        {activeSlug && !loading && (
          <div className="categories__active-filter" aria-live="polite">
            <span>
              Showing:{" "}
              <strong>
                {CATEGORIES.find((c) => c.slug === activeSlug)?.name ?? activeSlug}
              </strong>
            </span>
            <button
              className="categories__clear-filter"
              onClick={handleViewAll}
              aria-label="Clear category filter"
              type="button"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Scroll row wrapper */}
      <div className="categories__row-wrap">

        {/* Left scroll arrow */}
        <button
          className={`categories__arrow categories__arrow--left${canScrollLeft ? " visible" : ""}`}
          onClick={() => scroll(-1)}
          aria-label="Scroll categories left"
          type="button"
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>

        {/* Scrollable row */}
        <div
          className="categories__scroll"
          ref={scrollRef}
          role="list"
          aria-label="Food categories"
          aria-busy={loading}
        >
          {loading
            ? // ── Skeleton loading state ──────────────────────────────────
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="categories__skeleton"
                  aria-hidden="true"
                ></div>
              ))
            : // ── Real cards ───────────────────────────────────────────────
              CATEGORIES.map((cat) => {
                const isActive = activeSlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    className={`categories__card${isActive ? " active" : ""}`}
                    role="listitem"
                    onClick={() => handleCategoryClick(cat.slug)}
                    aria-pressed={isActive}
                    aria-label={`${cat.name} — ${cat.count} restaurant${cat.count !== 1 ? "s" : ""}${isActive ? ", selected" : ""}`}
                    type="button"
                  >
                    {/* Popular badge */}
                    {cat.popular && (
                      <span className="categories__popular-badge" aria-label="Popular">
                        🔥
                      </span>
                    )}

                    {/* Icon */}
                    <span className="categories__icon" aria-hidden="true">
                      {cat.icon}
                    </span>

                    {/* Label */}
                    <span className="categories__label">{cat.name}</span>

                    {/* Restaurant count */}
                    <span className="categories__count" aria-hidden="true">
                      {cat.count} spots
                    </span>
                  </button>
                );
              })}
        </div>

        {/* Right scroll arrow */}
        <button
          className={`categories__arrow categories__arrow--right${canScrollRight ? " visible" : ""}`}
          onClick={() => scroll(1)}
          aria-label="Scroll categories right"
          type="button"
          tabIndex={canScrollRight ? 0 : -1}
        >
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>

      {/* Footer */}
      {!loading && (
        <div className="categories__footer">
          <button
            className="categories__cta"
            onClick={handleViewAll}
            type="button"
            aria-label="Browse all restaurants"
          >
            <i className="fas fa-store" aria-hidden="true"></i>
            Browse All Restaurants
          </button>

          <p className="categories__total-hint" aria-live="polite">
            {activeSlug
              ? `${CATEGORIES.find((c) => c.slug === activeSlug)?.count ?? 0} restaurants in this category`
              : `${CATEGORIES.reduce((s, c) => s + c.count, 0)}+ dishes across Uyo`}
          </p>
        </div>
      )}
    </section>
  );
}