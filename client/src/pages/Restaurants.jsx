import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";
import "../styles/Restaurants.css";

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
    <span className="rst__stars" aria-hidden="true">
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(empty)}
    </span>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rst__card rst__skeleton" aria-hidden="true">
      <div className="rst__skeleton-img"></div>
      <div className="rst__skeleton-body">
        <div className="rst__skeleton-line rst__skeleton-line--title"></div>
        <div className="rst__skeleton-line rst__skeleton-line--short"></div>
        <div className="rst__skeleton-line rst__skeleton-line--long"></div>
        <div className="rst__skeleton-line rst__skeleton-line--btn"></div>
      </div>
    </div>
  );
}

// ── Filter + Sort constants ───────────────────────────────────────────────────
const CATEGORIES = ["All", "Soups", "Grills", "Rice", "Snacks", "Drinks"];
const SORT_OPTIONS = [
  { value: "popular",  label: "Most Popular" },
  { value: "rating",   label: "Top Rated"    },
  { value: "fastest",  label: "Fastest"      },
  { value: "open",     label: "Open Now"     },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function Restaurants() {
  const { cart, addItem }           = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageRef                     = useRef(null);

  // ── State ──
  const [loading,    setLoading]    = useState(true);
  const [activeSort, setSort]       = useState("popular");
  const [notification, setNote]     = useState(null);
  const [addedMap,   setAddedMap]   = useState({}); // dish key → true for 1.5s

  // ── Read search + category from URL ──────────────────────────────────────
  const urlSearch   = searchParams.get("search")   || "";
  const urlCategory = searchParams.get("category") || "All";

  // Simulate async load
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(id);
  }, []);

  // IntersectionObserver animations
  useEffect(() => {
    if (loading) return;
    const page = pageRef.current;
    if (!page) return;
    const targets = page.querySelectorAll(".rst__animate");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { targets.forEach((el) => el.classList.add("rst__visible")); return; }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("rst__visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // ── Cart guard — one restaurant at a time ────────────────────────────────
  const showNote = useCallback((msg) => {
    setNote(msg);
    setTimeout(() => setNote(null), 4000);
  }, []);

  const handleAddItem = useCallback((restaurant, dish, price) => {
    if (cart.length > 0) {
      const current = cart[0].restaurant;
      if (current !== restaurant.name) {
        showNote(`Clear your cart from "${current}" before ordering from "${restaurant.name}".`);
        return;
      }
    }
    const key = `${restaurant.id}-${dish}`;
    addItem({ restaurant: restaurant.name, dish, price, quantity: 1 });
    showNote(`${dish} added to cart ✓`);
    setAddedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedMap((prev) => { const n = { ...prev }; delete n[key]; return n; }), 1500);
  }, [cart, addItem, showNote]);

  // ── Filter controls ──────────────────────────────────────────────────────
  const setCategory = useCallback((cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const setSearch = useCallback((val) => {
    const next = new URLSearchParams(searchParams);
    if (val.trim()) next.set("search", val.trim());
    else next.delete("search");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // ── Filtered + sorted list ───────────────────────────────────────────────
  const displayed = useMemo(() => {
    let list = restaurants.map((r) => ({ ...r, openNow: isOpen(r) }));

    // Search filter
    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.menu.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (urlCategory && urlCategory !== "All") {
      list = list.filter((r) => r.category === urlCategory);
    }

    // Sort
    switch (activeSort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "fastest":
        list.sort((a, b) => a.baseDeliveryTime - b.baseDeliveryTime);
        break;
      case "open":
        list.sort((a, b) => (b.openNow ? 1 : 0) - (a.openNow ? 1 : 0));
        break;
      default: // popular — keep original order (by reviews/default)
        break;
    }

    return list;
  }, [urlSearch, urlCategory, activeSort]);

  const cartCount = cart.reduce((s, i) => s + (i.quantity ?? 1), 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0);

  return (
    <main
      className="rst"
      id="restaurants-page"
      aria-labelledby="rst-heading"
      ref={pageRef}
    >
      {/* ── Page header ── */}
      <div className="rst__header rst__animate">
        <div className="rst__header-inner">
          <span className="rst__eyebrow">
            <i className="fas fa-store" aria-hidden="true"></i>
            {displayed.length} restaurant{displayed.length !== 1 ? "s" : ""} in Uyo
          </span>
          <h1 className="rst__title" id="rst-heading">
            All Restaurants
          </h1>
          <p className="rst__subtitle">
            Browse, filter, and order from Uyo's best local spots.
          </p>
        </div>
      </div>

      <div className="rst__inner">

        {/* ── Search + controls ── */}
        <div className="rst__controls rst__animate" style={{ "--delay": "0.05s" }}>

          {/* Search bar */}
          <div className="rst__search" role="search" aria-label="Search restaurants">
            <i className="fas fa-search rst__search-icon" aria-hidden="true"></i>
            <input
              type="search"
              className="rst__search-input"
              placeholder="Search restaurants or dishes…"
              value={urlSearch}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search restaurants and dishes"
              autoComplete="off"
            />
            {urlSearch && (
              <button
                className="rst__search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                type="button"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="rst__sort-wrap">
            <label htmlFor="rst-sort" className="rst__sort-label">
              <i className="fas fa-sort-amount-down" aria-hidden="true"></i>
              Sort:
            </label>
            <select
              id="rst-sort"
              className="rst__sort"
              value={activeSort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort restaurants"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Category filters ── */}
        <div
          className="rst__filters rst__animate"
          style={{ "--delay": "0.1s" }}
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`rst__filter-btn${urlCategory === cat || (cat === "All" && !urlCategory) ? " active" : ""}`}
              onClick={() => setCategory(cat)}
              aria-pressed={urlCategory === cat || (cat === "All" && !urlCategory)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active search banner */}
        {urlSearch && !loading && (
          <div className="rst__search-banner" aria-live="polite">
            <i className="fas fa-search" aria-hidden="true"></i>
            {displayed.length > 0
              ? <>Results for "<strong>{urlSearch}</strong>" — {displayed.length} found</>
              : <>No results for "<strong>{urlSearch}</strong>"</>
            }
            <button
              className="rst__search-banner-clear"
              onClick={() => setSearch("")}
              type="button"
            >
              Clear
            </button>
          </div>
        )}

        {/* ── Grid ── */}
        <div
          className="rst__grid"
          role="list"
          aria-label="Restaurants"
          aria-busy={loading}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div role="listitem" key={i}><SkeletonCard /></div>
              ))
            : displayed.length === 0
              ? (
                <div className="rst__empty" role="status">
                  <i className="fas fa-store" aria-hidden="true"></i>
                  <h3>No restaurants found</h3>
                  <p>Try adjusting your search or filters.</p>
                  <button
                    className="rst__empty-reset"
                    onClick={() => { setSearch(""); setCategory("All"); }}
                    type="button"
                  >
                    Clear all filters
                  </button>
                </div>
              )
              : displayed.map((restaurant, idx) => {
                  const openNow = restaurant.openNow;
                  return (
                    <article
                      key={restaurant.id}
                      className={`rst__card rst__animate${!openNow ? " rst__card--closed" : ""}`}
                      role="listitem"
                      style={{ "--delay": `${idx * 0.07}s` }}
                      aria-label={`${restaurant.name} — ${restaurant.category}. Rated ${restaurant.rating}. ${openNow ? "Open now" : "Currently closed"}`}
                    >
                      {/* Image */}
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="rst__img-link"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <div className="rst__img-wrap">
                          <img
                            src={restaurant.image}
                            alt={`${restaurant.name} — ${restaurant.category} restaurant in Uyo`}
                            className="rst__img"
                            width="400"
                            height="220"
                            loading={idx < 2 ? "eager" : "lazy"}
                          />
                          {/* Open/closed badge */}
                          <span className={`rst__status${openNow ? " open" : " closed"}`} aria-hidden="true">
                            {openNow ? "● Open" : "● Closed"}
                          </span>
                          {/* Pickup badge */}
                          {restaurant.supportsPickup && (
                            <span className="rst__pickup" aria-hidden="true">
                              <i className="fas fa-walking"></i> Pickup
                            </span>
                          )}
                          {/* Category tag */}
                          <span className="rst__cat-tag" aria-hidden="true">
                            {restaurant.category}
                          </span>
                        </div>
                      </Link>

                      {/* Body */}
                      <div className="rst__body">
                        <div className="rst__meta">
                          <div>
                            <h2 className="rst__name">{restaurant.name}</h2>
                            <div className="rst__rating" aria-label={`Rated ${restaurant.rating} out of 5`}>
                              <StarRating rating={restaurant.rating} />
                              <span className="rst__rating-val">{restaurant.rating}</span>
                            </div>
                          </div>
                          <div className="rst__info">
                            <span className="rst__info-item">
                              <i className="fas fa-clock" aria-hidden="true"></i>
                              {restaurant.baseDeliveryTime} min
                            </span>
                          </div>
                        </div>

                        <p className="rst__desc">{restaurant.description}</p>

                        {/* Hours */}
                        <p className="rst__hours">
                          <i className="fas fa-door-open" aria-hidden="true"></i>
                          {restaurant.openingTime} – {restaurant.closingTime}
                        </p>

                        {/* Menu preview — top 2 dishes */}
                        <div className="rst__menu" aria-label={`Menu preview for ${restaurant.name}`}>
                          {restaurant.menu.slice(0, 2).map((item) => {
                            const key = `${restaurant.id}-${item.name}`;
                            const added = !!addedMap[key];
                            return (
                              <div key={item.id} className="rst__dish">
                                <div className="rst__dish-info">
                                  <span className="rst__dish-name">{item.name}</span>
                                  <span className="rst__dish-price">₦{item.price.toLocaleString()}</span>
                                </div>
                                <button
                                  className={`rst__dish-add${added ? " added" : ""}${!openNow ? " disabled" : ""}`}
                                  onClick={() => openNow && handleAddItem(restaurant, item.name, item.price)}
                                  disabled={!openNow}
                                  aria-label={openNow
                                    ? `Add ${item.name} from ${restaurant.name} to cart`
                                    : `${restaurant.name} is closed`
                                  }
                                  type="button"
                                >
                                  {added
                                    ? <i className="fas fa-check" aria-hidden="true"></i>
                                    : <i className="fas fa-plus" aria-hidden="true"></i>
                                  }
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="rst__footer">
                        <Link
                          to={`/restaurant/${restaurant.id}`}
                          className="rst__view-btn"
                          aria-label={`View full menu for ${restaurant.name}`}
                        >
                          <i className="fas fa-utensils" aria-hidden="true"></i>
                          View Menu
                        </Link>
                        <button
                          className={`rst__quick-btn${!openNow ? " rst__quick-btn--closed" : ""}`}
                          onClick={() =>
                            openNow &&
                            handleAddItem(restaurant, restaurant.menu[0].name, restaurant.menu[0].price)
                          }
                          disabled={!openNow}
                          aria-label={openNow
                            ? `Quick add ${restaurant.menu[0].name} from ${restaurant.name}`
                            : `${restaurant.name} is currently closed`
                          }
                          type="button"
                        >
                          {openNow
                            ? <><i className="fas fa-bolt" aria-hidden="true"></i> Quick Add</>
                            : <><i className="fas fa-clock" aria-hidden="true"></i> Closed</>
                          }
                        </button>
                      </div>
                    </article>
                  );
                })}
        </div>

      </div>

      {/* ── Notification toast ── */}
      {notification && (
        <div
          className={`rst__toast${notification.includes("Clear") ? " rst__toast--warn" : ""}`}
          role="status"
          aria-live="polite"
        >
          <i className={`fas ${notification.includes("Clear") ? "fa-exclamation-circle" : "fa-check-circle"}`} aria-hidden="true"></i>
          {notification}
        </div>
      )}
    </main>
  );
}