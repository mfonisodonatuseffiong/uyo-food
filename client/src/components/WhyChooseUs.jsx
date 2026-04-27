import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "fas fa-bolt",
      title: "Lightning Fast Delivery",
      text: "Get your favourite meals delivered hot and fresh in minutes.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure Payments",
      text: "Pay confidently with trusted and safe payment options.",
    },
    {
      icon: "fas fa-utensils",
      title: "Authentic Local Dishes",
      text: "Enjoy the rich taste of Uyo’s delicacies from top restaurants.",
    },
    {
      icon: "fas fa-users",
      title: "Community Driven",
      text: "Supporting local restaurants, riders, and customers together.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="why-choose-us">
      <div className="container">
        {/* Gradient Title */}
        <motion.h2
          className="fw-bold text-center mb-5 position-relative d-inline-block"
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose Uyo‑Food
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

        {/* Reasons Grid */}
        <div className="row">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-3 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="card shadow-lg h-100 text-center p-4 premium-card"
                style={{
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.9)",
                  transition: "transform 0.3s ease",
                }}
              >
                <motion.i
                  className={`${reason.icon} text-danger mb-3`}
                  style={{ fontSize: "2rem" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                ></motion.i>
                <h5 className="fw-bold text-dark">{reason.title}</h5>
                <p className="text-secondary">{reason.text}</p>
              </div>
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
        `}
      </style>
    </section>
  );
}
