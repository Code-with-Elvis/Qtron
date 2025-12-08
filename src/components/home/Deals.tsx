import { Suspense } from "react";
import DealsResults from "./DealsResults";
import Loading from "./Loading";

const Deals = () => {
  return (
    <div className="qtron-container pb-5">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">Top Deals</h2>
        <Suspense fallback={<Loading />}>
          <DealsResults />
        </Suspense>
      </div>
    </div>
  );
};
export default Deals;
