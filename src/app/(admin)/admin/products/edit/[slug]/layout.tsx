import Header from "@/components/admin-edit-product/Header";

const EditLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <>
      <Header slug={slug} />
      {children}
    </>
  );
};
export default EditLayout;
