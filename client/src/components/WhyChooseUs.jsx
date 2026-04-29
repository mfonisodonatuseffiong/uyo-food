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

        {/* Section Title */}
        <motion.h2
          className="featured-title text-center fw-bold mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose Uyo‑Food
        </motion.h2>

        {/* Features Grid */}
        <div className="row g-4">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className="col-md-6 col-lg-3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="why-card premium-card h-100 text-center p-4">
                <motion.div
                  className="icon-wrapper mb-4"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                >
                  <i className={`${reason.icon} text-danger`} />
                </motion.div>

                <h5 className="fw-bold text-dark mb-3">{reason.title}</h5>
                <p className="text-secondary mb-0">{reason.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .why-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
        }

        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .icon-wrapper {
          width: 85px;
          height: 85px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.4rem;
          background: rgba(220, 53, 69, 0.08);
          border-radius: 50%;
        }

        @keyframes pulseUnderline {
          0% { transform: scaleX(0.8); opacity: 0.6; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0.8); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}