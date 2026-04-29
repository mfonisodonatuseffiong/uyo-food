import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ctaBg from "../assets/images/gallery/cta-one-bg.png";
import discountsIcon from "../assets/images/icons/discounts.png";
import trackingIcon from "../assets/images/icons/live-tracking.png";
import deliveryIcon from "../assets/images/icons/quick-delivery.png";
import phoneImg from "../assets/images/gallery/phone-cta-one.png";
import appStoreImg from "../assets/images/gallery/app-store.svg";
import googlePlayImg from "../assets/images/gallery/google-play.svg";
import qrCodeImg from "../assets/images/gallery/qr-code.png";

export default function InstallAppCTA() {
  const features = [
    {
      img: discountsIcon,
      title: "Daily Discounts",
      desc: "Save on authentic meals every day.",
    },
    {
      img: trackingIcon,
      title: "Live Tracking",
      desc: "Know exactly when your food arrives.",
    },
    {
      img: deliveryIcon,
      title: "Quick Delivery",
      desc: "Fresh dishes delivered right on time.",
    },
  ];

  return (
    <section
      className="py-5 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">

        {/* Features Cards */}
        <div className="row justify-content-center mb-5">
          <div className="col-xxl-10">
            <motion.div
              className="premium-card shadow-lg border-0 rounded-5 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="card-body py-5 px-4 px-md-5">
                <div className="row text-center">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="col-md-4 mb-4 mb-md-0"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <motion.img
                        src={feature.img}
                        alt={feature.title}
                        width="85"
                        className="mb-4"
                        whileHover={{ scale: 1.12, rotate: 5 }}
                        transition={{ duration: 0.4 }}
                      />
                      <h4 className="fw-bold text-danger mb-2">{feature.title}</h4>
                      <p className="text-muted mb-0">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main App CTA */}
        <div className="row align-items-center justify-content-center g-5">
          
          {/* Phone Preview */}
          <motion.div
            className="col-lg-5 text-center"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={phoneImg}
              alt="Uyo-Food Mobile App"
              className="img-fluid phone-mockup"
              whileHover={{ scale: 1.03, y: -10 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* CTA Content */}
          <motion.div
            className="col-lg-6 text-center text-lg-start"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="featured-title fw-bold display-4 mb-4">
              Get the Uyo‑Food App
            </h1>

            <p className="fs-5 text-dark mb-5">
              Order authentic Uyo dishes with ease. Discover trusted restaurants, 
              enjoy daily discounts, and track your delivery in real time — all from your phone.
            </p>

            {/* App Store Buttons & QR Code */}
            <div className="d-flex flex-wrap align-items-center gap-4 justify-content-center justify-content-lg-start">
              <motion.a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={appStoreImg} alt="Download on App Store" width="160" />
              </motion.a>

              <motion.a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={googlePlayImg} alt="Get it on Google Play" width="160" />
              </motion.a>

              <motion.div
                className="d-flex flex-column align-items-center ms-lg-3"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
              >
                <img
                  src={qrCodeImg}
                  alt="Scan QR Code"
                  width="110"
                  className="shadow rounded-3"
                />
                <small className="text-muted mt-2 fw-medium">Scan to Download</small>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pulse Underline Animation */}
      <style>{`
        @keyframes pulseUnderline {
          0% { transform: scaleX(0.8); opacity: 0.6; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0.8); opacity: 0.6; }
        }

        .phone-mockup {
          filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.25));
        }
      `}</style>
    </section>
  );
}