import { AlertTriangle } from "lucide-react";
import ProductsSlider from "../global/ProductsSlider";

const RelatedProducts = async ({ slug }: { slug: string }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/products/${slug}/related?limit=18`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch related products");
    }
    const data = await res.json();
    const relatedProducts = data.products;

    if (relatedProducts.length === 0) {
      return null;
    }

    return (
      <section className="mt-4 mb-5">
        <div className="qtron-container">
          <div className="unique-section p-4">
            <h2 className="mb-2 text-lg font-bold">
              Products related to this item
            </h2>
            <ProductsSlider products={relatedProducts} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);

    return (
      <section className="mt-4 mb-5">
        <div className="qtron-container">
          <div className="unique-section p-4">
            <div className="text-center text-red-500 mt-4">
              <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
              <p>An error occurred while fetching related products.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default RelatedProducts;
