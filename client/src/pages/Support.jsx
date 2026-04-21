import { motion } from "framer-motion";

export default function Support() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse restaurants on the app or website, add dishes to your cart, and proceed to checkout. You can pay online or on delivery.",
    },
    {
      question: "Can I track my delivery?",
      answer:
        "Yes, once your order is confirmed, you can track your rider in real time until your meal arrives.",
    },
    {
      question: "What if my food arrives cold?",
      answer:
        "We guarantee freshness. If your food arrives cold or unsatisfactory, contact support immediately for a refund or replacement.",
    },
    {
      question: "How do I become a rider?",
      answer:
        "Visit the Deliver page or click 'Deliver with Uyo‑Food' in the footer to apply and join our rider network.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="support">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Help & Support
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          Need help with your order, delivery, or account? Find answers to
          common questions below or reach out to our support team.
        </motion.p>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="accordion-item mb-3"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <h2 className="accordion-header" id={`heading${idx}`}>
                <button
                  className="accordion-button collapsed fw-bold text-danger"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${idx}`}
                  aria-expanded="false"
                  aria-controls={`collapse${idx}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${idx}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${idx}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-secondary">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.8)}>
          <p className="text-secondary">
            Still need help? Contact us at{" "}
            <a
              href="mailto:support@uyofood.com"
              className="text-danger fw-bold"
            >
              support@uyofood.com
            </a>{" "}
            or call{" "}
            <a href="tel:+2348068199955" className="text-danger fw-bold">
              +234 806 819 9955
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
