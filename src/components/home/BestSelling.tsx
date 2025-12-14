import { Suspense } from "react";
import BestSellingResults from "./BestSellingResults";
import Loading from "./Loading";
import { getTranslations } from "next-intl/server";

const BestSelling = async () => {
  const t = await getTranslations("home");
  return (
    <div className="qtron-container pb-5">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">{t("shopBestSellers")}</h2>
        <Suspense fallback={<Loading />}>
          <BestSellingResults />
        </Suspense>
      </div>
    </div>
  );
};
export default BestSelling;
