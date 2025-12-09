import { AlertTriangle } from "lucide-react";
import ProductsSlider from "../global/ProductsSlider";

const BestSellingProducts = async ({ slug }: { slug: string }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/products/${slug}/best-selling?limit=18`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch related products");
    }
    const data = await res.json();
    const products = data.products;

    if (products.length === 0) {
      return null;
    }

    return (
      <section className="mt-4">
        <div className="qtron-container">
          <div className="unique-section p-4">
            <h2 className="mb-2 text-lg font-bold">
              Best sellers in{" "}
              <span className="lowercase">{`${products[0].category}`}</span>
            </h2>
            <ProductsSlider products={products} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);

    return (
      <section className="mt-4">
        <div className="qtron-container">
          <div className="unique-section p-4">
            <div className="text-center text-red-500 mt-4">
              <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
              <p>An error occurred while fetching best-selling products.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default BestSellingProducts;
