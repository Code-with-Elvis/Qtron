"use client";

import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface PaginationProps {
  pages?: number;
}

const Pagination = ({ pages = 4 }: PaginationProps) => {
  const pageCount = pages;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get current page
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-3 flex justify-end">
      <div className="inline-flex items-center space-x-4">
        {/* Prev button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount; // wrap around
            handlePageChange(prevPage);
          }}
        >
          <IoChevronBackSharp size={18} />
        </Button>

        {/* Page count display */}
        <span className="text-muted-foreground text-sm font-medium select-none">
          {page} <span className="opacity-70">/</span> {pageCount}
        </span>

        {/* Next button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1; // wrap around
            handlePageChange(nextPage);
          }}
        >
          <IoChevronForwardSharp size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
