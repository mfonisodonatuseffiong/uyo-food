import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";

function Home() {
  return (
    <div>
      <HeroSection />

      {/* Search Section */}
      <section className="container py-5">
        <SearchBar />
      </section>

      {/* Categories Section */}
      <section className="container pb-5">
        <Categories />
      </section>

      {/* other sections */}
      {/* Popular dishes */}
      {/* Featured restaurants */}
      {/* Testimonials */}
    </div>
  );
}

export default Home;