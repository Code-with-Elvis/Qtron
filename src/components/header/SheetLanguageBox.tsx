"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { RxCaretSort } from "react-icons/rx";

const SheetLanguageBox = () => {
  const [language, setLanguage] = useState(languages[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-6 rounded-none justify-between">
          <span className="text-muted-foreground">Language:</span>
          <div className="flex gap-1 items-center">
            <Image
              src={language.image}
              alt={language.code}
              width={54}
              height={24}
              className="w-5.5 h-auto m-0"
            />
            <span className="uppercase font-semibold leading-0 inline-block">
              {language.code}
            </span>
            <RxCaretSort />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language.name}
          onValueChange={(value) => {
            const selected = languages.find((lang) => lang.name === value);
            if (selected) setLanguage(selected);
          }}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.name}>
              <div className="flex items-center gap-2">
                <span>{lang.label}</span>-
                <span className="uppercase">{lang.code}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SheetLanguageBox;
