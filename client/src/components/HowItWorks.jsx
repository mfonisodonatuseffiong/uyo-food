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
      img: locationImg,
      title: "Select Location",
      text: "Tell us where in Uyo you’d like your food delivered.",
    },
    {
      img: orderImg,
      title: "Choose Your Dish",
      text: "Browse authentic menus and pick your favourite local meal.",
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
    <section
      className="py-5 position-relative"
      id="how-it-works"
      style={{
        backgroundImage: "url('/src/assets/images/gallery/food-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container position-relative">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9">
            {/* Section Title */}
            <div className="col-lg-6 text-center mx-auto mb-3 mb-md-5 mt-4">
              <motion.h2
                className="fw-bold text-danger fs-3 fs-lg-5 lh-sm my-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                How Uyo-Food Works
              </motion.h2>
              <p className="text-muted">
                Simple steps to get your favourite dishes delivered fast.
              </p>
            </div>

            {/* Steps */}
            <div className="row">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="col-sm-6 col-md-3 mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center p-3 bg-white rounded shadow-sm h-100">
                    <img
                      className="shadow-icon mb-3"
                      src={step.img}
                      height="100"
                      alt={step.title}
                    />
                    <h5 className="fw-bold text-warning">{step.title}</h5>
                    <p className="text-dark">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="text-center mt-4">
              <button
                className="btn btn-danger rounded-pill shadow fw-bold px-4 me-3"
                onClick={() => navigate("/restaurants?type=delivery")}
              >
                <i className="fas fa-utensils me-2"></i> Start Ordering
              </button>
              <button
                className="btn btn-warning rounded-pill shadow fw-bold px-4"
                onClick={() => navigate("/restaurants")}
              >
                <i className="fas fa-list me-2"></i> Explore Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
