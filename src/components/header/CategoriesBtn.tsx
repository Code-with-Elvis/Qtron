"use client";

import { BiMenu } from "react-icons/bi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CgProfile } from "react-icons/cg";
import { Button } from "../ui/button";
import { LiaTimesSolid } from "react-icons/lia";
import { categories } from "@/lib/data";
import Link from "next/link";
import SheetTheme from "./SheetTheme";
import SheetLanguageBox from "./SheetLanguageBox";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

const CategoriesBtn = () => {
  const t = useTranslations("common");
  const { user, isAuthenticated } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex md:hidden items-center transition-all duration-100 ease-in-out">
          <BiMenu className="size-8" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-74 sm:w-90 gap-0 [&>button]:hidden"
      >
        <SheetHeader className="px-0 py-0">
          <SheetTitle className="sr-only">Categories</SheetTitle>
          <SheetDescription className="sr-only">
            Browse through all product categories
          </SheetDescription>
          <header className="flex items-center justify-between bg-primary text-white px-6 h-16">
            <div className="flex items-center gap-2">
              <CgProfile className="size-7.5" />
              <span className="text-xl font-semibold">
                {t("hello")},{" "}
                <span className=" first-letter:uppercase">
                  {isAuthenticated ? user?.name : t("signIn")}
                </span>
              </span>
            </div>
            <SheetClose asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded bg-accent absolute -right-10 sm:-right-12 top-4 size-8 sm:size-9"
              >
                <LiaTimesSolid className="size-5 sm:size-8" />
                <span className="sr-only">{t("close")}</span>
              </Button>
            </SheetClose>
          </header>
        </SheetHeader>
        {/* Categories List */}
        <div className="flex-1 overflow-y-auto pb-3">
          <h2 className="font-bold text-lg px-6 py-4">{t("shopByCategory")}</h2>
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0"
              >
                <AccordionTrigger className="px-6 py-3 rounded-none hover:bg-accent hover:no-underline">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <nav className="flex flex-col">
                    {category.subcategories.map((subcategory, subIndex) => {
                      const params = new URLSearchParams();
                      params.set("category", category.name);
                      params.set("subcategory", subcategory);
                      return (
                        <Link
                          key={subIndex}
                          href={`/products?${params.toString()}`}
                          className="px-12 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          {subcategory}
                        </Link>
                      );
                    })}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <SheetFooter className="px-0 border-t border-border">
          <SheetTheme />
          <SheetLanguageBox />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CategoriesBtn;
