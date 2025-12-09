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
import { Badge } from "../ui/badge";
import Price from "../global/Price";
import { FaStar } from "react-icons/fa";
import ColorVariants from "./ColorVariants";
import AddToCartButton from "./AddToCartButton";
import ProductDescription from "./ProductDescription";

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

  // Get discounted percentage if available
  const hasDiscount = product.listPrice && product.listPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.listPrice! - product.price) / product.listPrice!) * 100
      )
    : 0;

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

      <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_2fr_250px] gap-3">
        <ProductImage images={product.images} />
        <article className="">
          <div className="mb-4 border-b pb-2">
            <h1 className="text-xl font-medium">{product.name}</h1>
            <p className="mt-2">
              Brand:{" "}
              <Link
                href={`/products?brand=${product.brand}`}
                className="text-sm text-primary"
              >
                {product.brand}
              </Link>{" "}
              |{" "}
              <Link
                href={`${generateCategoryLink(product.category[0])}&brand=${
                  product.brand
                }`}
                className="text-sm text-primary"
              >
                Similar products from {product.brand}
              </Link>
            </p>
          </div>

          <div className="mb-4 border-b pb-2">
            <Badge className="rounded text-sm bg-red-700 text-white py-1">
              Limited time deal
            </Badge>

            <div className="flex items-center mt-2 mb-1 gap-3">
              {hasDiscount && (
                <p className="text-xl text-red-500">- {discountPercentage}%</p>
              )}
              <Price amount={product.price} className="text-xl font-semibold" />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">List Price:</span>
              <Price
                amount={product.listPrice || product.price}
                className="text-xs text-gray-500 line-through ml-2"
              />
            </div>
            <p className="text-sm mt-2">
              {product.freeShipping
                ? "Eligible for Free Shipping"
                : "+ Shipping & Import charges. See checkout for details."}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center gap-1">
                <FaStar className="inline size-5 text-yellow-500" />
                <FaStar className="inline size-5 text-yellow-500" />
                <FaStar className="inline size-5 text-yellow-500" />
                <FaStar className="inline size-5 text-yellow-500" />
                <FaStar className="inline size-5 text-neutral-400" />
              </div>
              <button className="">(10 verified ratings)</button>
            </div>
          </div>

          <div className="border-b mb-4 pb-2">
            {/* Color Variants */}
            <ColorVariants colors={product.colors} />

            {/* Keywords */}
            {product?.keywords && (
              <ul className="mt-4">
                {product?.keywords?.map((keyword) => (
                  <li key={keyword} className="text-sm list-disc ml-4.5 mb-1">
                    {keyword}
                  </li>
                ))}
              </ul>
            )}

            <AddToCartButton productId={product._id} />
          </div>

          <div className="border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold mb-2">Product Features</h2>

            {product?.features && (
              <ul className="list-disc ml-4 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">About this item</h2>
            <ProductDescription description={product.description} />
          </div>
        </article>
        <ShortcutBox product={product} />
      </div>
    </div>
  );
};
export default MainProductContent;
