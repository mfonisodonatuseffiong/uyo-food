import { motion } from "framer-motion";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Ini Edo",
      role: "Customer",
      feedback:
        "Uyo-Food has completely changed how I order meals. Fast delivery and authentic taste every time!",
      image: "/src/assets/images/testimonials/iniedo.webp",
    },
    {
      name: "Okon Lagos",
      role: "Restaurant Partner",
      feedback:
        "Partnering with Uyo-Food has boosted my restaurant’s sales. The platform is easy to use and reliable.",
      image: "/src/assets/images/testimonials/okonlagos.webp",
    },
    {
      name: "Sarah Effiong",
      role: "Rider",
      feedback:
        "As a rider, I love the flexibility. I can choose my hours and still earn well while serving the community.",
      image: "/src/assets/images/testimonials/saraheffiong.webp",
    },
  ];

  return (
    <section className="py-5 bg-warning overflow-hidden" id="testimonials">
      <div className="container">
        {/* Gradient Section Title */}
        <h2
          className="fw-bold mb-5 text-center position-relative d-inline-block"
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <i className="fas fa-comments text-danger me-2"></i> What People Say
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
        </h2>
      </div>

      {/* Moving Cards */}
      <div className="overflow-hidden">
        <motion.div
          className="d-flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="card shadow-lg rounded-4 text-center p-4 premium-card"
              style={{
                minWidth: "300px",
                maxWidth: "300px",
                backdropFilter: "blur(6px)",
                background: "rgba(255,255,255,0.85)",
                transition: "transform 0.3s ease",
              }}
            >
              {/* Animated Avatar */}
              <motion.img
                src={t.image}
                alt={t.name}
                className="rounded-circle mb-3 mx-auto shadow-sm"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              <h5 className="fw-bold text-danger">{t.name}</h5>
              <p className="text-warning mb-2">{t.role}</p>
              <p
                className="text-secondary fst-italic"
                style={{ fontSize: "0.9rem", position: "relative" }}
              >
                <span style={{ color: "#dc3545", fontSize: "1.2rem" }}>“</span>
                {t.feedback}
                <span style={{ color: "#dc3545", fontSize: "1.2rem" }}>”</span>
              </p>
            </div>
          ))}
        </motion.div>
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
