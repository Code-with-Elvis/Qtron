import BestSelling from "@/components/home/BestSelling";
import Brands from "@/components/home/Brands";
import BrowseHistory from "@/components/home/BrowseHistory";
import CategoryMarquee from "@/components/home/CategoryMarquee";
import Deals from "@/components/home/Deals";
import ExploreSubcategories from "@/components/home/ExploreSubcategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ShortcutCategories from "@/components/home/ShortcutCategories";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <ShortcutCategories />
      <FeaturedProducts />
      <ExploreSubcategories />
      <BestSelling />
      <Deals />
      <Brands />
      <BrowseHistory />
      <CategoryMarquee />
    </section>
  );
};
export default HomePage;
