import { Suspense } from "react";
import Loading from "./Loading";
import BrowseHistoryResults from "./BrowseHistoryResults";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTranslations } from "next-intl/server";

const BrowseHistory = async () => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("home");

  if (!session?.user) {
    return null; // Don't render if not authenticated
  }
  return (
    <div className="qtron-container pt-5">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">{t("yourBrowseHistory")}</h2>
        <Suspense fallback={<Loading />}>
          <BrowseHistoryResults userId={session.user.id} />
        </Suspense>
      </div>
    </div>
  );
};
export default BrowseHistory;
