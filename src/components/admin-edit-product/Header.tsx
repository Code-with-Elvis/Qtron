"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Header = ({ slug }: { slug: string }) => {
  const pathname = usePathname();

  const isEditingImages = pathname.endsWith("/image");
  return (
    <header className="pb-2 border-b border-border mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant={isEditingImages ? "outline" : "default"}
          size="sm"
          className="rounded"
        >
          <Link href={`/admin/products/edit/${slug}`}>Edit Details</Link>
        </Button>
        <Button
          variant={isEditingImages ? "default" : "outline"}
          size="sm"
          className="rounded"
        >
          <Link href={`/admin/products/edit/${slug}/image`}>Edit Images</Link>
        </Button>
      </div>
      <h2 className="text-xl mt-6 font-semibold">
        {isEditingImages ? "Edit Product Images" : "Edit Product Details"}
      </h2>
    </header>
  );
};
export default Header;
