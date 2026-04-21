import { motion } from "framer-motion";

export default function Partner() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const benefits = [
    {
      title: "Expand Your Reach",
      description:
        "Connect with thousands of hungry customers across Uyo and nearby cities.",
      icon: "fas fa-users",
    },
    {
      title: "Boost Sales",
      description:
        "Increase your restaurant’s revenue with online orders and delivery.",
      icon: "fas fa-chart-line",
    },
    {
      title: "Seamless Technology",
      description:
        "Easy‑to‑use dashboard to manage menus, track orders, and monitor performance.",
      icon: "fas fa-laptop",
    },
  ];

  return (
    <section className="py-5 bg-light" id="partner">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Partner with Uyo‑Food
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          Join our growing network of restaurants and bring your dishes to more
          customers. Uyo‑Food helps you grow while staying true to your brand.
        </motion.p>

        <div className="row text-center">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 p-4">
                <i className={`${benefit.icon} fs-1 text-danger mb-3`}></i>
                <h5 className="fw-bold text-danger">{benefit.title}</h5>
                <p className="text-secondary">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.8)}>
          <a
            href="/signup"
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold"
          >
            <i className="fas fa-handshake me-2"></i> Become a Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
}
