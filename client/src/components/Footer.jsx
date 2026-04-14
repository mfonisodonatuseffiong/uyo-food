import { motion } from "framer-motion";

export default function Footer() {
  const topCities = [
    ["San Francisco", "Miami", "San Diego", "East Bay", "Long Beach"],
    ["Los Angeles", "Washington DC", "Seattle", "Portland", "Nashville"],
    ["New York City", "Orange County", "Atlanta", "Charlotte", "Denver"],
    ["Chicago", "Phoenix", "Las Vegas", "Sacramento", "Oklahoma City"],
    ["Columbus", "New Mexico", "Albuquerque", "Sacramento", "New Orleans"],
  ];

  const companyLinks = ["About Us", "Team", "Careers", "Blog"];
  const contactLinks = ["Help & Support", "Partner with us", "Ride with us"];
  const legalLinks = ["Terms & Conditions", "Refund & Cancellation", "Privacy Policy", "Cookie Policy"];

  return (
    <section className="py-0 pt-7 bg-1000">
      <div className="container">
        {/* Top Cities */}
        <div className="row justify-content-lg-between">
          <h5 className="lh-lg fw-bold text-white">OUR TOP CITIES</h5>
          {topCities.map((group, idx) => (
            <motion.div
              key={idx}
              className="col-6 col-md-4 col-lg-auto mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              data-aos="fade-up"
            >
              <ul className="list-unstyled mb-md-4 mb-lg-0">
                {group.map((city, i) => (
                  <li key={i} className="lh-lg">
                    <a className="text-200 text-decoration-none" href="#!">
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <hr className="text-900" />

        {/* Company, Contact, Legal */}
        <div className="row">
          <motion.div
            className="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h5 className="lh-lg fw-bold text-white">COMPANY</h5>
            <ul className="list-unstyled mb-md-4 mb-lg-0">
              {companyLinks.map((link, i) => (
                <li key={i} className="lh-lg">
                  <a className="text-200 text-decoration-none" href="#!">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h5 className="lh-lg fw-bold text-white">CONTACT</h5>
            <ul className="list-unstyled mb-md-4 mb-lg-0">
              {contactLinks.map((link, i) => (
                <li key={i} className="lh-lg">
                  <a className="text-200 text-decoration-none" href="#!">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h5 className="lh-lg fw-bold text-white">LEGAL</h5>
            <ul className="list-unstyled mb-md-4 mb-lg-0">
              {legalLinks.map((link, i) => (
                <li key={i} className="lh-lg">
                  <a className="text-200 text-decoration-none" href="#!">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="col-12 col-md-8 col-lg-6 col-xxl-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <h5 className="lh-lg fw-bold text-500">FOLLOW US</h5>
            <div className="text-start my-3">
              {/* Social icons */}
              <a href="#!"><i className="fab fa-instagram fs-2 me-2 text-500"></i></a>
              <a href="#!"><i className="fab fa-facebook fs-2 mx-2 text-500"></i></a>
              <a href="#!"><i className="fab fa-twitter fs-2 mx-2 text-500"></i></a>
            </div>
            <h3 className="text-500 my-4">Receive exclusive offers and <br />discounts in your mailbox</h3>
            <div className="row input-group-icon mb-5">
              <div className="col-auto">
                <i className="fas fa-envelope input-box-icon text-500 ms-3"></i>
                <input
                  className="form-control input-box bg-800 border-0"
                  type="email"
                  placeholder="Enter Email"
                  aria-label="email"
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </div>

        <hr className="border border-800" />

        {/* Footer bottom */}
        <div className="row flex-center pb-3">
          <div className="col-md-6 order-0">
            <p className="text-200 text-center text-md-start">
              All rights Reserved &copy; Uyo Food, 2026
            </p>
          </div>
          <div className="col-md-6 order-1">
            <p className="text-200 text-center text-md-end">
              Made with <i className="bi bi-suit-heart-fill text-warning"></i> by{" "}
              <a className="text-200 fw-bold" href="DonaTech" target="_blank" rel="noreferrer">
                DonaTech
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
