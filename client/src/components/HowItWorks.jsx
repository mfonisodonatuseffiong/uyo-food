import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import locationImg from "../assets/images/gallery/location.png";
import orderImg from "../assets/images/gallery/order.png";
import payImg from "../assets/images/gallery/pay.png";
import mealsImg from "../assets/images/gallery/meals.png";
import "../styles/howItWorks.css";

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      img: orderImg,
      title: "Choose Your Dish",
      text: "Browse authentic menus and pick your favourite local meal.",
    },
    {
      img: locationImg,
      title: "Select Location",
      text: "Tell us where in Uyo you’d like your food delivered.",
    },
    {
      img: payImg,
      title: "Secure Payment",
      text: "Pay easily with safe and trusted payment options.",
    },
    {
      img: mealsImg,
      title: "Enjoy Your Meal",
      text: "Sit back and enjoy hot, fresh food delivered to your doorstep.",
    },
  ];

  return (
    <section className="how-section py-5" id="how-it-works">
      <div className="container">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9">

            {/* HEADER */}
            <div className="how-header text-center mx-auto">
              <motion.h2
                className="how-title fw-bold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                How Uyo-Food Works
              </motion.h2>

              <span className="how-underline"></span>

              <p className="how-subtitle mt-3">
                Simple steps to get your favourite dishes delivered fast.
              </p>
            </div>

            {/* STEPS */}
            <div className="how-steps position-relative">

              {/* dashed line */}
              <div className="how-line"></div>

              <div className="row position-relative">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="col-sm-6 col-md-3 mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="how-card text-center p-4 h-100">

                      {/* number */}
                      <span className="how-badge">
                        {index + 1}
                      </span>

                      {/* image */}
                      <img
                        src={step.img}
                        alt={step.title}
                        className="how-icon mb-3"
                      />

                      <h5 className="fw-bold text-danger">
                        {step.title}
                      </h5>

                      <p className="text-dark small">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-4">
              <button
                className="btn btn-danger rounded-pill fw-bold px-4 me-3 how-btn-primary"
                onClick={() => navigate("/restaurants?type=delivery")}
              >
                <i className="fas fa-utensils me-2"></i>
                Start Ordering
              </button>

              <button
                className="btn btn-warning rounded-pill fw-bold px-4 how-btn-secondary"
                onClick={() => navigate("/restaurants")}
              >
                <i className="fas fa-list me-2"></i>
                Explore Restaurants
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}