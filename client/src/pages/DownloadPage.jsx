import { motion } from "framer-motion";
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
    { img: discountsIcon, title: "Daily Discounts", desc: "Save on authentic meals every day." },
    { img: trackingIcon, title: "Live Tracking", desc: "Know exactly when your food arrives." },
    { img: deliveryIcon, title: "Quick Delivery", desc: "Fresh dishes delivered right on time." },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="py-5 position-relative"
    >
      <div className="container">
        {/* Features Row */}
        <div className="row justify-content-center mb-5">
          <div className="col-xxl-10">
            <motion.div
              className="card shadow-lg border-0 premium-card"
              style={{
                borderRadius: "35px",
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.9)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-body py-5">
                <div className="row justify-content-evenly text-center">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="col-md-4 mb-4"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.img
                        src={feature.img}
                        width="80"
                        alt={feature.title}
                        className="mb-3"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <h3 className="fw-bold text-danger">{feature.title}</h3>
                      <p className="text-muted">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* App CTA Row */}
        <div className="row flex-center mt-md-8">
          {/* Phone Preview */}
          <motion.div
            className="col-lg-5 d-none d-lg-block"
            style={{ marginBottom: "-122px" }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img
              className="w-100 shadow-lg rounded"
              src={phoneImg}
              alt="Uyo-Food App Preview"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* CTA Content */}
          <motion.div
            className="col-lg-5 mt-7 mt-md-0 text-center text-lg-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1
              className="fw-bold mb-3 position-relative d-inline-block"
              style={{
                background: "linear-gradient(90deg, #dc3545, #ffc107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get the Uyo‑Food App
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
            </h1>
            <p className="fs-5 text-dark mb-4">
              Order authentic Uyo dishes with ease. Discover trusted restaurants, enjoy daily discounts, 
              and track your delivery in real time — all from your phone.
            </p>

            {/* Store Buttons + QR Code */}
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-lg-start">
              <motion.a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
              >
                <img src={appStoreImg} width="160" alt="Download on App Store" />
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
              >
                <img src={googlePlayImg} width="160" alt="Get it on Google Play" />
              </motion.a>
              <motion.div
                className="d-flex flex-column align-items-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <img
                  src={qrCodeImg}
                  alt="Scan QR Code to Download Uyo-Food App"
                  width="100"
                  className="shadow rounded"
                />
                <small className="text-muted mt-2">Scan to Download</small>
              </motion.div>
            </div>
          </motion.div>
        </div>
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
