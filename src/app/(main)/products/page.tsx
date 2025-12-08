import Filter from "@/components/products/Filter";
import Loading from "@/components/products/Loading";
import SearchResults from "@/components/products/SearchResults";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  return (
    <section className="py-8">
      <div className="qtron-container flex gap-6">
        <Filter />
        <Suspense fallback={<Loading />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
};
export default ProductsPage;
