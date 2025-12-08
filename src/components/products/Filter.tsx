"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PriceFilter } from "./PriceFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Filter = () => {
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
    router.push("/products");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    searchParams.get("price_min") ||
    searchParams.get("price_max") ||
    searchParams.get("q");

  return (
    <aside className="w-72 sticky top-20 h-fit pr-6 border-r hidden md:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filter By:</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm"
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
              <div key={category.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.name}`}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={(checked) =>
                    updateFilter("category", category.name, checked as boolean)
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
        <div className="pb-6 border-b">
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
    </aside>
  );
};
export default Filter;
