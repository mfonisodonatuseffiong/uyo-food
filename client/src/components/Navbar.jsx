function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning py-3">
      <div className="container">
        {/* Brand with fork & knife icon */}
        <a className="navbar-brand fw-bold text-dark fs-2" href="#home">
          <i className="fas fa-utensils me-2 text-danger"></i> Uyo Food
        </a>

        {/* Toggler */}
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

        {/* Nav links + search box */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#discounts">Discounts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#popular">Popular</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark fw-bold" href="#contact">Contact</a>
            </li>
            {/* Search box with border radius */}
            <li className="nav-item ms-3">
              <form className="d-flex">
                <div className="input-group">
                  <span className="input-group-text bg-white border-0 rounded-start">
                    <i className="fas fa-search text-danger"></i>
                  </span>
                  <input
                    className="form-control rounded-end"
                    type="search"
                    placeholder="Search food..."
                  />
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
