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

    if (searchTerm.trim()) {
      const params = new URLSearchParams(); // Create a fresh set of search parameters
      params.set("q", searchTerm); // Add only the search term to the URL
      router.push(`?${params.toString()}`); // Apply new search params to URL
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center gap-2 max-w-[340px]"
    >
      <RiSearchLine className="absolute text-xl -translate-y-1/2 pointer-events-none top-1/2 left-4 text-neutral-500 dark:text-neutral-300" />
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-8 px-4 pl-12  text-sm rounded-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary border-border border"
      />
      <Button type="submit" size="sm" className="">
        <Search />
      </Button>
    </form>
  );
};
export default SearchForm;
