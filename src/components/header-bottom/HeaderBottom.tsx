import Link from "next/link";
import CategoriesBtn from "./CategoriesBtn";

const HeaderBottom = () => {
  const links = [
    { name: "Today's Deals", href: "#" },
    { name: "New Arrivals", href: "#" },
    { name: "Featured Products", href: "#" },
    { name: "Best Sellers", href: "#" },
    { name: "Browse History", href: "#" },
    { name: "About Us", href: "#" },
  ];
  return (
    <header>
      <div className="qtron-container bg-secondary flex items-center gap-4 ">
        <CategoriesBtn />
        <nav className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="h-9 border-transparent hover:border-white border px-1.5 rounded flex items-center transition-all gap-0.5 duration-100 ease-in-out text-muted-foreground hover:text-foreground text-sm"
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
