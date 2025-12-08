import Brands from "@/components/home/Brands";
import CategoryMarquee from "@/components/home/CategoryMarquee";
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
      <Brands />
      <CategoryMarquee />
    </section>
  );
};
export default HomePage;
