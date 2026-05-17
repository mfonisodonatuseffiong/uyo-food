import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

// ── Static link data — outside component ─────────────────────────────────────
const COMPANY_LINKS = [
  { label: "About Uyo Food",  to: "/about"    },
  { label: "Our Team",        to: "/team"     },
  { label: "Careers",         to: "/careers"  },
  { label: "Blog",            to: "/blog"     },
];

const CONTACT_LINKS = [
  { label: "Help & Support",        to: "/help-support" },
  { label: "Partner with Us",       to: "/partner"      },
  { label: "Deliver with Uyo Food", to: "/deliver"      },
  { label: "Contact Us",            to: "/contact"      },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions",    to: "/terms"   },
  { label: "Refund & Cancellation", to: "/refund"  },
  { label: "Privacy Policy",        to: "/privacy" },
  { label: "Cookie Policy",         to: "/cookies" },
];

const SOCIAL_LINKS = [
  { icon: "fab fa-whatsapp",  href: "https://wa.me/2348068199955", label: "Chat with us on WhatsApp", highlight: true },
  { icon: "fab fa-instagram", href: "https://instagram.com/uyofood", label: "Follow us on Instagram" },
  { icon: "fab fa-facebook",  href: "https://facebook.com/uyofood",  label: "Follow us on Facebook"  },
  { icon: "fab fa-twitter",   href: "https://twitter.com/uyofood",   label: "Follow us on Twitter"   },
];

// ── Newsletter sub-component ──────────────────────────────────────────────────
function Newsletter() {
  const [email,     setEmail]     = useState("");
  const [status,    setStatus]    = useState("idle"); // idle | loading | success | error
  const [message,   setMessage]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    // ── To replace this with real API call when backend is ready ──
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setMessage("You're in! We'll send you the best Uyo deals.");
    setEmail("");
  };

  return (
    <div className="ft__newsletter">
      <h3 className="ft__newsletter-heading">
        <i className="fas fa-envelope" aria-hidden="true"></i>
        Get Daily Deals
      </h3>
      <p className="ft__newsletter-sub">
        Fresh offers from Uyo's best restaurants — straight to your inbox.
      </p>
      {status === "success" ? (
        <p className="ft__newsletter-success" role="status" aria-live="polite">
          <i className="fas fa-check-circle" aria-hidden="true"></i>
          {message}
        </p>
      ) : (
        <form
          className="ft__newsletter-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Newsletter signup"
        >
          <input
            type="email"
            className="ft__newsletter-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setMessage(""); }}
            aria-label="Email address for newsletter"
            autoComplete="email"
            required
          />
          <button
            type="submit"
            className="ft__newsletter-btn"
            disabled={status === "loading"}
            aria-label="Subscribe to newsletter"
          >
            {status === "loading"
              ? <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
              : "Subscribe"
            }
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="ft__newsletter-error" role="alert" aria-live="assertive">
          <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
          {message}
        </p>
      )}
    </div>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef(null);

  // CSS-only scroll animations via IntersectionObserver
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const targets = footer.querySelectorAll(".ft__animate");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { targets.forEach((el) => el.classList.add("ft__visible")); return; }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ft__visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      className="ft"
      aria-label="Site footer"
      ref={footerRef}
    >
      {/* ── WhatsApp CTA banner ── */}
      <div className="ft__whatsapp-banner ft__animate">
        <div className="ft__whatsapp-inner">
          <div className="ft__whatsapp-text">
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            <span>
              <strong>Order via WhatsApp</strong> — message a restaurant directly
            </span>
          </div>
          <a
            href="https://wa.me/2348068199955"
            className="ft__whatsapp-btn"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Order via WhatsApp"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            Chat Now
          </a>
        </div>
      </div>

      <div className="ft__inner">

        {/* ── Top: brand + newsletter ── */}
        <div className="ft__top ft__animate" style={{ "--delay": "0.05s" }}>
          {/* Brand */}
          <div className="ft__brand">
            <Link to="/" className="ft__brand-logo" aria-label="Uyo Food home">
              <i className="fas fa-utensils" aria-hidden="true"></i>
              Uyo<span>Food</span>
            </Link>
            <p className="ft__brand-tagline">
              Fresh meals. Hot deals. Delivered fast across Uyo, Akwa Ibom.
            </p>
            {/* Social icons */}
            <div className="ft__social" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ icon, href, label, highlight }) => (
                <a
                  key={label}
                  href={href}
                  className={`ft__social-link${highlight ? " ft__social-link--wa" : ""}`}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className={icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <Newsletter />
        </div>

        <hr className="ft__divider" />

        {/* ── Middle: nav columns ── */}
        <div className="ft__nav-grid ft__animate" style={{ "--delay": "0.15s" }}>

          <nav aria-label="Company links">
            <h4 className="ft__nav-heading">Company</h4>
            <ul className="ft__nav-list">
              {COMPANY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="ft__nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact and partner links">
            <h4 className="ft__nav-heading">Get Involved</h4>
            <ul className="ft__nav-list">
              {CONTACT_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="ft__nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h4 className="ft__nav-heading">Legal</h4>
            <ul className="ft__nav-list">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="ft__nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact info column */}
          <div>
            <h4 className="ft__nav-heading">Find Us</h4>
            <address className="ft__address">
              <p>
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                Uyo, Akwa Ibom State, Nigeria
              </p>
              <p>
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <a href="mailto:hello@uyofood.com" className="ft__nav-link">
                  hello@uyofood.com
                </a>
              </p>
              <p>
                <i className="fas fa-phone" aria-hidden="true"></i>
                <a href="tel:+2348068199955" className="ft__nav-link">
                  +234 806 819 9955
                </a>
              </p>
              <p>
                <i className="fas fa-clock" aria-hidden="true"></i>
                Mon – Sun: 8:00 AM – 10:00 PM
              </p>
            </address>
          </div>

        </div>

        <hr className="ft__divider" />

        {/* ── Bottom: copyright ── */}
        <div className="ft__bottom ft__animate" style={{ "--delay": "0.25s" }}>
          <p className="ft__copyright">
            © {year} Uyo Food. All rights reserved.
          </p>
          <p className="ft__credit">
            Built with{" "}
            <i className="fas fa-heart" aria-hidden="true"></i>{" "}
            by{" "}
            <a
              href="https://donatech.dev"
              className="ft__credit-link"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="DonaTech — opens in new tab"
            >
              DonaTech
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}