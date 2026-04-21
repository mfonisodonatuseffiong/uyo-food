import { motion } from "framer-motion";

export default function Footer() {
  const companyLinks = [
    { label: "About Uyo‑Food", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ];

  const contactLinks = [
    { label: "Help & Support", href: "/support" },
    { label: "Partner with Us", href: "/partner" },
    { label: "Deliver with Uyo‑Food", href: "/deliver" },
    { label: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund & Cancellation", href: "/refund" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <footer className="bg-danger text-white pt-5">
      <div className="container">
        <div className="row">
          {/* Company */}
          <motion.div className="col-6 col-md-3 mb-3" {...fadeUp(0)}>
            <h5 className="fw-bold">Company</h5>
            <ul className="list-unstyled">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a className="text-decoration-none text-warning" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="col-6 col-md-3 mb-3" {...fadeUp(0.2)}>
            <h5 className="fw-bold">Contact</h5>
            <ul className="list-unstyled">
              {contactLinks.map(({ label, href }) => (
                <li key={label}>
                  <a className="text-decoration-none text-warning" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="col-6 col-md-3 mb-3" {...fadeUp(0.4)}>
            <h5 className="fw-bold">Legal</h5>
            <ul className="list-unstyled">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a className="text-decoration-none text-warning" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social + Tagline */}
          <motion.div
            className="col-12 col-md-3 mt-4 mt-md-0 text-center text-md-start"
            {...fadeUp(0.6)}
          >
            <h5 className="fw-bold mb-3">Stay Connected</h5>
            <div className="my-3">
              <a href="https://instagram.com/uyofood" aria-label="Instagram">
                <i className="fab fa-instagram fs-3 me-3 text-white"></i>
              </a>
              <a href="https://facebook.com/uyofood" aria-label="Facebook">
                <i className="fab fa-facebook fs-3 me-3 text-white"></i>
              </a>
              <a href="https://twitter.com/uyofood" aria-label="Twitter">
                <i className="fab fa-twitter fs-3 text-white"></i>
              </a>
            </div>
            <h4 className="fw-bold">
              <span className="text-white">Fresh Meals</span>{" "}
              <span className="text-warning">Hot Deals</span>{" "}
              <span className="text-white">Delivered Fast</span>
            </h4>
          </motion.div>
        </div>

        <hr className="border-light mt-4" />

        {/* Footer bottom */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              © {new Date().getFullYear()} Uyo‑Food. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0">
              Powered By: <i className="bi bi-suit-heart-fill text-warning"></i>{" "}
              <a
                className="fw-bold text-white"
                href="https://donatech.dev"
                target="_blank"
                rel="noreferrer"
              >
                DonaTech
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
