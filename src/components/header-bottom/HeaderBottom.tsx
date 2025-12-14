"use client";

import Link from "next/link";
import CategoriesBtn from "./CategoriesBtn";
import { useTranslations } from "next-intl";

const HeaderBottom = () => {
  const t = useTranslations("nav");
  const links = [
    { name: t("todaysDeals"), href: "/products?isDeal=true" },
    { name: t("newArrivals"), href: "/products?sort=latest" },
    { name: t("featuredProducts"), href: "/products?isFeatured=true" },
    { name: t("bestSellers"), href: "/products?isBestSeller=true" },
    { name: t("browseHistory"), href: "/history" },
    { name: t("aboutUs"), href: "/about" },
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
