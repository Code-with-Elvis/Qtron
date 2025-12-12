"use client";

import { AlertTriangle } from "lucide-react";
import ProductsSlider from "../global/ProductsSlider";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/data";
import Loading from "./Loading";

const BrowseHistoryResults = ({ userId }: { userId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const excludeSlug = sessionStorage.getItem("currentProductSlug") || "";
        const url = excludeSlug
          ? `${baseUrl}/api/browsing-history?userId=${userId}&excludeSlug=${excludeSlug}`
          : `${baseUrl}/api/browsing-history?userId=${userId}`;

        const res = await fetch(url, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch browsing history");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching browsing history:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400 mb-4" />
        <p>An error occurred while fetching browsing history.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p>You have no browsing history yet.</p>;
  }

  return <ProductsSlider products={products} />;
};
export default BrowseHistoryResults;
