"use client";

import { Product } from "@/lib/types/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useId } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../ui/button";

const ProductsSlider = ({ products }: { products: Product[] }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const uniqueId = useId();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      <Button
        ref={prevButtonRef}
        variant={"outline"}
        size={"icon-lg"}
        className={`swiper-button-prev-${uniqueId} absolute left-0 top-1/2 -translate-y-1/2 z-10 shadow-lg transition-all duration-300 ${
          isBeginning ? "hidden" : "hidden md:group-hover:flex"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <Button
        ref={nextButtonRef}
        variant={"outline"}
        size={"icon-lg"}
        className={`swiper-button-next-${uniqueId} absolute right-0 top-1/2 -translate-y-1/2 z-10 shadow-lg transition-all duration-300 ${
          isEnd ? "hidden" : "hidden md:group-hover:flex"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="size-6" />
      </Button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={1.5}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevButtonRef.current;
              navigation.nextEl = nextButtonRef.current;
            }
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
        className="w-full pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <Link href={`/products/${product.slug}`} className="block group">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={product.images[0] || "/placeholder-product.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
                {product.isFeatured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-3 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.listPrice && product.listPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.listPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ProductsSlider;
