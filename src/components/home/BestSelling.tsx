import { Suspense } from "react";
import BestSellingResults from "./BestSellingResults";
import Loading from "./Loading";

const BestSelling = () => {
  return (
    <div className="qtron-container pb-5">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">Shop Best Sellers</h2>
        <Suspense fallback={<Loading />}>
          <BestSellingResults />
        </Suspense>
      </div>
    </div>
  );
};
export default BestSelling;
