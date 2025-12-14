import { homeShortCutCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const ShortcutCategories = async () => {
  const t = await getTranslations("home");

  // Translation mapping for category names and product names
  const categoryKeys: Record<string, string> = {
    "Elevate Your Sound": "elevateYourSound",
    "Save on deals": "saveOnDeals",
  };

  const productKeys: Record<string, string> = {
    Headphones: "headphones",
    Speakers: "speakers",
    Soundbars: "soundbars",
    Microphones: "microphones",
    Gaming: "gaming",
    Chargers: "chargers",
    Tablets: "tablets",
    Adapters: "adapters",
  };

  return (
    <div className="qtron-container grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5">
      <article className="category-card p-4">
        <h2 className="mb-2 text-lg font-bold">
          {t(
            categoryKeys[homeShortCutCategories[0].name] as
              | "elevateYourSound"
              | "saveOnDeals"
          )}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {homeShortCutCategories[0].products.map((product) => (
            <Link href={product.link} className="block" key={product.id}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-auto object-cover border-border border"
              />
              <p className="mt-px text-sm">
                {t(
                  (productKeys[product.name] || "headphones") as
                    | "headphones"
                    | "speakers"
                    | "soundbars"
                    | "microphones"
                    | "gaming"
                    | "chargers"
                    | "tablets"
                    | "adapters"
                )}
              </p>
            </Link>
          ))}
        </div>
      </article>
      <article className="category-card p-4">
        <h2 className="mb-2 text-lg font-bold">
          {t(
            categoryKeys[homeShortCutCategories[1].name] as
              | "elevateYourSound"
              | "saveOnDeals"
          )}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {homeShortCutCategories[1].products.map((product) => (
            <Link href={product.link} className="block" key={product.id}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-auto object-cover border-border border"
              />
              <p className="mt-px text-sm">
                {t(
                  (productKeys[product.name] || "headphones") as
                    | "headphones"
                    | "speakers"
                    | "soundbars"
                    | "microphones"
                    | "gaming"
                    | "chargers"
                    | "tablets"
                    | "adapters"
                )}
              </p>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
};
export default ShortcutCategories;
