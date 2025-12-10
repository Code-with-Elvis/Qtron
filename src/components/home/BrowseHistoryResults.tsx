import { AlertTriangle } from "lucide-react";
import ProductsSlider from "../global/ProductsSlider";

const BrowseHistoryResults = async ({ userId }: { userId: string }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/browsing-history?userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch browsing history");
    }

    const data = await res.json();
    const products = data.products;
    if (!products || products.length === 0) {
      return <p>You have no browsing history yet.</p>;
    }

    return <ProductsSlider products={data.products} />;
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    return (
      <div className="text-center text-red-500 mt-4">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
        <p>An error occurred while fetching browsing history.</p>
      </div>
    );
  }
};
export default BrowseHistoryResults;
