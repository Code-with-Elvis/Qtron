"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const SearchForm = () => {
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

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("q", searchTerm);
    } else {
      params.delete("q");
    }

    // Reset to page 1 when searching
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center gap-2 max-w-[340px]"
    >
      <RiSearchLine className="absolute text-xl -translate-y-1/2 pointer-events-none top-1/2 left-4 text-neutral-500 dark:text-neutral-300" />
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-9 px-4 pl-12 text-sm rounded-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary border-border border"
      />
      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchForm;
