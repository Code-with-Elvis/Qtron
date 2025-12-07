import Results from "@/components/admin-products/Results";
import { ResultsProps } from "@/lib/types/data";
import { Suspense } from "react";

const ProductsPage = ({ searchParams }: ResultsProps) => {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </section>
  );
};
export default ProductsPage;
