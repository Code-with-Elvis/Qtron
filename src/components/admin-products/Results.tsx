import { Product, ResultsProps } from "@/lib/types/data";
import { formatDate, trimProductId } from "@/lib/utils";
import { IconMoodEmptyFilled } from "@tabler/icons-react";
import { AlertTriangle, Edit, View } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";

const Results = async ({ searchParams }: ResultsProps) => {
  try {
    const resolvedParams = await searchParams;
    const search = resolvedParams.q || "";
    const page = resolvedParams.page
      ? Math.max(1, parseInt(resolvedParams.page, 10))
      : 1;
    const limit = resolvedParams.limit
      ? Math.max(1, parseInt(resolvedParams.limit, 10))
      : 9;
    const query = `q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }

    const data = await res.json();

    if (data.products.length === 0) {
      return (
        <div className="text-center mt-16 text-neutral-400">
          <IconMoodEmptyFilled className="inline size-10 mb-2 text-yellow-400 animate-pulse" />
          <p>No products found matching your criteria.</p>
        </div>
      );
    }

    return (
      <div className=" overflow-x-auto pb-3">
        <table className="border w-full min-w-2xl">
          <thead>
            <tr>
              <th className="border text-start py-.5 px-1.5 text-sm">Id</th>
              <th className="border text-start py-.5 px-1.5 text-sm">Name</th>
              <th className="border text-start py-.5 px-1.5 text-sm">Price</th>
              <th className="border text-start py-.5 px-1.5 text-sm">
                Category
              </th>
              <th className="border text-start py-.5 px-1.5 text-sm">Stock</th>
              <th className="border text-start py-.5 px-1.5 text-sm">
                Published
              </th>
              <th className="border text-start py-.5 px-1.5 text-sm">
                Last Updated
              </th>
              <th className="border text-start py-.5 px-1.5 text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((product: Product) => (
              <tr key={product._id}>
                <td className="border py-.5 px-1.5 text-sm">
                  {trimProductId(product._id)}
                </td>
                <td className="border py-.5 px-1.5 text-sm">{product.name}</td>
                <td className="border py-.5 px-1.5 text-sm">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border py-.5 px-1.5 text-sm">
                  {product.category[0]}
                </td>
                <td className="border py-.5 px-1.5 text-sm">
                  {product.countInStock}
                </td>
                <td className="border py-.5 px-1.5 text-sm">
                  {product.isPublished ? "Yes" : "No"}
                </td>
                <td className="border py-.5 px-1.5 text-sm">
                  {formatDate(product.updatedAt)}
                </td>
                <td className="border py-.5 px-1.5 text-sm">
                  {/* Actions buttons or links can be added here */}
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="icon-sm">
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <Edit />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon-sm">
                      <Link href={`/products/${product.slug}`}>
                        <View className="size-4 mr-1" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon-sm">
                      <RiDeleteBin5Line />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error("Error fetching meals:", error);
    return (
      <div className="text-center text-red-500 mt-16">
        <AlertTriangle className="inline size-9 animate-pulse text-yellow-400  mb-4" />
        <p>An error occurred while fetching products.</p>
      </div>
    );
  }
};
export default Results;
