import { useNavigate } from "react-router-dom";

function DiscountItems() {
  const navigate = useNavigate();

  return (
    <section className="py-5 bg-light" id="discounts">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-center fw-bold text-danger mb-4">
          <i className="fas fa-tags me-2 text-warning"></i> Uyo-Food Specials
        </h2>
        <p className="text-center text-muted mb-5">
          Enjoy authentic local favourites at unbeatable prices — fresh, hot, and discounted just for you.
        </p>

        <div className="row">
          {/* Vegetable Soup */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/vegetable.webp"
                className="card-img-top rounded-top"
                alt="Vegetable Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Vegetable Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Freshly prepared vegetable soup, now{" "}
                  <span className="badge bg-danger text-white">20% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Vegetable Soup&type=delivery")}
                >
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
                  Classic Nigerian Jollof with chicken,{" "}
                  <span className="badge bg-danger text-white">15% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Jollof Rice&type=delivery")}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Afang Soup */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/afang.webp"
                className="card-img-top rounded-top"
                alt="Afang Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Afang Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Rich Afang soup served with fufu,{" "}
                  <span className="badge bg-danger text-white">10% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Afang&type=delivery")}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Discounts Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-warning btn-lg rounded-pill shadow fw-bold"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Discounts
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiscountItems;
