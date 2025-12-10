import Link from "next/link";
import CategoriesBtn from "./CategoriesBtn";

const HeaderBottom = () => {
  const links = [
    { name: "Today's Deals", href: "/products?isDeal=true" },
    { name: "New Arrivals", href: "/products?sort=latest" },
    { name: "Featured Products", href: "/products?isFeatured=true" },
    { name: "Best Sellers", href: "/products?isBestSeller=true" },
    { name: "Browse History", href: "/history" },
    { name: "About Us", href: "/about" },
  ];
  return (
    <header>
      <div className="qtron-container bg-secondary flex items-center gap-4 ">
        <CategoriesBtn />
        <nav className="flex gap-2 overflow-x-auto flex-1 min-w-0">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="h-9 border-transparent hover:border-white border px-1.5 rounded flex items-center transition-all gap-0.5 duration-100 ease-in-out text-muted-foreground hover:text-foreground text-sm whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
export default HeaderBottom;
