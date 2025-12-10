import BrowseHistory from "@/components/home/BrowseHistory";
import BestSellingProducts from "@/components/single-product/BestSellingProducts";
import Loading from "@/components/single-product/Loading";
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
      <Suspense fallback={<Loading />}>
        <BestSellingProducts slug={slug} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <RelatedProducts slug={slug} />
      </Suspense>
      <BrowseHistory />
      <div className="mt-4"></div>
    </section>
  );
};
export default ProductPage;
