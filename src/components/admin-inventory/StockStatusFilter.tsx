"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const StockStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStatus = searchParams.get("stockStatus") || "all";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("stockStatus");
    } else {
      params.set("stockStatus", value);
    }

    // Reset to page 1 when filtering
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("stockStatus");
    params.delete("category");
    params.delete("q");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>
          <SelectItem value="inStock">In Stock</SelectItem>
          <SelectItem value="lowStock">Low Stock</SelectItem>
          <SelectItem value="outOfStock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      {(searchParams.get("stockStatus") ||
        searchParams.get("category") ||
        searchParams.get("q")) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="h-8"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default StockStatusFilter;
