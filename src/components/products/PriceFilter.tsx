"use client";

import { useState, useEffect } from "react";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState([0, 5000]);

  // === Read initial values from URL after mount ===

  useEffect(() => {
    const min = parseInt(searchParams.get("price_min") || "0");
    const max = parseInt(searchParams.get("price_max") || "5000");
    setValue([min, max]);
  }, [searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (value[0] > 0) {
      params.set("price_min", value[0].toString());
    } else {
      params.delete("price_min");
    }

    if (value[1] < 5000) {
      params.set("price_max", value[1].toString());
    } else {
      params.delete("price_max");
    }

    params.delete("page"); // Reset to page 1
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <Field>
        <FieldTitle className="font-bold text-base flex items-center justify-between">
          Price
          <Button
            variant="outline"
            onClick={handleApply}
            className=""
            size="sm"
          >
            Apply
          </Button>
        </FieldTitle>
        <FieldDescription>
          Set your budget range ($
          <span className="font-medium tabular-nums">{value[0]}</span> - $
          <span className="font-medium tabular-nums">{value[1]}</span>).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={setValue}
          max={5000}
          min={0}
          step={10}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
      </Field>
    </div>
  );
}
