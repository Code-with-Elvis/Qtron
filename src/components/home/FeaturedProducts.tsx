import { Suspense } from "react";
import FeaturedResults from "./FeaturedResults";
import Loading from "./Loading";

const FeaturedProducts = () => {
  return (
    <div className="qtron-container">
      <div className="unique-section p-4">
        <h2 className="mb-2 text-lg font-bold">Elite Tech Collection</h2>
        <Suspense fallback={<Loading />}>
          <FeaturedResults />
        </Suspense>
      </div>
    </div>
  );
};
export default FeaturedProducts;
