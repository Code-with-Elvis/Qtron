"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useTranslations } from "next-intl";

const SignedOutBtn = () => {
  const t = useTranslations("common");
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <article className="skeleton hidden md:block h-10 w-20 rounded"></article>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Link
      href="/signin"
      className="cursor-pointer h-12.5 shrink-0 px-1.5 border-transparent hover:border-border border rounded hidden md:flex items-center gap-1 transition-all duration-100 ease-in-out"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-muted-foreground leading-none">
          {t("helloSignIn")}
        </span>
        <span className="font-semibold leading-none">
          {t("accountAndOrders")}
        </span>
      </div>
    </Link>
  );
};
export default SignedOutBtn;
