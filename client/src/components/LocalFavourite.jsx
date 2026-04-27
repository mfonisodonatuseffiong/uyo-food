import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dishes from "../data/dishes"; // ✅ external data file

function LocalFavourite() {
  // ✅ Only show first 4 dishes
  const visibleDishes = dishes.slice(0, 4);

  return (
    <section className="py-5 bg-warning" id="local-favourites">
      <div className="container">
        {/* Gradient Section Title */}
        <motion.h2
          className="fw-bold text-center mb-4 position-relative d-inline-block"
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-utensils me-2 text-danger"></i> Local Favourites
          <span
            className="position-absolute start-50 translate-middle-x"
            style={{
              bottom: "-8px",
              width: "60%",
              height: "4px",
              background: "linear-gradient(90deg, #dc3545, #ffc107)",
              borderRadius: "2px",
              animation: "pulseUnderline 2s infinite",
            }}
          ></span>
        </motion.h2>

        <div className="row">
          {visibleDishes.map((dish, idx) => (
            <motion.div
              key={idx}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/restaurants?dish=${encodeURIComponent(dish.name)}`}
                className="text-decoration-none"
              >
                <div
                  className="card shadow-lg h-100 rounded text-center premium-card position-relative overflow-hidden"
                  style={{
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.9)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {/* Thumbnail with hover overlay */}
                  <div className="food-thumbnail position-relative" style={{ height: "160px" }}>
                    <motion.img
                      src={dish.image}
                      className="card-img-top"
                      alt={dish.name}
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      whileHover={{ scale: 1.05 }}
                    />
                    {dish.tag && (
                      <motion.span
                        className="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill shadow-sm"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {dish.tag}
                      </motion.span>
                    )}
                    {/* Hover overlay */}
                    <div
                      className="overlay d-flex align-items-center justify-content-center"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        fontWeight: "bold",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      View Details
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column p-3">
                    <h6 className="card-title text-dark fw-bold mb-1">{dish.name}</h6>
                    {dish.price && (
                      <p className="text-warning fw-bold mb-1 small">₦{dish.price}</p>
                    )}
                    {/* Ellipsis for long text */}
                    <p
                      className="card-text text-secondary flex-grow-1 small mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {dish.description}
                    </p>

                    {/* Ratings safe check */}
                    <div className="mb-2">
                      {dish.rating ? (
                        <>
                          {Array.from({ length: Math.floor(dish.rating) }).map((_, i) => (
                            <i key={i} className="fas fa-star text-warning me-1"></i>
                          ))}
                          <span className="small text-muted">{dish.rating.toFixed(1)}</span>
                        </>
                      ) : (
                        <span className="small text-muted">No rating yet</span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      <motion.span
                        className="btn btn-danger fw-bold rounded-pill btn-sm shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <i className="fas fa-shopping-cart me-1"></i> Order
                      </motion.span>
                      <span className="btn btn-outline-danger rounded-pill btn-sm">+</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes pulseUnderline {
            0% { transform: scaleX(0.8); opacity: 0.6; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0.8); opacity: 0.6; }
          }
        `}
      </style>
    </section>
  );
}

export default LocalFavourite;
