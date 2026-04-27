import { motion } from "framer-motion";
import afangImg from "../assets/images/gallery/afang.webp";
import ekpangImg from "../assets/images/gallery/ekpang.webp";
import edikangikongImg from "../assets/images/gallery/edikangikong.webp";

export default function LocalDishes() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const dishes = [
    {
      name: "Afang Soup",
      description:
        "A rich vegetable soup made with Afang leaves and waterleaf, served with garri or fufu.",
      image: afangImg,
      link: "/restaurants?dish=Afang%20Soup&type=delivery",
      alt: "Plate of Afang Soup served with fufu",
    },
    {
      name: "Ekpang Nkukwo",
      description:
        "A traditional delicacy made with grated cocoyam wrapped in leaves, cooked with palm oil and spices.",
      image: ekpangImg,
      link: "/restaurants?dish=Ekpang%20Nkukwo&type=delivery",
      alt: "Ekpang Nkukwo wrapped in leaves with palm oil",
    },
    {
      name: "Edikaikong Soup",
      description:
        "Nutritious soup made with pumpkin leaves and waterleaf, rich in flavor and nutrients.",
      image: edikangikongImg,
      link: "/restaurants?dish=Edikaikong%20Soup&type=delivery",
      alt: "Edikaikong Soup rich with pumpkin leaves",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="local-dishes">
      <div className="container">
        {/* Gradient Section Title */}
        <motion.h2
          className="fw-bold mb-5 text-center position-relative d-inline-block"
          {...fadeUp(0)}
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <i className="fas fa-utensils text-danger me-2"></i> Local Dish Deals
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
          {dishes.map((dish, idx) => (
            <motion.div
              key={idx}
              className="col-12 col-md-6 col-lg-4 mb-4" // responsive grid
              {...fadeUp(0.2 + idx * 0.2)}
            >
              <motion.div
                className="card shadow-lg h-100 rounded-4 overflow-hidden premium-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <div
                  className="food-thumbnail overflow-hidden position-relative"
                  style={{ height: "220px" }}
                >
                  <motion.img
                    src={dish.image}
                    alt={dish.alt}          // descriptive alt text
                    className="card-img-top"
                    style={{ height: "100%", objectFit: "cover" }}
                    loading="lazy"          // lazy load for performance
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    View Details
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="fw-bold text-dark">{dish.name}</h5>
                  <p className="text-secondary">{dish.description}</p>
                  <motion.a
                    href={dish.link}
                    className="btn btn-danger fw-bold rounded-pill mt-3 shadow premium-btn"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Order Now <i className="fas fa-shopping-cart ms-2"></i>
                  </motion.a>
                </div>
              </motion.div>
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
          .premium-card {
            transition: transform 0.3s ease;
          }
          .premium-card:hover {
            transform: translateY(-5px);
          }
          .premium-card .overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.4);
            color: #fff;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
          }
          .premium-card:hover .overlay {
            opacity: 1;
          }
          .premium-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .premium-btn:hover {
            box-shadow: 0 0 12px rgba(220, 53, 69, 0.6);
          }
        `}
      </style>
    </section>
  );
}
