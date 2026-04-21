import { motion } from "framer-motion";

export default function TestimonialsPage() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const testimonials = [
    {
      name: "Grace Udo",
      role: "Customer",
      feedback:
        "Uyo‑Food has completely changed how I order meals. Fast delivery and authentic taste every time!",
      image: "/src/assets/images/testimonials/grace.webp",
    },
    {
      name: "Michael Okon",
      role: "Restaurant Partner",
      feedback:
        "Partnering with Uyo‑Food has boosted my restaurant’s sales. The platform is easy to use and reliable.",
      image: "/src/assets/images/testimonials/michael.webp",
    },
    {
      name: "Sarah Effiong",
      role: "Rider",
      feedback:
        "As a rider, I love the flexibility. I can choose my hours and still earn well while serving the community.",
      image: "/src/assets/images/testimonials/sarah.webp",
    },
  ];

  return (
    <section className="py-5 bg-light" id="testimonials">
      <div className="container">
        <motion.h2
          className="fw-bold text-danger mb-5 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-comments text-warning me-2"></i> What People Say
        </motion.h2>

        <div className="row">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.2 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 text-center p-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h5 className="fw-bold text-danger">{t.name}</h5>
                <p className="text-warning mb-2">{t.role}</p>
                <p className="text-secondary fst-italic">“{t.feedback}”</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
