import { motion } from "framer-motion";
import ctaBg from "../assets/images/gallery/cta-one-bg.png";
import discountsIcon from "../assets/images/icons/discounts.png";
import trackingIcon from "../assets/images/icons/live-tracking.png";
import deliveryIcon from "../assets/images/icons/quick-delivery.png";
import phoneImg from "../assets/images/gallery/phone-cta-one.png";
import appStoreImg from "../assets/images/gallery/app-store.svg";
import googlePlayImg from "../assets/images/gallery/google-play.svg";

export default function InstallAppCTA() {
  const features = [
    { img: discountsIcon, title: "Daily Discounts" },
    { img: trackingIcon, title: "Live Tracking" },
    { img: deliveryIcon, title: "Quick Delivery" },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-10">
            <div className="card card-span shadow-warning" style={{ borderRadius: "35px" }}>
              <div className="card-body py-5">
                <div className="row justify-content-evenly">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`col-md-3 ${index > 0 ? "hr-vertical" : ""}`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      data-aos="fade-up"
                    >
                      <div className="d-flex d-md-block d-xl-flex justify-content-evenly justify-content-lg-between">
                        <img src={feature.img} width="100" alt={feature.title} />
                        <div className="d-flex d-lg-block d-xl-flex flex-center">
                          <h2 className="fw-bolder text-1000 mb-0 text-gradient">{feature.title}</h2>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row flex-center mt-md-8">
          <motion.div
            className="col-lg-5 d-none d-lg-block"
            style={{ marginBottom: "-122px" }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-right"
          >
            <img className="w-100" src={phoneImg} alt="Phone CTA" />
          </motion.div>

          <motion.div
            className="col-lg-5 mt-7 mt-md-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="fade-left"
          >
            <h1 className="text-primary">Install the app</h1>
            <p>
              It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of
              delectable food.
            </p>
            <a className="pe-2" href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
              <img src={appStoreImg} width="160" alt="App Store" />
            </a>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noreferrer">
              <img src={googlePlayImg} width="160" alt="Google Play" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
