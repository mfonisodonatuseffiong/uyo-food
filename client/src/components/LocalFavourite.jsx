import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import dishes from "../data/dishes"; // ✅ external data file

function LocalFavourite() {
  return (
    <section className="py-5 bg-light" id="local-favourites">
      <div className="container">
        <h2 className="fw-bold text-center mb-4 text-danger">
          <i className="fas fa-utensils me-2 text-warning"></i> Local Favourites
        </h2>
        <div className="row">
          {dishes.map((dish, idx) => (
            <div key={idx} className="col-md-3 col-sm-6 mb-4">
              <motion.div
                className="card shadow h-100 rounded text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: dish.delay }}
                viewport={{ once: true }}
              >
                <img
                  src={dish.image}
                  className="card-img-top rounded-top"
                  alt={dish.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-warning fw-bold">{dish.name}</h5>
                  <p className="card-text text-dark flex-grow-1">{dish.description}</p>
                  {/* ✅ Use Link instead of <a> */}
                  <Link
                    to={`/restaurants?dish=${encodeURIComponent(dish.name)}`}
                    className="btn btn-danger fw-bold mt-auto"
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LocalFavourite;
