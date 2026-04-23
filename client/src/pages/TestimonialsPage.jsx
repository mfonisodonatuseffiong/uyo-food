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
        <h2 className="fw-bold text-danger mb-5 text-center">
          <i className="fas fa-comments text-warning me-2"></i>
          What People Say
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
              className="card shadow rounded-4 text-center p-4"
              style={{
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="rounded-circle mb-3 mx-auto"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />

              <h5 className="fw-bold text-danger">{t.name}</h5>
              <p className="text-warning mb-2">{t.role}</p>
              <p className="text-secondary fst-italic">
                “{t.feedback}”
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}