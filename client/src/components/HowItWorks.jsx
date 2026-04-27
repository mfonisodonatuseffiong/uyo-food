import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import locationImg from "../assets/images/gallery/location.png";
import orderImg from "../assets/images/gallery/order.png";
import payImg from "../assets/images/gallery/pay.png";
import mealsImg from "../assets/images/gallery/meals.png";

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
    <section className="py-5 bg-warning position-relative" id="how-it-works">
      <div className="container position-relative">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9">
            {/* Section Title */}
            <div className="col-lg-6 text-center mx-auto mb-3 mb-md-5 mt-4 position-relative d-inline-block">
              <motion.h2
                className="fw-bold fs-2 fs-lg-4 lh-sm my-4"
                style={{
                  background: "linear-gradient(90deg, #dc3545, #ffc107)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                How Uyo-Food Works
              </motion.h2>
              {/* Animated underline */}
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
              <p className="text-dark mt-3">
                Simple steps to get your favourite dishes delivered fast.
              </p>
            </div>

            {/* Steps with connecting line */}
            <div className="position-relative">
              {/* Progress line */}
              <div
                className="position-absolute top-50 start-0 w-100"
                style={{
                  borderTop: "3px dashed #dc3545",
                  zIndex: 1,
                  opacity: 0.4,
                }}
              ></div>

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
                    <div
                      className="glass-card text-center p-4 rounded shadow-lg h-100 premium-card position-relative"
                      style={{
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        zIndex: 2,
                      }}
                    >
                      {/* Numbered step indicator */}
                      <span
                        className="badge bg-danger position-absolute top-0 start-50 translate-middle-x shadow-sm"
                        style={{ fontSize: "0.9rem", marginTop: "-12px" }}
                      >
                        {index + 1}
                      </span>

                      <img
                        className="shadow-icon mb-3 food-thumbnail"
                        src={step.img}
                        height="100"
                        alt={step.title}
                        style={{ transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                      <h5 className="fw-bold text-danger">{step.title}</h5>
                      <p className="text-dark small">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="text-center mt-4">
              <button
                className="glass-btn btn btn-danger rounded-pill fw-bold px-4 me-3 shadow-sm"
                onClick={() => navigate("/restaurants?type=delivery")}
              >
                <i className="fas fa-utensils me-2"></i> Start Ordering
              </button>
              <button
                className="glass-btn btn btn-warning rounded-pill fw-bold px-4 shadow-sm"
                onClick={() => navigate("/restaurants")}
              >
                <i className="fas fa-list me-2"></i> Explore Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated underline keyframes */}
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
