function DiscountItems() {
  return (
    <section className="py-5 bg-light" id="discounts">
      <div className="container">
        <h2 className="text-center fw-bold text-danger mb-4">
          <i className="fas fa-tags me-2 text-warning"></i> Special Discounts
        </h2>
        <div className="row">
          {/* Vegetable Dish */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/vegetable.webp"
                className="card-img-top rounded-top"
                alt="Vegetable Dish"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Vegetable Dish</h5>
                <p className="card-text text-dark flex-grow-1">
                  Freshly prepared vegetable mix served hot at{" "}
                  <span className="fw-bold text-danger">20% off</span>.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Jollof Rice */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/jollof.webp"
                className="card-img-top rounded-top"
                alt="Jollof Rice"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Jollof Rice</h5>
                <p className="card-text text-dark flex-grow-1">
                  Classic Nigerian Jollof with chicken, now{" "}
                  <span className="fw-bold text-danger">15% off</span>.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Afang Soup */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/Afang.webp"
                className="card-img-top rounded-top"
                alt="Afang Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Afang Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Rich vegetable soup with fufu,{" "}
                  <span className="fw-bold text-danger">10% off</span>.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Discounts Button */}
        <div className="text-center mt-4">
          <button className="btn btn-danger btn-lg rounded-pill shadow">
            <i className="fas fa-arrow-right me-2"></i> View All Discounts
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiscountItems;
