import { Suspense } from "react";
import DealsResults from "./DealsResults";
import Loading from "./Loading";
import { getTranslations } from "next-intl/server";

const Deals = async () => {
  const t = await getTranslations("home");
  return (
    <div className="qtron-container pb-5">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">{t("topDeals")}</h2>
        <Suspense fallback={<Loading />}>
          <DealsResults />
        </Suspense>
      </div>
    </div>
  );
};
export default Deals;
