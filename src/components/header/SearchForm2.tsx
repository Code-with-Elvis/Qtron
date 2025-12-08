"use client";

import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      className="flex-1 relative hidden md:block lg:hidden"
    >
      <Input
        className="h-10 rounded relative pl-4 pr-15"
        placeholder="Seach Qtron"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="submit"
        variant="secondary"
        className="absolute z-10 right-0 top-0 h-10 rounded rounded-l-none "
      >
        <RiSearchLine className="size-6" />
      </Button>
    </form>
  );
};
export default SearchForm;
