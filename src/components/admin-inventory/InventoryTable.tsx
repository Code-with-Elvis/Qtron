import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Package } from "lucide-react";
import Link from "next/link";

interface Product {
  slug: string;
  _id: string;
  name: string;
  brand: string;
  image: string | null;
  price: number;
  countInStock: number;
  stockStatus: string;
  stockBadgeVariant: "outline" | "destructive" | "secondary";
  inventoryValue: number;
  needsRestock: boolean;
  isPublished: boolean;
}

interface InventoryTableProps {
  products: Product[];
}

const InventoryTable = ({ products }: InventoryTableProps) => {
  return (
    <div className="overflow-x-auto pb-3">
      <table className="border w-full min-w-max">
        <thead>
          <tr className="bg-muted/50">
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Product
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Brand
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Price
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Stock
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Status
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Inventory Value
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Published
            </th>
            <th className="border text-start py-2 px-2 text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className={`hover:bg-muted/30 transition-colors ${
                product.needsRestock ? "alert-warning" : ""
              }`}
            >
              {/* Product Info */}
              <td className="border py-2 px-2 w-80">
                <div className="flex items-center gap-3">
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
                  <div className="min-w-0">
                    <p className="font-medium text-sm line-clamp-2">
                      {product.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* Brand */}
              <td className="border py-2 px-2 text-sm">{product.brand}</td>

              {/* Price */}
              <td className="border py-2 px-2 text-sm font-semibold">
                {product.price}
              </td>

              {/* Stock Count */}
              <td className="border py-2 px-2">
                <span
                  className={`text-sm font-bold ${
                    product.countInStock === 0
                      ? "text-red-600"
                      : product.needsRestock
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {product.countInStock}
                </span>
              </td>

              {/* Status Badge */}
              <td className="border py-2 px-2">
                {/* variant={product.stockBadgeVariant} */}
                <Badge variant={product.stockBadgeVariant} className="rounded">
                  {product.stockStatus}
                </Badge>
              </td>

              {/* Inventory Value */}
              <td className="border py-2 px-2 text-sm font-semibold">
                {product.inventoryValue}
              </td>

              {/* Published Status */}
              <td className="border py-2 px-2">
                <Badge
                  variant={product.isPublished ? "default" : "secondary"}
                  className="rounded"
                >
                  {product.isPublished ? "Yes" : "No"}
                </Badge>
              </td>

              {/* Actions */}
              <td className="border py-2 px-2">
                <Button asChild variant="outline" size="icon-sm">
                  <Link href={`/admin/products/edit/${product.slug}`}>
                    <Edit className="size-4" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
