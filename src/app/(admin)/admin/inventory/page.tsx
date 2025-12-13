import InventoryContent from "@/components/admin-inventory/InventoryContent";
import InventoryDashboard from "@/components/admin-inventory/InventoryDashboard";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ResultsProps } from "@/lib/types/data";

const InventoryLoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="size-8 animate-spin text-primary mx-auto mb-3" />
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    </div>
  );
};

const DashboardLoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="size-6 animate-spin text-primary mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  );
};

const Inventory = async ({ searchParams }: ResultsProps) => {
  const resolvedParams = await searchParams;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground mt-1">
          Manage product stock levels and inventory
        </p>
      </div>

      {/* Dashboard Metrics */}
      <Suspense fallback={<DashboardLoadingFallback />}>
        <InventoryDashboard />
      </Suspense>

      {/* Inventory List */}
      <Suspense fallback={<InventoryLoadingFallback />}>
        <InventoryContent searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
};

export default Inventory;
