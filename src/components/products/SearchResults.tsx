import { Product } from "@/lib/types/data";
import { AlertTriangle } from "lucide-react";
import ProductCard from "./ProductCard";
import { SortSelect } from "./SortSelect";
import { Pagination } from "./PaginationControls";
import SmallScreenFilter from "./SmallScreenFilter";

interface SearchResultsProps {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    subcategory?: string;
    brand?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
    page?: string;
    limit?: string;
    isFeatured?: string;
    isBestSeller?: string;
    isDeal?: string;
    freeShipping?: string;
  }>;
}

const SearchResults = async ({ searchParams }: SearchResultsProps) => {
  try {
    const params = await searchParams;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Build query string
    const urlParams = new URLSearchParams();
    if (params?.q) urlParams.set("q", params.q);
    if (params?.category) urlParams.set("category", params.category);
    if (params?.subcategory) urlParams.set("subcategory", params.subcategory);
    if (params?.brand) urlParams.set("brand", params.brand);
    if (params?.price_min) urlParams.set("price_min", params.price_min);
    if (params?.price_max) urlParams.set("price_max", params.price_max);
    if (params?.isFeatured) urlParams.set("isFeatured", params.isFeatured);
    if (params?.isBestSeller)
      urlParams.set("isBestSeller", params.isBestSeller);
    if (params?.isDeal) urlParams.set("isDeal", params.isDeal);
    if (params?.freeShipping)
      urlParams.set("freeShipping", params.freeShipping);
    if (params?.sort) urlParams.set("sort", params.sort);
    if (params?.page) urlParams.set("page", params.page);
    urlParams.set("limit", params?.limit || "20");

    const res = await fetch(`${baseUrl}/api/products?${urlParams.toString()}`, {
      cache: "no-store",
    });

    const data: {
      products: Product[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      success: boolean;
    } = await res.json();

    if (!data.success || !data.products) {
      throw new Error("Failed to fetch products");
    }

    const { products, pagination } = data;

    return (
      <div className="flex-1 min-h-screen">
        {/* === Header with results count and sort === */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div>
            <p className=" text-muted-foreground mt-1 hidden sm:block">
              <span className="font-bold">{pagination.totalCount}</span>{" "}
              {pagination.totalCount === 1 ? "product" : "products"} found
            </p>
            <p className="sm:hidden">
              <span className="font-bold">{pagination.totalCount}</span> Items
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SmallScreenFilter />
            <SortSelect currentSort={params?.sort} />
          </div>
        </div>

        {/* === Products Grid === */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <AlertTriangle className="inline size-12 text-yellow-400 mb-4" />
            <p className="text-lg text-muted-foreground">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination pagination={pagination} />
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="flex-1 text-center py-16">
        <AlertTriangle className="inline size-12 animate-pulse text-red-500 mb-4" />
        <p className="text-lg text-muted-foreground">Failed to load products</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try again later
        </p>
      </div>
    );
  }
};

export default SearchResults;
