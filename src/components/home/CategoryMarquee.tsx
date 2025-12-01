import Link from "next/link";
import { Button } from "../ui/button";

const CategoryMarquee = () => {
  const categories = [
    "Headphones",
    "Speakers",
    "Watch",
    "Earbuds",
    "Mouse",
    "Keyboard",
    "Laptop",
    "Smartphone",
    "Tablet",
    "Camera",
    "Monitor",
  ];

  return (
    <div className="qtron-container py-5">
      <div className="overflow-hidden group relative">
        {/* --- Left fade gradient --- */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* --- Right fade gradient --- */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:paused gap-4">
          {/* --- Repeat categories 4 times for seamless loop --- */}
          {[...Array(4)].map((_, setIndex) =>
            categories.map((category, index) => (
              <Button
                key={`${setIndex}-${index}`}
                variant="outline"
                size="sm"
                className=" bg-slate-100 text-slate-500 text-xs sm:text-sm hover:bg-slate-600 hover:text-white active:scale-95 transition-all duration-300 shrink-0"
              >
                <Link href="#">{category}</Link>
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMarquee;
