import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";

// ── Always-on layout components (not lazy — needed immediately) ──────────────
import Navbar           from "./components/Navbar";
import FloatingCart     from "./components/FloatingCart";
import NotificationStack from "./components/Notification";

// ── Lazy-loaded pages (code splitting — each page loads only when visited) ───
const HomePage            = lazy(() => import("./pages/HomePage"));
const Restaurants         = lazy(() => import("./pages/Restaurants"));
const RestaurantDetail    = lazy(() => import("./pages/RestaurantDetail"));
const CartPage            = lazy(() => import("./pages/CartPage"));
const CheckoutPage        = lazy(() => import("./pages/CheckoutPage"));
const ConfirmationPage    = lazy(() => import("./pages/ConfirmationPage"));
const TrackingPage        = lazy(() => import("./pages/TrackingPage"));
const OrderDetails        = lazy(() => import("./pages/OrderDetails"));
const FAQPage             = lazy(() => import("./pages/FAQPage"));
const GalleryPage         = lazy(() => import("./pages/GalleryPage"));
const Blog                = lazy(() => import("./pages/Blog"));
const About               = lazy(() => import("./pages/About"));
const Team                = lazy(() => import("./pages/Team"));
const Careers             = lazy(() => import("./pages/Careers"));
const HelpSupport         = lazy(() => import("./pages/HelpSupport"));
const PartnerWithUs       = lazy(() => import("./pages/PartnerWithUs"));
const DeliverWithUyoFood  = lazy(() => import("./pages/DeliverWithUyoFood"));
const Contact             = lazy(() => import("./components/Contact"));

// ── Components used as standalone pages ──────────────────────────────────────
const LocalDishes    = lazy(() => import("./components/LocalDishes"));
const DealsSpotlight = lazy(() => import("./components/DealsSpotlight"));

/* ─────────────────────────────────────────────
   PAGE LOADER
   Shown while a lazy page is loading
───────────────────────────────────────────── */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
      role="status"
      aria-label="Loading page"
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "4px solid #e8f5e8",
          borderTop: "4px solid #006400",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
        aria-hidden="true"
      ></div>
      <p style={{ color: "#888", fontSize: "0.9rem", margin: 0 }}>
        Loading…
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────── */
function NotFound() {
  return (
    <main
      className="text-center py-5"
      style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}
      aria-labelledby="not-found-heading"
    >
      <h1
        id="not-found-heading"
        style={{ fontSize: "5rem", fontWeight: 900, color: "#006400", margin: 0, lineHeight: 1 }}
      >
        404
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", margin: 0 }}>
        Hmm, this page doesn't exist.
      </p>
      <p style={{ color: "#aaa", fontSize: "0.9rem", margin: 0 }}>
        The page may have moved or the link is broken.
      </p>
      {/* FIX: Link not <a href> — no full page reload */}
      <a
        href="/"
        style={{
          marginTop: "0.5rem",
          background: "#006400",
          color: "#fff",
          padding: "0.75rem 2rem",
          borderRadius: "50px",
          fontWeight: 700,
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        Back to Home
      </a>
    </main>
  );
}

/* ─────────────────────────────────────────────
   SCROLL TO TOP ON ROUTE CHANGE
   Industry standard — page always starts
   at the top when navigating to a new route
───────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ─────────────────────────────────────────────
   APP CONTENT
   Separated so it can consume CartContext
───────────────────────────────────────────── */
function AppContent() {
  const { notifications, dismissNotification } = useCart();

  return (
    <>
      {/* Scroll to top on every route change */}
      <ScrollToTop />

      {/* Always-visible layout */}
      <Navbar />
      <FloatingCart />
      <NotificationStack
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Route content — wrapped in Suspense for lazy loading */}
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Home ── */}
          <Route path="/"          element={<HomePage />} />

          {/* ── Restaurants ── */}
          <Route path="/restaurants"       element={<Restaurants />} />
          <Route path="/restaurant/:id"    element={<RestaurantDetail />} />

          {/* ── Order flow ── */}
          <Route path="/cart"              element={<CartPage />} />
          <Route path="/checkout"          element={<CheckoutPage />} />
          <Route path="/confirmation"      element={<ConfirmationPage />} />
          <Route path="/tracking"          element={<TrackingPage />} />
          <Route path="/order/:orderId"    element={<OrderDetails />} />

          {/* ── Discover ── */}
          <Route path="/local-dishes"      element={<LocalDishes />} />
          <Route path="/deals"             element={<DealsSpotlight />} />
          <Route path="/gallery"           element={<GalleryPage />} />
          <Route path="/blog"              element={<Blog />} />

          {/* ── Info & support ── */}
          <Route path="/faq"               element={<FAQPage />} />
          <Route path="/about"             element={<About />} />
          <Route path="/team"              element={<Team />} />
          <Route path="/careers"           element={<Careers />} />
          <Route path="/help-support"      element={<HelpSupport />} />
          <Route path="/contact"           element={<Contact />} />

          {/* ── Partners ── */}
          <Route path="/partner"           element={<PartnerWithUs />} />
          <Route path="/deliver"           element={<DeliverWithUyoFood />} />

          {/* ── 404 — must be last ── */}
          <Route path="*"                  element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}