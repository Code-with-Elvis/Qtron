import MainProductContent from "@/components/single-product/MainProductContent";
import RelatedProducts from "@/components/single-product/RelatedProducts";
import { Suspense } from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <section>
      <MainProductContent slug={slug} />
      <Suspense fallback={<div>Loading related products...</div>}>
        <RelatedProducts slug={slug} />
      </Suspense>
    </section>
  );
};
export default ProductPage;
