import MainProductContent from "@/components/single-product/MainProductContent";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <section>
      <MainProductContent slug={slug} />
    </section>
  );
};
export default ProductPage;
