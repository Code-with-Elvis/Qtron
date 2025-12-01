"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiHome5Line, RiRefreshLine } from "react-icons/ri";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="h-[calc(100vh-96px)] ">
      <div className="qtron-container py-10 h-full flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          {/* ---- Error Visual ---- */}
          <div className=" mb-3 flex justify-center">
            <svg
              className="size-28 md:size-32 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* ---- Error Message  ---- */}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            System Overload
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Oops! Something short-circuited.
          </p>
          <p className="text-base mb-2 text-muted-foreground">
            We encountered an unexpected error while preparing your page:{" "}
            {error?.message}
          </p>

          {error.digest && (
            <p className="text-xs text-muted-foreground/60 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex mt-8 gap-4 justify-center items-center mb-12">
            <Button onClick={reset} size="lg">
              <RiRefreshLine className="size-5 mr-2" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/" className="flex items-center gap-2">
                <RiHome5Line className="size-5" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Error Code */}
          <p className="text-sm text-muted-foreground mt-12">
            If the problem persists, please contact our support team
          </p>
        </div>
      </div>
    </section>
  );
}
