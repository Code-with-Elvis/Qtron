import { featuredBrands } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const Brands = async () => {
  const t = await getTranslations("home");
  return (
    <div className="qtron-container">
      <h2 className="mb-2 text-lg font-bold sr-only">{t("featuredBrands")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {/* Brands Grid */}
        {featuredBrands.map((brand) => (
          <Link
            href={brand.link}
            key={brand.name}
            className="grid place-items-center border h-14 sm:h-20 bg-white"
          >
            <Image
              src={brand.image}
              alt="brand-logo"
              width={100}
              height={50}
              className="w-14 sm:w-24"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Brands;
