import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import afangImg from "../assets/images/gallery/afang.webp";
import friedImg from "../assets/images/gallery/Fried.webp";
import coconutImg from "../assets/images/gallery/coconut.webp";
import pepperImg from "../assets/images/gallery/peppersoup.webp";

function PopularItems() {
  const navigate = useNavigate();

  const featuredDish = {
    img: afangImg,
    title: "Afang Soup",
    text: "Afang Soup is a beloved delicacy in Uyo — rich, hearty, and perfect with fufu.",
  };

  const popularItems = [
    {
      img: friedImg,
      title: "Fried Rice",
      text: "Delicious fried rice with vegetables and chicken, a crowd favorite.",
    },
    {
      img: coconutImg,
      title: "Coconut Rice",
      text: "Fragrant coconut rice served with fish or chicken, rich and tasty.",
    },
    {
      img: pepperImg,
      title: "Pepper Soup",
      text: "Spicy broth with assorted meat, a true Nigerian classic.",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="popular">
      <div className="container">

        {/* Section Title */}
        <motion.h2
          className="featured-title text-center fw-bold mb-5 position-relative d-inline-block mx-auto"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-star text-danger me-2"></i> 
          Featured Dish of the Week
        </motion.h2>

        {/* Featured Dish Spotlight */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="restaurant-card premium-card overflow-hidden position-relative shadow-lg">
            
            {/* Chef's Recommendation Badge */}
            <motion.span
              className="badge bg-danger position-absolute top-0 start-0 m-4 px-4 py-2 rounded-pill shadow fw-medium"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              👨‍🍳 Chef’s Recommendation
            </motion.span>

            <div className="row g-0">
              {/* Image Side */}
              <div className="col-md-5">
                <div className="position-relative h-100">
                  <img
                    src={featuredDish.img}
                    alt={featuredDish.title}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="col-md-7 d-flex flex-column justify-content-center p-4 p-md-5 text-center text-md-start">
                <h3 className="fw-bold text-danger mb-3">{featuredDish.title}</h3>
                <p className="text-dark lead mb-4">{featuredDish.text}</p>

                <button
                  className="premium-btn btn btn-warning rounded-pill fw-bold py-3 px-5 shadow-sm"
                  onClick={() =>
                    navigate(`/restaurants?dish=${encodeURIComponent(featuredDish.title)}&type=delivery`)
                  }
                >
                  <i className="fas fa-shopping-cart me-2"></i> 
                  Order Afang Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Popular Meals */}
        <motion.h3
          className="fw-bold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-fire text-danger me-2"></i> 
          Other Popular Meals
        </motion.h3>

        <div className="row g-4">
          {popularItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="restaurant-card premium-card h-100 overflow-hidden">
                <div className="position-relative" style={{ height: "250px" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="restaurant-img w-100 h-100"
                  />
                </div>

                <div className="card-body p-4 d-flex flex-column text-center">
                  <h5 className="card-title fw-bold text-danger mb-3">{item.title}</h5>
                  <p className="card-text text-dark flex-grow-1 mb-4">{item.text}</p>

                  <button
                    className="premium-btn btn btn-danger w-100 rounded-pill fw-bold py-3"
                    onClick={() =>
                      navigate(`/restaurants?dish=${encodeURIComponent(item.title)}&type=delivery`)
                    }
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="premium-btn btn btn-danger btn-lg rounded-pill px-5 py-3 shadow fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> 
            View All Popular Meals
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default PopularItems;