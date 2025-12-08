import CategoryMarquee from "@/components/home/CategoryMarquee";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ShortcutCategories from "@/components/home/ShortcutCategories";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <ShortcutCategories />
      <FeaturedProducts />
      <CategoryMarquee />
    </section>
  );
};
export default HomePage;
