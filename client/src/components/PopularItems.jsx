import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PopularItems() {
  const navigate = useNavigate();

  const featuredDish = {
    img: "/src/assets/images/gallery/afang.webp",
    title: "Afang Soup",
    text: "Afang Soup is a beloved delicacy in Uyo — rich, hearty, and perfect with fufu.",
  };

  const items = [
    {
      img: "/src/assets/images/gallery/Fried.webp",
      title: "Fried Rice",
      text: "Delicious fried rice with vegetables and chicken, a crowd favorite.",
    },
    {
      img: "/src/assets/images/gallery/coconut.webp",
      title: "Coconut Rice",
      text: "Fragrant coconut rice served with fish or chicken, rich and tasty.",
    },
    {
      img: "/src/assets/images/gallery/peppersoup.webp",
      title: "Pepper Soup",
      text: "Spicy broth with assorted meat, a true Nigerian classic.",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="popular">
      <div className="container">
        {/* Section Title */}
        <motion.h2
          className="text-center fw-bold text-dark mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-star text-danger me-2"></i> Featured Dish of the Week
        </motion.h2>

        {/* Featured Dish Spotlight */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden position-relative">
            {/* Chef Recommendation Badge */}
            <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow">
              👨‍🍳 Chef’s Recommendation
            </span>

            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={featuredDish.img}
                  alt={featuredDish.title}
                  className="img-fluid h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-md-7 d-flex flex-column justify-content-center p-4 text-center text-md-start">
                <h3 className="fw-bold text-danger">{featuredDish.title}</h3>
                <p className="text-dark">{featuredDish.text}</p>
                <button
                  className="btn btn-warning rounded-pill fw-bold shadow-sm mt-3"
                  onClick={() =>
                    navigate(`/restaurants?dish=${encodeURIComponent(featuredDish.title)}&type=delivery`)
                  }
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Afang Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Popular Meals */}
        <motion.h3
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-fire text-danger me-2"></i> Other Popular Meals
        </motion.h3>

        <div className="row">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card shadow h-100 rounded">
                <img
                  src={item.img}
                  className="card-img-top rounded-top"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title text-danger fw-bold">{item.title}</h5>
                  <p className="card-text text-dark flex-grow-1">{item.text}</p>
                  <button
                    className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
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

        {/* View All Popular Meals Button */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Popular Meals
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default PopularItems;
