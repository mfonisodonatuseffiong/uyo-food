function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning py-2 fixed-top shadow-sm">
      <div className="container-fluid">

        {/* Brand */}
        <a className="navbar-brand fw-bold text-dark fs-4" href="/">
          <i className="fas fa-utensils me-2 text-danger"></i> Uyo Food
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="#discounts">Discounts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="#popular">Popular</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="/team">Team</a> {/* ✅ Added Team */}
            </li>
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="/blog">Blog</a> {/* ✅ Added Blog */}
            </li>
            <li className="nav-item">
              <a className="nav-link nav-underline fw-bold text-dark" href="#contact">Contact</a>
            </li>

            {/* Search (desktop only) */}
            <li className="nav-item ms-lg-3 d-none d-lg-block">
              <form className="d-flex">
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-search text-danger"></i>
                  </span>
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search food..."
                  />
                </div>
              </form>
            </li>
          </ul>

          {/* Delivery Location */}
          <div className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0 text-dark fw-semibold">
            <i className="fas fa-map-marker-alt text-success me-2"></i>
            <div className="small">
              <div className="fw-bold">Deliver to</div>
              <div>Current Location <span className="text-danger">Uyo</span></div>
            </div>
          </div>

          {/* CTA Button */}
          <a href="/restaurants" className="btn btn-danger fw-bold ms-lg-4 mt-3 mt-lg-0">
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
