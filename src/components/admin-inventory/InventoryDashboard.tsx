import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  PackageCheck,
  PackageX,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { headers } from "next/headers";
import { ScrollArea } from "../ui/scroll-area";

interface DashboardMetrics {
  totalProducts: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalInventoryValue: number;
}

interface Product {
  _id: string;
  name: string;
  countInStock?: number;
  images: string[];
  image: string | null;
  updatedAt?: string;
}

interface DashboardData {
  metrics: DashboardMetrics;
  alerts: {
    lowStockProducts: Product[];
    recentlyOutOfStock: Product[];
  };
  insights: {
    stockByCategory: Array<{
      _id: string;
      totalStock: number;
      productCount: number;
    }>;
    lowStockPercentage: number;
    outOfStockPercentage: number;
  };
}

const InventoryDashboard = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/inventory/dashboard`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard metrics");
    }

    const data: DashboardData = await res.json();

    return (
      <div className="space-y-6">
        {/* === Key Metrics Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Products */}
          <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.metrics.totalProducts}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All inventory items
              </p>
            </CardContent>
          </Card>

          {/* In Stock */}
          <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <PackageCheck className="size-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.metrics.inStock}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Stock {">"} 10 units
              </p>
            </CardContent>
          </Card>

          {/* Low Stock */}
          <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="size-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {data.metrics.lowStock}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.insights.lowStockPercentage}% of inventory
              </p>
            </CardContent>
          </Card>

          {/* Out of Stock */}
          <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Out of Stock
              </CardTitle>
              <PackageX className="size-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {data.metrics.outOfStock}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.insights.outOfStockPercentage}% of inventory
              </p>
            </CardContent>
          </Card>
        </div>

        {/* === Alerts Section === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Low Stock Alerts */}
          <Card className="rounded">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="size-5 text-yellow-600" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.alerts.lowStockProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No low stock items
                </p>
              ) : (
                <div className="space-y-3">
                  {data.alerts.lowStockProducts.slice(0, 2).map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-3 p-2 rounded border alert-warning"
                    >
                      <div className="relative size-12 rounded border bg-muted shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="size-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {product.name}
                        </p>
                        <Badge className="mt-1 text-xs">
                          Only {product.countInStock} left
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total Inventory Value */}
          <Card className="rounded">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="size-5 text-primary" />
                Inventory Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.metrics.totalInventoryValue}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total stock value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* === Stock by Category === */}
        {data.insights.stockByCategory.length > 0 && (
          <Card className="rounded">
            <CardHeader>
              <CardTitle className="text-lg">Stock by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60 w-full">
                <div className="space-y-3 pr-4">
                  {data.insights.stockByCategory.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{category._id}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.productCount} products
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {category.totalStock} units
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="text-center text-red-500 py-8">
        <p>Failed to load dashboard metrics</p>
      </div>
    );
  }
};

export default InventoryDashboard;
