import './App.css'
import { Routes, Route } from 'react-router-dom'

// Core layout components
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DiscountItems from './components/DiscountItems'
import HowItWorks from './components/HowItWorks'
import PopularItems from './components/PopularItems'
import FeaturedRestaurants from './components/FeaturedRestaurants'
import LocalFavourite from './components/LocalFavourite'
import SearchByFood from './components/SearchByFood'
import OrderCTA from './components/OrderCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

// ✅ Pages
import DownloadPage from './pages/DownloadPage'
import DealsPage from './pages/DealsPage'
import Spotlight from './pages/Spotlight'
import LocalDishes from './pages/LocalDishes'
import TestimonialsPage from './pages/TestimonialsPage'
import FAQPage from './pages/FAQPage'
import GalleryPage from './pages/GalleryPage'
import Blog from './pages/Blog'
import About from './pages/About'
import Team from './pages/Team'          // ✅ Added Team page
import Restaurants from './pages/Restaurants'
import Terms from './pages/Terms'
import Refund from './pages/Refund'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'

// Data
import restaurants from './data/restaurants'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

// ✅ Homepage component
function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
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
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
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
      <Contact />
      <Footer />
    </>
  )
}

// ✅ App with routes
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />

        {/* Restaurants results route */}
        <Route path="/restaurants" element={<Restaurants />} />

        {/* Other pages */}
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/local-dishes" element={<LocalDishes />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </div>
  )
}

export default App
