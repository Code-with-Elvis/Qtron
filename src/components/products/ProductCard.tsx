import { Product } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  const discount =
    product.listPrice && product.listPrice > product.price
      ? Math.round(
          ((product.listPrice - product.price) / product.listPrice) * 100
        )
      : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.images[0] || "/placeholder-product.png"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover  group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% off
          </span>
        )}
      </div>

      <div className="py-4">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex max-[360px]:flex-col items-center max-[360px]:items-start max-[360px]:gap-1 gap-2 mb-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.listPrice && product.listPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.listPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
