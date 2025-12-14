import { homeExploreSubcategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type SubcategoryKey =
  | "analogWatches"
  | "cameras"
  | "refrigerators"
  | "smartWatches"
  | "blenders";

const ExploreSubcategories = async () => {
  const t = await getTranslations("home");

  const subcategoryKeys: Record<string, SubcategoryKey> = {
    "Analog Watches": "analogWatches",
    Cameras: "cameras",
    Refrigerators: "refrigerators",
    "Smart Watches": "smartWatches",
    Blenders: "blenders",
  };

  return (
    <div className="qtron-container py-5">
      <div className="unique-section p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {homeExploreSubcategories.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            className={`${
              homeExploreSubcategories.length - 1 === index
                ? "hidden md:block"
                : ""
            }`}
          >
            <Image
              src={item.image}
              alt={t(subcategoryKeys[item.name])}
              width={100}
              height={100}
              className="w-full h-auto object-cover"
            />
            <p className="mt-px text-sm">{t(subcategoryKeys[item.name])}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ExploreSubcategories;
