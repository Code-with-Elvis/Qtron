"use client";

import { useLocationStore } from "@/store/useLocationStore";
import { formatPriceSync } from "@/lib/currency";

interface PriceProps {
  amount: number;
  className?: string;
}

const Price = ({ amount, className = "" }: PriceProps) => {
  const { country } = useLocationStore();

  const formattedPrice = formatPriceSync(amount, country);

  return <span className={className}>{formattedPrice}</span>;
};

export default Price;
