import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DiscountItems from "./components/DiscountItems";
import HowItWorks from "./components/HowItWorks";
import PopularItems from "./components/PopularItems";
import FeaturedRestaurants from "./components/FeaturedRestaurants";
import SearchByFood from "./components/SearchByFood";
import InstallAppCTA from "./components/InstallAppCTA";
import BestDeals from "./components/BestDeals";
import FriedChickenDeals from "./components/FriedChickenDeals";
import PizzaDeals from "./components/PizzaDeals";
import OrderCTA from "./components/OrderCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <DiscountItems />
      <HowItWorks />
      <PopularItems />
      <FeaturedRestaurants />
      <SearchByFood />
      <InstallAppCTA />
      <BestDeals />
      <FriedChickenDeals />
      <PizzaDeals />
      <OrderCTA />
      <Footer />
    </div>
  );
}

export default App;
