import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { BrowsingHistoryProduct } from "@/lib/types/data";
import ProductCard from "@/components/history/ProductCard";
import { AlertTriangle } from "lucide-react";

const HistoryPage = async () => {
  try {
    // == Get session on server side ==
    const session = await getServerSession(authOptions);

    // == Redirect if not authenticated (backup to middleware) ==
    if (!session?.user) {
      redirect("/signin");
    }

    // == Now you have access to user details ==
    const user = session.user;

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const res = await fetch(
      `${baseUrl}/api/browsing-history?userId=${user.id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch browsing history");
    }

    const data = await res.json();
    const products = data.products;

    if (!products || products.length === 0) {
      return (
        <section className="py-8">
          <div className="qtron-container">
            <h2 className="text-2xl font-bold mb-4">Your Browsing History</h2>
            <p>You have no browsing history yet.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-8">
        <div className="qtron-container">
          <h2 className="text-xl font-bold mb-4">Your Browsing History</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product: BrowsingHistoryProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <section>
        <div className="qtron-container">
          <div className=" text-center py-16">
            <AlertTriangle className="inline size-12 animate-pulse text-red-500 mb-4" />
            <p className="text-lg text-muted-foreground">
              Failed to load products
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please try again later
            </p>
          </div>
        </div>
      </section>
    );
  }
};
export default HistoryPage;
