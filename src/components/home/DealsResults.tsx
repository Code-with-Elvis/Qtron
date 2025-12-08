import { Product } from "@/lib/types/data";
import ProductsSlider from "../global/ProductsSlider";
import { AlertTriangle } from "lucide-react";

const DealsResults = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/deals?limit=18`, {
      cache: "no-store",
    });
    const data: { products: Product[]; count: number; success: boolean } =
      await res.json();

    return <ProductsSlider products={data.products} />;
  } catch (error) {
    console.error("Error fetching deals:", error);
    return (
      <div className="text-center text-red-500 mt-16">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
        <p>An error occurred while fetching deals.</p>
      </div>
    );
  }
};
export default DealsResults;
