"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LiaTimesSolid } from "react-icons/lia";
import { Filter, X } from "lucide-react";
import { PriceFilter } from "./PriceFilter";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const SmallScreenFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get("category")?.split(",") || [];
  const selectedBrands = searchParams.get("brand")?.split(",") || [];

  // === Extract unique brands from popular categories ===
  const popularBrands = [
    "Samsung",
    "Apple",
    "Sony",
    "LG",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Canon",
    "Nikon",
  ];

  // === Popular categories to show ===
  const popularCategories = categories.slice(0, 8);

  const updateFilter = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",").filter(Boolean) || [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index > -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0) {
      params.set(key, currentValues.join(","));
    } else {
      params.delete(key);
    }

    params.delete("page"); // Reset to page 1 when filtering
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    const lang = searchParams.get("lang");
    const url = lang ? `/products?lang=${lang}` : "/products";
    router.push(url);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    searchParams.get("price_min") ||
    searchParams.get("price_max") ||
    searchParams.get("q");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded md:hidden">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-74 sm:w-90 gap-0 [&>button]:hidden"
      >
        <SheetHeader className="px-0 py-0">
          <SheetTitle className="sr-only">Filter</SheetTitle>
          <SheetDescription className="sr-only">
            Filter products by various criteria
          </SheetDescription>
          <header className="flex items-center justify-between bg-primary text-white px-5 h-16">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Filter By:</h2>
            </div>
            <SheetClose asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded bg-accent absolute -left-10 sm:-left-12 top-4 size-8 sm:size-9"
              >
                <LiaTimesSolid className="size-5 sm:size-8" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </header>
        </SheetHeader>
        {/* Categories List */}
        <div className="flex-1 overflow-y-auto pb-3 px-5">
          <div className="flex items-center justify-between mb-6">
            <p></p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm mt-1"
              >
                <X className="size-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Price Filter */}
            <div className="pb-6 border-b">
              <PriceFilter />
            </div>

            {/* Categories */}
            <div className="pb-6 border-b">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {popularCategories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.name}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) =>
                        updateFilter(
                          "category",
                          category.name,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`category-${category.name}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="pb-6">
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {popularBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) =>
                        updateFilter("brand", brand, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default SmallScreenFilter;
