import { motion } from "framer-motion";

function DiscoverUyo() {
  return (
    <section
      className="position-relative text-white py-5 d-flex align-items-center"
      style={{ minHeight: "70vh" }}
    >
      {/* Background video with multiple sources and fallback image */}
      <video
        className="position-absolute top-0 start-0 w-100 h-100"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/uyo.jpg" // ✅ fallback image
        style={{ objectFit: "cover", filter: "brightness(0.5)" }}
      >
        <source src="/videos/uyo-town.mp4" type="video/mp4" />
        <source src="/videos/uyo-town.webm" type="video/webm" />
        <img
          src="/images/uyo.jpg"
          alt="Discover Uyo"
          className="w-100 h-100"
          style={{ objectFit: "cover", filter: "brightness(0.5)" }}
        />
      </video>

      {/* Overlay content */}
      <div className="container position-relative text-center">
        <motion.h2
          className="fw-bold display-5 mb-3 position-relative d-inline-block"
          style={{
            background: "linear-gradient(90deg, #ffc107, #fff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Discover Uyo
          <span
            className="position-absolute start-50 translate-middle-x"
            style={{
              bottom: "-8px",
              width: "60%",
              height: "4px",
              background: "linear-gradient(90deg, #ffc107, #fff)",
              borderRadius: "2px",
              animation: "pulseUnderline 2s infinite",
            }}
          ></span>
        </motion.h2>

        <motion.p
          className="lead mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Experience the vibrant streets, rich culture, and warm hospitality of Uyo. 
          More than food, it’s a lifestyle.
        </motion.p>

        <motion.a
          href="#restaurants"
          className="btn btn-warning fw-bold rounded-pill px-4 shadow-lg premium-btn"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          animate={{ scale: [1, 1.05, 1] }}
          style={{
            backdropFilter: "blur(6px)",
            background: "rgba(255,193,7,0.9)",
            border: "none",
          }}
        >
          Explore Restaurants <i className="fas fa-chevron-right ms-2"></i>
        </motion.a>
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

export default DiscoverUyo;
