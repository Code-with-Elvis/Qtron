"use client";

import { RiSearchLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { categories } from "@/lib/data";
import { IoCaretDownSharp } from "react-icons/io5";

const SearchForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [buttonWidth, setButtonWidth] = useState(80);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [selectedCategory]);

  return (
    <form className="flex-1 relative hidden lg:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            className="absolute text-muted-foreground left-0 top-0 h-10 z-10 rounded rounded-r-none"
          >
            <span>{selectedCategory}</span>
            <IoCaretDownSharp className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rounded">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
            {categories.slice(0, 10).map((category) => (
              <DropdownMenuRadioItem key={category.name} value={category.name}>
                {category.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        className="h-10 rounded relative"
        style={{ paddingLeft: `${buttonWidth + 8}px`, paddingRight: "60px" }}
        placeholder="Seach Qtron"
      />
      <Button
        variant="secondary"
        className="absolute z-10 right-0 top-0 h-10 rounded rounded-l-none "
      >
        <RiSearchLine className="size-6" />
      </Button>
    </form>
  );
};
export default SearchForm;
