import { Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationStack from "./components/Notification";

// Home sections
import HeroBanner from "./components/HeroBanner";   // ✅ NEW IMPORT
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import LocalFavourite from "./components/LocalFavourite";
import DiscountItems from "./components/DiscountItems";
import HowItWorks from "./components/HowItWorks";
import PopularItems from "./components/PopularItems";
import FeaturedRestaurants from "./components/FeaturedRestaurants";
import SearchByFood from "./components/SearchByFood";
import OrderCTA from "./components/OrderCTA";
import TestimonialsPage from "./pages/TestimonialsPage";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";

// Pages
import DownloadPage from "./pages/DownloadPage";
import DealsPage from "./pages/DealsPage";
import Spotlight from "./pages/Spotlight";
import LocalDishes from "./pages/LocalDishes";
import FAQPage from "./pages/FAQPage";
import GalleryPage from "./pages/GalleryPage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import HelpSupport from "./pages/HelpSupport";
import PartnerWithUs from "./pages/PartnerWithUs";
import DeliverWithUyoFood from "./pages/DeliverWithUyoFood";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";

// Order flow
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import OrderDetails from "./pages/OrderDetails";
import ConfirmationPage from "./pages/ConfirmationPage";

// Data + Swiper
import restaurants from "./data/restaurants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/* =========================
   404
========================= */
function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="fw-bold text-danger">404</h1>
      <p className="lead">Page Not Found</p>
      <a href="/" className="btn btn-warning rounded-pill px-4 fw-bold">
        Back to Home
      </a>
    </div>
  );
}

/* =========================
   HOME
========================= */
function HomePage() {
  return (
    <>
      <Navbar />

      {/* ✅ Banner directly under navbar */}
      <HeroBanner />

      <HeroSection />

      <div className="container my-4">
        <SearchBar />
        <Categories />
      </div>

      <LocalFavourite />
      <DiscountItems />
      <HowItWorks />
      <PopularItems />
      <FeaturedRestaurants />
      <SearchByFood />

      <DownloadPage />
      <DealsPage />

      {/* Spotlight */}
      <section className="py-5 bg-light">
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            effect="fade"
          >
            {restaurants.map((r, idx) => (
              <SwiperSlide key={idx}>
                <Spotlight {...r} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <LocalDishes />
      <OrderCTA />
      <TestimonialsPage />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </>
  );
}

/* =========================
   APP CONTENT
========================= */
function AppContent() {
  const { notifications, dismissNotification } = useCart();

  return (
    <>
      <NotificationStack
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />

        {/* Order Flow */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />

        {/* Pages */}
        <Route path="/local-dishes" element={<LocalDishes />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/partner" element={<PartnerWithUs />} />
        <Route path="/deliver" element={<DeliverWithUyoFood />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

/* =========================
   APP WRAPPER
========================= */
export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
