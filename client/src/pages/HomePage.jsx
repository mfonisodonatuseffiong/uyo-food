import { Suspense, lazy } from "react";

// ── Above-the-fold components — eager loaded ─────────────────────────────────
// These are visible immediately on page load so must NOT be lazy
import HeroBanner  from "../components/HeroBanner.jsx";
import Categories  from "../components/Categories.jsx";

// ── Below-the-fold components — lazy loaded ──────────────────────────────────
// These are off-screen on first load — lazy loading saves bandwidth
// and improves Largest Contentful Paint (LCP) score
const HowItWorks         = lazy(() => import("../components/HowItWorks.jsx"));
const FeaturedRestaurants = lazy(() => import("../components/FeaturedRestaurants.jsx"));
const LocalDishes        = lazy(() => import("../components/LocalDishes.jsx"));
const DealsSpotlight     = lazy(() => import("../components/DealsSpotlight.jsx"));
const Footer             = lazy(() => import("../components/Footer.jsx"));

// ── Lightweight section skeleton shown while lazy sections load ───────────────
function SectionLoader() {
  return (
    <div
      style={{
        height: "320px",
        background: "linear-gradient(90deg, #f5f5f5 25%, #ececec 50%, #f5f5f5 75%)",
        backgroundSize: "200% 100%",
        animation: "sectionShimmer 1.4s ease-in-out infinite",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sectionShimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default function HomePage() {
  return (
    <main aria-label="Uyo Food homepage">

      {/* Above the fold — loads immediately */}
      <HeroBanner />
      <Categories />

      {/* Below the fold — lazy loaded as user scrolls */}
      <Suspense fallback={<SectionLoader />}>
        <HowItWorks />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FeaturedRestaurants />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <LocalDishes />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <DealsSpotlight />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

    </main>
  );
}