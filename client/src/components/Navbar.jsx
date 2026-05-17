import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";
import "../styles/navbar.css";

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [query, setQuery]             = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen]       = useState(false);

  const navigate  = useNavigate();
  const location  = useLocation(); // FIX: active link detection
  const { cart }  = useCart();

  const collapseRef     = useRef(null);
  const searchWrapperRef = useRef(null);
  const listboxId       = "search-listbox";

  // Cart item count — works whether cart is [{qty:2}, ...] or flat array
  const cartCount = cart.reduce((sum, item) => sum + (item.qty ?? 1), 0);

  // Active link helper
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // ── Scroll: shrink navbar after 40px ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Click-outside: close suggestions ──────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Close mobile menu (Bootstrap Collapse API) ─────────────────────────
  const closeMenu = useCallback(() => {
    if (collapseRef.current) {
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseRef.current);
      bsCollapse ? bsCollapse.hide() : collapseRef.current.classList.remove("show");
    }
    setMenuOpen(false);
  }, []);

  // ── Search: build suggestions ──────────────────────────────────────────
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) { setSuggestions([]); return; }

    const lower   = trimmed.toLowerCase();
    const matches = [];
    const seen    = new Set(); // deduplicate dish names across restaurants

    restaurants.forEach((r, idx) => {
      if (r.name.toLowerCase().includes(lower)) {
        matches.push({ text: r.name, type: "restaurant", id: idx });
      }
      r.menu?.forEach((item) => {
        const key = item.name.toLowerCase();
        if (key.includes(lower) && !seen.has(key)) {
          seen.add(key);
          matches.push({ text: item.name, type: "dish" });
        }
      });
    });

    setSuggestions(matches.slice(0, 6));
    setActiveIndex(-1);
  }, [query]);

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      navigate(`/restaurants?search=${encodeURIComponent(trimmed)}`);
      setSuggestions([]);
      setActiveIndex(-1);
      closeMenu();
    },
    [query, navigate, closeMenu]
  );

  const handleSelect = useCallback(
    (s) => {
      setQuery(s.text);
      setSuggestions([]);
      setActiveIndex(-1);
      closeMenu();
      s.type === "restaurant"
        ? navigate(`/restaurant/${s.id}`)
        : navigate(`/restaurants?search=${encodeURIComponent(s.text)}`);
    },
    [navigate, closeMenu]
  );

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((p) => Math.min(p + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((p) => Math.max(p - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  // ── Highlight matching text in suggestion ──────────────────────────────
  const highlight = (text) => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <nav
      className={`uyo-navbar${scrolled ? " scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="uyo-navbar__inner">

        {/* ── Brand ────────────────────────────────────────────────── */}
        <Link to="/" className="uyo-navbar__brand" aria-label="Uyo Food — go to homepage">
          <span className="uyo-navbar__brand-icon" aria-hidden="true">🍽️</span>
          <span className="uyo-navbar__brand-text">
            Uyo<span className="uyo-navbar__brand-accent">Food</span>
          </span>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────────────── */}
        <ul className="uyo-navbar__links" role="list">
          <li>
            <Link
              to="/"
              className={`uyo-navbar__link${isActive("/") ? " active" : ""}`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              <i className="fas fa-home" aria-hidden="true"></i>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/restaurants"
              className={`uyo-navbar__link${isActive("/restaurants") ? " active" : ""}`}
              aria-current={isActive("/restaurants") ? "page" : undefined}
            >
              <i className="fas fa-store" aria-hidden="true"></i>
              Restaurants
            </Link>
          </li>
        </ul>

        {/* ── Search ───────────────────────────────────────────────── */}
        <div className="uyo-navbar__search-wrap" ref={searchWrapperRef}>
          <form
            className="uyo-navbar__search"
            onSubmit={handleSearch}
            role="search"
            aria-label="Search dishes and restaurants"
          >
            <i className="fas fa-search uyo-navbar__search-icon" aria-hidden="true"></i>
            <input
              type="search"
              className="uyo-navbar__search-input"
              placeholder="Search food or restaurants…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search dishes and restaurants"
              role="combobox"
              aria-expanded={suggestions.length > 0}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="uyo-navbar__search-clear"
                aria-label="Clear search"
                onClick={() => { setQuery(""); setSuggestions([]); }}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            )}
          </form>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul
              id={listboxId}
              className="uyo-navbar__suggestions"
              role="listbox"
              aria-label="Search suggestions"
            >
              {suggestions.map((s, idx) => (
                <li
                  key={`${s.type}-${s.text}`}
                  id={`suggestion-${idx}`}
                  className={`uyo-navbar__suggestion-item${idx === activeIndex ? " active" : ""}`}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onMouseDown={() => handleSelect(s)} // mousedown fires before blur
                >
                  <span className="uyo-navbar__suggestion-icon" aria-hidden="true">
                    {s.type === "restaurant" ? "🏪" : "🍴"}
                  </span>
                  <span className="uyo-navbar__suggestion-text">{highlight(s.text)}</span>
                  <span className="uyo-navbar__suggestion-type">{s.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Location pill ─────────────────────────────────────────── */}
        <div className="uyo-navbar__location" aria-label="Delivery location: Uyo">
          <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
          <div>
            <span className="uyo-navbar__location-label">Deliver to</span>
            <span className="uyo-navbar__location-city">Uyo, AKS</span>
          </div>
        </div>

        {/* ── Right actions ─────────────────────────────────────────── */}
        <div className="uyo-navbar__actions">
          {/* Account */}
          <Link
            to="/account"
            className="uyo-navbar__icon-btn"
            aria-label="My account"
          >
            <i className="fas fa-user-circle" aria-hidden="true"></i>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="uyo-navbar__cart-btn"
            aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
          >
            <i className="fas fa-shopping-bag" aria-hidden="true"></i>
            {cartCount > 0 && (
              <span className="uyo-navbar__cart-badge" aria-hidden="true">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Order Now CTA */}
          <Link to="/restaurants" className="uyo-navbar__cta">
            Order Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`uyo-navbar__hamburger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="uyo-mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <div
        id="uyo-mobile-menu"
        className={`uyo-navbar__mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          <li>
            <Link
              to="/"
              className={`uyo-navbar__mobile-link${isActive("/") ? " active" : ""}`}
              onClick={closeMenu}
            >
              <i className="fas fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/restaurants"
              className={`uyo-navbar__mobile-link${isActive("/restaurants") ? " active" : ""}`}
              onClick={closeMenu}
            >
              <i className="fas fa-store" aria-hidden="true"></i> Restaurants
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="uyo-navbar__mobile-link"
              onClick={closeMenu}
            >
              <i className="fas fa-user-circle" aria-hidden="true"></i> My Account
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="uyo-navbar__mobile-link"
              onClick={closeMenu}
            >
              <i className="fas fa-shopping-bag" aria-hidden="true"></i> Cart
              {cartCount > 0 && (
                <span className="uyo-navbar__mobile-badge">{cartCount}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile search */}
        <form className="uyo-navbar__mobile-search" onSubmit={handleSearch} role="search">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            type="search"
            placeholder="Search food or restaurants…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
            autoComplete="off"
          />
        </form>

        <Link to="/restaurants" className="uyo-navbar__mobile-cta" onClick={closeMenu}>
          <i className="fas fa-bolt" aria-hidden="true"></i> Order Now
        </Link>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="uyo-navbar__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default Navbar;
