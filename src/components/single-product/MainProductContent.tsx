import { Product } from "@/lib/types/data";
import { AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import ProductImage from "./ProductImage";
import ShortcutBox from "./ShortcutBox";

const MainProductContent = async ({ slug }: { slug: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: "no-store",
  });

  // ----------- HANDLE KNOWN ERRORS -----------
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    if (res.status === 500) {
      return (
        <div className="text-center mt-16">
          <AlertTriangle className="inline size-10 mb-4 text-red-400 animate-pulse" />
          <p className="text-red-500">
            Server error occurred while fetching the product.
          </p>
        </div>
      );
    }
    return (
      <div className="text-center mt-16">
        <AlertTriangle className="inline size-10 mb-4 text-red-400 animate-pulse" />
        <p className="text-red-500">
          An error occurred while fetching the product.
        </p>
      </div>
    );
  }

  const data = await res.json();
  const product: Product = data.product;

  const generateCategoryLink = (category: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    return `/products?${params.toString()}`;
  };

  const generateSubcategoryLink = (category: string, subcategory: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    params.set("subcategory", subcategory);
    return `/products?${params.toString()}`;
  };

  return (
    <div className="qtron-container py-4">
      <header className="mb-4">
        <Breadcrumb>
          <BreadcrumbList className="gap-1!">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={generateCategoryLink(product.category[0])}>
                  {product.category[0]}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={generateSubcategoryLink(
                    product.category[0],
                    product.subCategory[0]
                  )}
                >
                  {product.subCategory[0]}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/products?brand=${product.brand}`}>
                  {product.brand}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_2fr_250px] gap-3">
        <ProductImage images={product.images} />
        <article className="bg-blue-300">Details</article>
        <ShortcutBox product={product} />
      </div>
    </div>
  );
};
export default MainProductContent;
