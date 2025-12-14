"use client";

import Cart from "@/assets/Cart";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CartButton = () => {
  const t = useTranslations("common");

  return (
    <Link
      href="/"
      className="h-12.5 w-16 justify-center shrink-0 px-1.5 border-transparent hover:border-border border rounded flex items-center gap-1 transition-all duration-100 ease-in-out"
    >
      <div className="relative">
        <span className="grid place-items-center text-white px-1 bg-primary text-sm rounded absolute -right-4.5 -top-2">
          0
        </span>
        <Cart className="size-6" />
        <span className="sr-only">{t("cart")}</span>
      </div>
    </Link>
  );
};
export default CartButton;
