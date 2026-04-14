function PopularItems() {
  return (
    <section className="py-5 bg-warning" id="popular">
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-4">
          <i className="fas fa-fire text-danger me-2"></i> Popular Meals
        </h2>
        <div className="row">
          {/* Fried Rice */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/Fried.webp"
                className="card-img-top rounded-top"
                alt="Fried Rice"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-danger fw-bold">Fried Rice</h5>
                <p className="card-text text-dark flex-grow-1">
                  Delicious fried rice with vegetables and chicken, a crowd favorite.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Coconut Rice */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/coconut.webp"
                className="card-img-top rounded-top"
                alt="Coconut Rice"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-danger fw-bold">Coconut Rice</h5>
                <p className="card-text text-dark flex-grow-1">
                  Fragrant coconut rice served with fish or chicken, rich and tasty.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Pepper Soup */}
          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 rounded">
              <img
                src="/src/assets/images/gallery/peppersoup.webp"
                className="card-img-top rounded-top"
                alt="Pepper Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-danger fw-bold">Pepper Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Spicy broth with assorted meat, a true Nigerian classic.
                </p>
                <button className="btn btn-success mt-auto">
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Popular Meals Button */}
        <div className="text-center mt-4">
          <button className="btn btn-danger btn-lg rounded-pill shadow">
            <i className="fas fa-arrow-right me-2"></i> View All Popular Meals
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularItems;
