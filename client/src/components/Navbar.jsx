import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm ${
        scrolled ? "bg-warning bg-opacity-75 py-0" : "bg-warning py-0"
      }`}
      style={{ transition: "background-color 0.3s ease, padding 0.3s ease", minHeight: "40px" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold text-dark fs-4" href="/">
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
            {/* Home */}
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark nav-underline" href="/">
                <i className="fas fa-home me-1"></i> Home
              </a>
            </li>

            {/* Restaurants */}
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark nav-underline" href="/restaurants">
                <i className="fas fa-store me-1"></i> Restaurants
              </a>
            </li>

            {/* Search */}
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearch}>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white border-0 px-1 py-0">
                    <i className="fas fa-search text-danger"></i>
                  </span>
                  <input
                    className="form-control border-0 form-control-sm"
                    type="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ minWidth: "130px" }}
                  />
                </div>
              </form>
            </li>

            {/* Location */}
            <li className="nav-item">
              <div className="d-flex align-items-center text-dark fw-semibold small">
                <i className="fas fa-map-marker-alt text-success me-1"></i>
                <div>
                  <div className="fw-bold">Deliver to</div>
                  <div>Current Location <span className="text-danger">Uyo</span></div>
                </div>
              </div>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <a href="/cart" className="nav-link fw-bold text-dark nav-underline position-relative">
                <i className="fas fa-shopping-cart me-1"></i> Cart
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </a>
            </li>
          </ul>

          {/* Order Now button on extreme right */}
          <a href="/restaurants" className="btn btn-danger fw-bold btn-md px-3 py-1 glass-btn">
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
