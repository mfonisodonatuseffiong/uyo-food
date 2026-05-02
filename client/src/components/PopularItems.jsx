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
    <section className="popular-section" id="popular">
      <div className="container">

        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>
            <i className="fas fa-star text-danger me-2"></i>
            Featured Dish of the Week
          </h2>
          <p>
            Spotlight on the chef’s recommendation — freshly prepared and loved by locals.
          </p>
        </motion.div>

        {/* Featured Dish Spotlight */}
        <motion.div
          className="restaurant-card featured-card mb-5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <span className="restaurant-tag">👨‍🍳 Chef’s Recommendation</span>

          <div className="row g-0 align-items-center">
            {/* Image */}
            <div className="col-md-5">
              <div className="restaurant-img-wrap featured-img">
                <img
                  src={featuredDish.img}
                  alt={featuredDish.title}
                  className="restaurant-banner"
                />
              </div>
            </div>

            {/* Content */}
            <div className="col-md-7 p-4 p-lg-5 text-center text-md-start">
              <h3 className="fw-bold text-danger mb-3">{featuredDish.title}</h3>
              <p className="text-dark lead mb-4">{featuredDish.text}</p>

              <button
                className="restaurant-order-btn"
                onClick={() =>
                  navigate(`/restaurants?dish=${encodeURIComponent(featuredDish.title)}&type=delivery`)
                }
              >
                <i className="fas fa-shopping-cart me-2"></i>
                Order Afang Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Other Popular Meals */}
        <motion.h3
          className="section-subheader"
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
              <div className="restaurant-card text-center">
                <div className="restaurant-img-wrap popular-img">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="restaurant-banner"
                  />
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="fw-bold text-danger mb-3">{item.title}</h5>
                  <p className="text-dark flex-grow-1 mb-4">{item.text}</p>

                  <button
                    className="restaurant-order-btn"
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
            className="restaurant-order-btn"
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
