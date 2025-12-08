"use client";

import { useState, useEffect } from "react";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

interface PriceFilterProps {
  onPriceChange: (min: number, max: number) => void;
  initialMin?: number;
  initialMax?: number;
}

export function PriceFilter({
  onPriceChange,
  initialMin = 0,
  initialMax = 5000,
}: PriceFilterProps) {
  const [value, setValue] = useState([initialMin, initialMax]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceChange(value[0], value[1]);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onPriceChange]);

  return (
    <div className="w-full">
      <Field>
        <FieldTitle>Price Range</FieldTitle>
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
