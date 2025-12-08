"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function Pagination({ pagination }: PaginationProps) {
  const searchParams = useSearchParams();

  if (pagination.totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-6 border-t">
      <Link
        href={createPageUrl(pagination.currentPage - 1)}
        className={`px-4 py-2 rounded border ${
          !pagination.hasPreviousPage
            ? "pointer-events-none opacity-50"
            : "hover:bg-muted"
        }`}
      >
        Previous
      </Link>

      <span className="px-4 py-2 text-sm">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>

      <Link
        href={createPageUrl(pagination.currentPage + 1)}
        className={`px-4 py-2 rounded border ${
          !pagination.hasNextPage
            ? "pointer-events-none opacity-50"
            : "hover:bg-muted"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
