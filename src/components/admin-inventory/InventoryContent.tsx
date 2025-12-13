import SearchForm from "@/components/admin-inventory/SearchForm";
import StockStatusFilter from "@/components/admin-inventory/StockStatusFilter";
import InventoryTable from "@/components/admin-inventory/InventoryTable";
import Pagination from "@/components/global/Pagination";
import { AlertTriangle } from "lucide-react";
import { IconMoodEmptyFilled } from "@tabler/icons-react";
import { headers } from "next/headers";

interface InventoryContentProps {
  searchParams: {
    q?: string;
    stockStatus?: string;
    category?: string;
    page?: string;
    limit?: string;
  };
}

const InventoryContent = async ({ searchParams }: InventoryContentProps) => {
  try {
    const search = searchParams.q || "";
    const stockStatus = searchParams.stockStatus || "";
    const category = searchParams.category || "";
    const page = searchParams.page
      ? Math.max(1, parseInt(searchParams.page, 10))
      : 1;
    const limit = searchParams.limit
      ? Math.max(1, parseInt(searchParams.limit, 10))
      : 10;

    const query = new URLSearchParams({
      q: search,
      stockStatus,
      category,
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/inventory?${query}`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return (
          <div className="text-center text-red-500 mt-16">
            <AlertTriangle className="inline size-9 animate-pulse text-yellow-400 mb-4" />
            <p>Unauthorized. Admin access required.</p>
          </div>
        );
      }
      throw new Error("Failed to fetch inventory");
    }

    const data = await res.json();

    if (data.products.length === 0) {
      return (
        <>
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <SearchForm />
              <StockStatusFilter />
            </div>
            <div className="text-sm text-muted-foreground">
              Total: {data?.pagination?.totalCount || 0} items
            </div>
          </header>
          <div className="text-center mt-16">
            <IconMoodEmptyFilled className="inline size-10 mb-2 text-yellow-400 animate-pulse" />
            <p className="text-muted-foreground">
              No products found matching your criteria.
            </p>
          </div>
        </>
      );
    }

    return (
      <>
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <SearchForm />
            <StockStatusFilter />
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {data?.pagination?.totalCount || 0} items
          </div>
        </header>

        <InventoryTable products={data.products} />

        {data.pagination.totalPages > 1 && (
          <Pagination pages={data.pagination.totalPages} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return (
      <div className="text-center text-red-500 mt-16">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400 mb-4" />
        <p>An error occurred while fetching inventory.</p>
      </div>
    );
  }
};

export default InventoryContent;
