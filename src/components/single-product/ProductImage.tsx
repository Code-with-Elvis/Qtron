"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImage = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <article className="flex flex-col md:flex-row items-start gap-2">
      {/* == Thumbnails == */}
      <div className="flex md:flex-col gap-1.5 order-2 md:order-1">
        {images.map((imgUrl, index) => (
          <div
            key={index}
            className={`size-12 border-2 hover:border-primary rounded-sm overflow-hidden cursor-pointer transition-all ${
              activeImage === imgUrl
                ? "border-primary ring-1 ring-primary/20"
                : "border-border"
            }`}
            onMouseEnter={() => setActiveImage(imgUrl)}
            onClick={() => setActiveImage(imgUrl)}
          >
            <Image
              src={imgUrl}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* == Main Image with Zoom == */}
      <div className="flex-1 order-1 md:order-2 w-full relative">
        <div
          ref={imageRef}
          className="relative bg-muted overflow-hidden cursor-pointer"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <Zoom>
            <Image
              src={activeImage || "/placeholder-product.png"}
              alt="Main product image"
              width={600}
              height={600}
              className="object-contain w-full h-auto"
              priority
            />
          </Zoom>

          {/* -- Zoom overlay - only on desktop -- */}
          {showZoom && (
            <div className="hidden lg:block absolute inset-0 bg-black/10 pointer-events-none">
              <div
                className="absolute w-32 h-32 border-2 border-primary/50 bg-primary/10"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          )}
        </div>

        {/* -- Zoomed view - only on desktop -- */}
        {showZoom && (
          <div className="hidden lg:block absolute left-full ml-4 top-0 w-96 h-96 border border-border overflow-hidden bg-white shadow-lg z-50">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundSize: "200%",
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
};
export default ProductImage;
