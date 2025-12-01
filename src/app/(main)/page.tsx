import CategoryMarquee from "@/components/home/CategoryMarquee";
import Hero from "@/components/home/Hero";
import ShortcutCategories from "@/components/home/ShortcutCategories";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <ShortcutCategories />
      <CategoryMarquee />
    </section>
  );
};
export default HomePage;
