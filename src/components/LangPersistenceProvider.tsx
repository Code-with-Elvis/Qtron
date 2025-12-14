"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function LangPersistenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get the current lang parameter
    const currentLang = searchParams.get("lang");

    if (currentLang) {
      // Store in sessionStorage so it persists across navigations
      sessionStorage.setItem("preferredLang", currentLang);
    } else {
      // Check if we have a stored lang preference
      const storedLang = sessionStorage.getItem("preferredLang");

      if (storedLang) {
        // Add the lang parameter back to the URL
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", storedLang);
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [pathname, searchParams, router]);

  return <>{children}</>;
}
