import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Images
import vegetableImg from "../assets/images/gallery/vegetable.webp";
import jollofImg from "../assets/images/gallery/jollof.webp";
import afangImg from "../assets/images/gallery/afang.webp";

function DiscountItems() {
  const navigate = useNavigate();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
  });

  const items = [
    {
      name: "Vegetable Soup",
      img: vegetableImg,
      discount: "20% OFF",
      badge: "🔥 Hot Deal",
      dish: "Vegetable Soup",
      rating: 4.6,
    },
    {
      name: "Jollof Rice",
      img: jollofImg,
      discount: "15% OFF",
      badge: "⭐ Top Pick",
      dish: "Jollof Rice",
      rating: 4.8,
    },
    {
      name: "Afang Soup",
      img: afangImg,
      discount: "10% OFF",
      badge: "👨‍🍳 Chef’s Choice",
      dish: "Afang",
      rating: 4.7,
    },
  ];

  return (
    <section className="discounts-section" id="discounts">
      <div className="container">

        {/* Section Header */}
        <motion.div className="section-header" {...fadeUp(0)}>
          <h2>🍽 Uyo‑Food Specials</h2>
          <p>
            Hot deals from your favorite local meals — freshly prepared & discounted.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="row g-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-12 col-md-6 col-lg-4"
              {...fadeUp(idx * 0.15)}
            >
              <div className="restaurant-card">

                {/* Tag */}
                <span className="restaurant-tag">{item.discount}</span>

                {/* Image */}
                <div className="restaurant-img-wrap">
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className="restaurant-banner"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="overlay">View Details</div>
                </div>

                {/* Content */}
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">{item.name}</h5>

                  {/* Rating */}
                  <div className="rating mb-2">
                    {Array.from({ length: Math.floor(item.rating) }).map((_, i) => (
                      <i key={i} className="fas fa-star text-warning"></i>
                    ))}
                    <small>({item.rating})</small>
                  </div>

                  <p className="description">
                    Freshly prepared and delivered hot to your doorstep.
                  </p>

                  {/* CTA Button */}
                  <button
                    className="restaurant-order-btn"
                    onClick={() =>
                      navigate(`/restaurants?dish=${item.dish}&type=delivery`)
                    }
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-5">
          <button
            className="restaurant-view-btn"
            onClick={() => navigate("/restaurants")}
          >
            View All Meals →
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiscountItems;
