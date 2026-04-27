import { Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";

// Core layout components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DiscountItems from "./components/DiscountItems";
import HowItWorks from "./components/HowItWorks";
import PopularItems from "./components/PopularItems";
import FeaturedRestaurants from "./components/FeaturedRestaurants";
import LocalFavourite from "./components/LocalFavourite";
import SearchByFood from "./components/SearchByFood";
import OrderCTA from "./components/OrderCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";

// Browse/Search components
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";

// Pages
import DownloadPage from "./pages/DownloadPage";
import DealsPage from "./pages/DealsPage";
import Spotlight from "./pages/Spotlight";
import LocalDishes from "./pages/LocalDishes";
import TestimonialsPage from "./pages/TestimonialsPage";
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
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

// Order flow pages
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import OrderDetails from "./pages/OrderDetails";
import RestaurantDetail from "./pages/RestaurantDetail";
import ConfirmationPage from "./pages/ConfirmationPage";

// Notifications
import NotificationStack from "./components/Notification";

// Data
import restaurants from "./data/restaurants";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

/* =========================
   404 PAGE
========================= */

function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="fw-bold text-danger">404</h1>

      <p className="lead">
        Page Not Found
      </p>

      <a
        href="/"
        className="btn btn-warning rounded-pill px-4 fw-bold"
      >
        Back to Home
      </a>
    </div>
  );
}

/* =========================
   HOME PAGE
========================= */

function HomePage() {
  return (
    <>
      <Navbar />

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

      {/* Restaurant Spotlight Carousel */}
      <section className="py-5 bg-light">
        <div className="container">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              EffectFade,
            ]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            effect="fade"
            fadeEffect={{ crossFade: true }}
          >
            {restaurants.map((r, idx) => (
              <SwiperSlide key={idx}>
                <Spotlight
                  name={r.name}
                  tagline={r.tagline}
                  description={r.description}
                  image={r.image}
                  link={r.link}
                />
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
  const {
    notifications,
    dismissNotification,
  } = useCart();

  return (
    <div className="App">
      <NotificationStack
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        <Route
          path="/restaurant/:id"
          element={<RestaurantDetail />}
        />

        {/* Order Flow */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/confirmation"
          element={<ConfirmationPage />}
        />

        <Route
          path="/tracking"
          element={<TrackingPage />}
        />

        <Route
          path="/order/:orderId"
          element={<OrderDetails />}
        />

        {/* Other Pages */}
        <Route
          path="/featured-restaurants"
          element={<FeaturedRestaurants />}
        />

        <Route
          path="/search-by-food"
          element={<SearchByFood />}
        />

        <Route
          path="/download"
          element={<DownloadPage />}
        />

        <Route
          path="/deals"
          element={<DealsPage />}
        />

        <Route
          path="/local-dishes"
          element={<LocalDishes />}
        />

        <Route
          path="/testimonials"
          element={<TestimonialsPage />}
        />

        <Route
          path="/why-choose-us"
          element={<WhyChooseUs />}
        />

        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />

        <Route
          path="/help-support"
          element={<HelpSupport />}
        />

        <Route
          path="/support"
          element={<HelpSupport />}
        />

        <Route
          path="/partner"
          element={<PartnerWithUs />}
        />

        <Route
          path="/deliver"
          element={<DeliverWithUyoFood />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

/* =========================
   APP WRAPPER
========================= */

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;