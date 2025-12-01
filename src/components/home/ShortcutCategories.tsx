import { homeShortCutCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const ShortcutCategories = () => {
  return (
    <div className="qtron-container grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5">
      <article className="bg-white p-4 ">
        <h2 className="mb-2 text-lg font-bold">
          {homeShortCutCategories[0].name}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {homeShortCutCategories[0].products.map((product) => (
            <Link href="#" className="block" key={product.id}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-auto object-cover border-border border"
              />
              <p className="mt-px text-sm">{product.name}</p>
            </Link>
          ))}
        </div>
      </article>
      <article className="bg-white p-4 ">
        <h2 className="mb-2 text-lg font-bold">
          {homeShortCutCategories[1].name}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {homeShortCutCategories[1].products.map((product) => (
            <Link href="#" className="block" key={product.id}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-auto object-cover border-border border"
              />
              <p className="mt-px text-sm">{product.name}</p>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
};
export default ShortcutCategories;
