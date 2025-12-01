"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="qtron-container">
      <div className="relative py-4">
        <Carousel
          setApi={setApi}
          className="w-full max-w-full"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2">
              <article className="bg-primary/14 h-80 rounded overflow-hidden grid grid-cols-1 sm:grid-cols-[1.5fr_2fr]">
                <div className="flex flex-col justify-center px-4 py-10 sm:py-0 ">
                  <h1 className="font-extrabold text-xl mb-1">
                    20% OFF ON FIRST ORDER
                  </h1>
                  <p className="text-sm">
                    Offer valid for new customers only. Use code FIRST20 at
                    checkout.
                  </p>
                  <Button className="mt-4 w-max" size="lg">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                </div>
                <div>
                  <Image
                    src="/hero A.png"
                    alt="Hero Image"
                    width={600}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2">
              <Link
                href="/shop"
                className="bg-primary/14 h-80 rounded flex flex-col justify-between overflow-hidden"
              >
                <Image
                  src="/hero B.png"
                  alt="Hero Image"
                  width={600}
                  height={300}
                  className="w-full h-54 object-cover"
                />
                <div className="px-4 pb-5">
                  <h2 className="font-extrabold text-xl mb-1">
                    Bring Home a Big Screen for Less
                  </h2>
                  <p className="text-sm">
                    Turn your living room into a home theater with our latest
                    deals on big screen TVs.
                  </p>
                </div>
              </Link>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/* Custom Pagination */}
        {count > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Hero;
