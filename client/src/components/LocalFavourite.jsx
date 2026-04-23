import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import dishes from "../data/dishes"; // ✅ external data file

function LocalFavourite() {
  return (
    <section className="py-5 bg-warning" id="local-favourites">
      <div className="container">
        <motion.h2
          className="fw-bold text-center mb-4 text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-utensils me-2 text-danger"></i> Local Favourites
        </motion.h2>

        <div className="row">
          {dishes.map((dish, idx) => (
            <motion.div
              key={idx}
              className="col-md-3 col-sm-6 mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: dish.delay }}
              viewport={{ once: true }}
            >
              <div className="card shadow h-100 rounded text-center glass-card">
                <div
                  className="food-thumbnail overflow-hidden"
                  style={{ height: "250px" }}
                >
                  <img
                    src={dish.image}
                    className="card-img-top"
                    alt={dish.name}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark fw-bold">{dish.name}</h5>
                  <p className="card-text text-secondary flex-grow-1">
                    {dish.description}
                  </p>
                  {/* ✅ Use Link instead of <a> */}
                  <Link
                    to={`/restaurants?dish=${encodeURIComponent(dish.name)}`}
                    className="glass-btn btn btn-danger fw-bold mt-auto rounded-pill"
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LocalFavourite;
