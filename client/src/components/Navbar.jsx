import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [animateCart, setAnimateCart] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const lower = query.toLowerCase();
      const matches = [];

      restaurants.forEach((r, idx) => {
        if (r.name.toLowerCase().includes(lower)) {
          matches.push({ text: r.name, type: "restaurant", id: idx });
        }
        r.menu.forEach((item) => {
          if (item.name.toLowerCase().includes(lower)) {
            matches.push({ text: item.name, type: "dish" });
          }
        });
      });

      setSuggestions(matches.slice(0, 5));
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const highlightMatch = (text) => {
    const lower = query.toLowerCase();
    const index = text.toLowerCase().indexOf(lower);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span className="fw-bold text-danger">{match}</span>
        {after}
      </>
    );
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        const selected = suggestions[activeIndex];
        handleSelect(selected);
      }
    }
  };

  const handleSelect = (s) => {
    setQuery(s.text);
    if (s.type === "restaurant") {
      navigate(`/restaurant/${s.id}`);
    } else {
      navigate(`/restaurants?search=${encodeURIComponent(s.text)}`);
    }
    setSuggestions([]);
    setActiveIndex(-1);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm ${
        scrolled ? "bg-warning bg-opacity-75 py-0 premium-navbar" : "bg-warning py-0 premium-navbar"
      }`}
      style={{
        transition: "background-color 0.3s ease, padding 0.3s ease",
        minHeight: "40px",
      }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <a
          className="navbar-brand fw-bold fs-4 position-relative d-inline-block"
          href="/"
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <i className="fas fa-utensils text-danger me-2 fs-3"></i> Uyo Food
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-lg-center small">
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark nav-underline premium-link" href="/">
                <i className="fas fa-home me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark nav-underline premium-link" href="/restaurants">
                <i className="fas fa-store me-1"></i> Restaurants
              </a>
            </li>

            {/* Search with auto-suggest */}
            <li className="nav-item position-relative">
              <form className="d-flex" onSubmit={handleSearch}>
                <div
                  className="input-group input-group-sm premium-search shadow-sm"
                  style={{
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "20px",
                  }}
                >
                  <span className="input-group-text bg-transparent border-0 px-2">
                    <i className="fas fa-search text-danger"></i>
                  </span>
                  <input
                    className="form-control border-0 form-control-sm bg-transparent"
                    type="search"
                    placeholder="Search dishes or restaurants..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ minWidth: "160px", outline: "none" }}
                  />
                </div>
              </form>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 ? (
                <ul
                  className="list-group position-absolute mt-1 shadow-lg premium-dropdown"
                  style={{
                    zIndex: 2000,
                    borderRadius: "10px",
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.95)",
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className={`list-group-item list-group-item-action small ${
                        i === activeIndex ? "bg-light fw-bold" : ""
                      }`}
                      onClick={() => handleSelect(s)}
                      style={{ cursor: "pointer" }}
                    >
                      {highlightMatch(s.text)}{" "}
                      <span className="text-muted small">({s.type})</span>
                    </li>
                  ))}
                </ul>
              ) : query.trim().length > 0 && (
                <div
                  className="position-absolute mt-1 bg-white border rounded shadow-sm px-2 py-1 small text-muted"
                  style={{ zIndex: 2000 }}
                >
                  No results found
                </div>
              )}
            </li>

            {/* Location */}
            <li className="nav-item">
              <div className="d-flex align-items-center text-dark fw-semibold small premium-location">
                <i className="fas fa-map-marker-alt text-success me-1"></i>
                <div>
                  <div className="fw-bold">Deliver to</div>
                  <div>
                    Current Location <span className="text-danger">Uyo</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <a href="/cart" className="nav-link fw-bold text-dark nav-underline position-relative premium-link">
                <i className="fas fa-shopping-cart me-1"></i> Cart
                {cart.length > 0 && (
                  <span
                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
                      animateCart ? "cart-bounce" : ""
                    }`}
                  >
                    {cart.length}
                  </span>
                )}
              </a>
            </li>
          </ul>

          {/* Order Now button */}
          <a
            href="/restaurants"
            className="btn btn-danger fw-bold btn-md px-3 py-1 shadow-lg premium-btn"
            style={{
              backdropFilter: "blur(6px)",
              borderRadius: "30px",
            }}
          >
            Order Now
          </a>
        </div>
      </div>

            <style>
        {`
          /* Premium link hover effect */
          .premium-link:hover {
            color: #dc3545 !important;
            transition: color 0.3s ease;
          }

          /* Premium navbar background blur */
          .premium-navbar {
            backdrop-filter: blur(6px);
          }

          /* Premium search input focus glow */
          .premium-search input:focus {
            box-shadow: 0 0 8px rgba(220, 53, 69, 0.5);
            border-radius: 20px;
          }

          /* Premium dropdown styling */
          .premium-dropdown li:hover {
            background: rgba(220, 53, 69, 0.1);
            transition: background 0.3s ease;
          }

          /* Cart bounce animation */
          @keyframes cartBounce {
            0% { transform: scale(1); }
            30% { transform: scale(1.3); }
            60% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          .cart-bounce {
            animation: cartBounce 0.6s ease;
          }

          /* Premium location styling */
          .premium-location {
            transition: transform 0.3s ease;
          }
          .premium-location:hover {
            transform: scale(1.05);
          }

          /* Premium CTA button */
          .premium-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .premium-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 12px rgba(220, 53, 69, 0.6);
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;