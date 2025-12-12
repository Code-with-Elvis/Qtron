"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface BrowsingHistoryTrackerProps {
  productSlug: string;
}

const BrowsingHistoryTracker = ({
  productSlug,
}: BrowsingHistoryTrackerProps) => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const trackBrowsingHistory = async () => {
      // == Only track for authenticated users ==
      if (!isAuthenticated || !user?.id || !productSlug) return;

      // Store current product slug for filtering in browse history
      if (typeof window !== "undefined") {
        sessionStorage.setItem("currentProductSlug", productSlug);
      }

      try {
        await fetch("/api/browsing-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productSlug: productSlug,
          }),
        });
      } catch (error) {
        console.error("Failed to track browsing history:", error);
      }
    };

    // Track immediately since slug is available
    trackBrowsingHistory();

    // Clear on unmount
    return () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("currentProductSlug");
      }
    };
  }, [productSlug, user?.id, isAuthenticated]);

  // This component doesn't render anything
  return null;
};

export default BrowsingHistoryTracker;
