"use client";

import { Product } from "@/lib/types/data";
import Price from "../global/Price";
import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ShortcutBox = ({ product }: { product: Product }) => {
  const country = useLocationStore((state) => state.country);
  const isLoading = useLocationStore((state) => state.isLoading);
  const [quantity, setQuantity] = useState("1");

  // Generate quantity options (max 10 or stock available)
  const maxQuantity = Math.min(product.countInStock, 10);
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  // Get discounted percentage if available
  const hasDiscount = product.listPrice && product.listPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.listPrice! - product.price) / product.listPrice!) * 100
      )
    : 0;

  return (
    <aside className="border p-4 space-y-4">
      <Price amount={product.price} className="text-xl font-bold" />

      {/* Shipping Note */}
      <p className="text-sm mt-2">
        {product.freeShipping
          ? "Eligible for Free Shipping"
          : "Shipping & Import charges may apply. See checkout for details."}
      </p>

      {/* Delivery */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="size-4.5" />
        {isLoading ? (
          <p>Deliver to ...</p>
        ) : country ? (
          <p>Deliver to {country}</p>
        ) : (
          <p>Location not available</p>
        )}
      </div>

      {/* In Stock */}
      {product.countInStock > 0 ? (
        <>
          <p className="text-green-600 font-medium">In Stock</p>

          <div className="space-y-2">
            {/* Quantity Selection */}

            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-full">
                <SelectValue>Quantity: {quantity}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Quantity</SelectLabel>
                  {quantityOptions.map((qty) => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Add to Cart Button */}
            <Button className="w-full rounded-full">Add to Cart</Button>

            {/* Buy Now Button */}
            <Button className="w-full rounded-full" variant="outline">
              Buy Now
            </Button>
          </div>

          {/* Discount */}
          {hasDiscount && (
            <p className="text-sm text-muted-foreground">
              You save {discountPercentage}%! purchasing this item.
            </p>
          )}
        </>
      ) : (
        <p className="text-red-600 font-medium">Out of Stock</p>
      )}
    </aside>
  );
};
export default ShortcutBox;
