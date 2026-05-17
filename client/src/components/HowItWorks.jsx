import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import orderImg    from "../assets/images/gallery/order.png";
import locationImg from "../assets/images/gallery/location.png";
import payImg      from "../assets/images/gallery/pay.png";
import mealsImg    from "../assets/images/gallery/meals.png";
import "../styles/howItWorks.css";

// ── Static data outside component — never recreated on render ────────────────
const STEPS = [
  {
    img:   orderImg,
    alt:   "A bowl of local Nigerian food on a restaurant menu",
    title: "Choose Your Dish",
    text:  "Browse authentic Uyo restaurant menus and pick your favourite local meal.",
    icon:  "fas fa-utensils",
  },
  {
    img:   locationImg,
    alt:   "A map pin showing a delivery address in Uyo",
    title: "Set Your Location",
    text:  "Tell us exactly where in Uyo you want your food delivered.",
    icon:  "fas fa-map-marker-alt",
  },
  {
    img:   payImg,
    alt:   "A secure payment screen on a mobile phone",
    title: "Pay Securely",
    text:  "Complete your order with safe, trusted payment options.",
    icon:  "fas fa-lock",
  },
  {
    img:   mealsImg,
    alt:   "Hot food being delivered to a doorstep",
    title: "Enjoy Your Meal",
    text:  "Sit back — hot, fresh food arrives straight to your doorstep.",
    icon:  "fas fa-heart",
  },
];

export default function HowItWorks() {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);

  // ── CSS-only scroll animation via IntersectionObserver ───────────────────
  // No Framer Motion — saves ~30KB on slow Nigerian mobile connections
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll(".hiw__animate");

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("hiw__visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hiw__visible");
            // Animate once — unobserve after triggering
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="hiw"
      id="how-it-works"
      aria-labelledby="hiw-heading"
      ref={sectionRef}
    >
      <div className="hiw__inner">

        {/* ── Header ── */}
        <div className="hiw__header hiw__animate">
          <span className="hiw__eyebrow">Simple. Fast. Local.</span>
          <h2 className="hiw__title" id="hiw-heading">
            How Uyo Food Works
          </h2>
          <div className="hiw__underline" aria-hidden="true"></div>
          <p className="hiw__subtitle">
            From craving to doorstep in four easy steps.
          </p>
        </div>

        {/* ── Steps — semantic ordered list ── */}
        <ol className="hiw__steps" aria-label="How to order in 4 steps">

          {/* Connector line — rendered via CSS, not absolute positioning ── */}
          <li
            className="hiw__connector"
            aria-hidden="true"
          ></li>

          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="hiw__step hiw__animate"
              style={{ "--delay": `${i * 0.15}s` }}
              // FIX: aria-label communicates step number to screen readers
              aria-label={`Step ${i + 1} of ${STEPS.length}: ${step.title}`}
            >
              <div className="hiw__card">
                {/* Step number badge */}
                <div className="hiw__badge" aria-hidden="true">
                  {i + 1}
                </div>

                {/* Step image */}
                <div className="hiw__img-wrap">
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="hiw__img"
                    width="90"
                    height="90"
                    loading="lazy"
                  />
                </div>

                {/* Icon accent */}
                <div className="hiw__icon-accent" aria-hidden="true">
                  <i className={step.icon}></i>
                </div>

                {/* Text */}
                <h3 className="hiw__step-title">{step.title}</h3>
                <p className="hiw__step-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ── Progress bar hint ── */}
        <div className="hiw__progress" aria-hidden="true">
          {STEPS.map((step, i) => (
            <div key={step.title} className="hiw__progress-step">
              <div className="hiw__progress-dot">
                <i className={step.icon}></i>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hiw__progress-line"></div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div className="hiw__cta-row hiw__animate" style={{ "--delay": "0.6s" }}>
          <Link
            to="/restaurants?type=delivery"
            className="hiw__cta-primary"
          >
            <i className="fas fa-bolt" aria-hidden="true"></i>
            Start Ordering
          </Link>

          <Link
            to="/restaurants"
            className="hiw__cta-secondary"
          >
            <i className="fas fa-store" aria-hidden="true"></i>
            Browse Restaurants
          </Link>
        </div>

        {/* ── Trust note ── */}
        <p className="hiw__trust hiw__animate" style={{ "--delay": "0.75s" }}>
          <i className="fas fa-shield-alt" aria-hidden="true"></i>
          Trusted by thousands of customers across Uyo, Akwa Ibom
        </p>

      </div>
    </section>
  );
}