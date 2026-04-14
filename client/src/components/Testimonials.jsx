function Testimonials() {
    return (
      <section className="py-5 bg-light" id="testimonials">
        <div className="container">
          <h2 className="text-center fw-bold text-success mb-4">
            <i className="fas fa-comments me-2 text-danger"></i> Customer Reviews
          </h2>
          <div className="row">
            {/* Review 1 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow h-100 rounded">
                <div className="card-body d-flex flex-column text-center">
                  <p className="card-text text-dark flex-grow-1">
                    “The fried rice was amazing! Fresh, tasty, and delivered right on time.”
                  </p>
                  <h6 className="fw-bold text-warning mt-auto">— Ada, Uyo</h6>
                </div>
              </div>
            </div>
  
            {/* Review 2 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow h-100 rounded">
                <div className="card-body d-flex flex-column text-center">
                  <p className="card-text text-dark flex-grow-1">
                    “Coconut rice was rich and flavorful. I’ll definitely order again.”
                  </p>
                  <h6 className="fw-bold text-warning mt-auto">— Emeka, Calabar</h6>
                </div>
              </div>
            </div>
  
            {/* Review 3 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow h-100 rounded">
                <div className="card-body d-flex flex-column text-center">
                  <p className="card-text text-dark flex-grow-1">
                    “Pepper soup was spicy and comforting. Perfect for a rainy day.”
                  </p>
                  <h6 className="fw-bold text-warning mt-auto">— Ini, Uyo</h6>
                </div>
              </div>
            </div>
          </div>
  
          {/* Call to Action */}
          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg rounded-pill shadow">
              <i className="fas fa-pencil-alt me-2"></i> Leave a Review
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  export default Testimonials;
  