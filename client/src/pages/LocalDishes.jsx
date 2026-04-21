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
    },
    {
      name: "Ekpang Nkukwo",
      description:
        "A traditional delicacy made with grated cocoyam wrapped in leaves, cooked with palm oil and spices.",
      image: ekpangImg,
      link: "/restaurants?dish=Ekpang%20Nkukwo&type=delivery",
    },
    {
      name: "Edikaikong Soup",
      description:
        "Nutritious soup made with pumpkin leaves and waterleaf, rich in flavor and nutrients.",
      image: edikangikongImg, // ✅ corrected variable
      link: "/restaurants?dish=Edikaikong%20Soup&type=delivery",
    },
  ];

  return (
    <section className="py-5 bg-light" id="local-dishes">
      <div className="container">
        <motion.h2
          className="fw-bold text-danger mb-5 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-utensils text-warning me-2"></i> Local Dish Deals
        </motion.h2>

        <div className="row">
          {dishes.map((dish, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.2 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold text-danger">{dish.name}</h5>
                  <p className="text-secondary">{dish.description}</p>
                  <a
                    href={dish.link}
                    className="btn btn-danger fw-bold rounded-pill shadow-sm mt-3"
                  >
                    Order Now <i className="fas fa-shopping-cart ms-2"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
