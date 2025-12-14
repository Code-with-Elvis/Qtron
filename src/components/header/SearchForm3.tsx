"use client";

import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const SearchForm = () => {
  const t = useTranslations("common");
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // === Extract the search term from URL on page load ===
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchTerm(query);
  }, [searchParams]);

  // === Handle form submission ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const params = new URLSearchParams(); // Create a fresh set of search parameters
      params.set("q", searchTerm); // Add only the search term to the URL
      router.push(`?${params.toString()}`); // Apply new search params to URL
    }
  };
  return (
    <div className="qtron-container pb-1.5">
      <form onSubmit={handleSubmit} className="relative flex md:hidden">
        <Input
          className="h-10 rounded relative pl-4 pr-15"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="absolute z-10 right-0 top-0 h-10 rounded rounded-l-none "
        >
          <RiSearchLine className="size-6" />
        </Button>
      </form>
    </div>
  );
};
export default SearchForm;
