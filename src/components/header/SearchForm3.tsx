"use client";

import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchForm = () => {
  return (
    <div className="qtron-container pb-1.5">
      <form className="relative flex md:hidden">
        <Input
          className="h-10 rounded relative pl-4 pr-15"
          placeholder="Seach Qtron"
        />
        <Button className="absolute z-10 right-0 top-0 h-10 rounded rounded-l-none ">
          <RiSearchLine className="size-6" />
        </Button>
      </form>
    </div>
  );
};
export default SearchForm;
