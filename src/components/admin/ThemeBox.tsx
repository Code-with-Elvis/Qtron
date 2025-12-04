"use client";

import { useTheme } from "next-themes";
import { IoCaretDownSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/lib/data";
import { Button } from "../ui/button";

const Theme = () => {
  const { theme, setTheme } = useTheme();

  const applyTheme = (id: string) => {
    const root = document.documentElement;

    // Remove ALL theme classes
    themes.forEach((t) => root.classList.remove(t.id));

    // Add the current theme
    root.classList.add(id);

    // Update next-themes internal state
    setTheme(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded">
          <span className="text-sm inline-block leading-none">Theme:</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold leading-none">
              {themes.find((t) => t.id === theme)?.label || "Volt"}
            </span>
            <IoCaretDownSharp className="size-3 mt-1" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-[1280px]:mr-4">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themes.map((t) => (
          <DropdownMenuCheckboxItem
            key={t.id}
            checked={theme === t.id}
            onCheckedChange={() => applyTheme(t.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span
              className="inline-block size-4 rounded-full border border-white/20"
              style={{ backgroundColor: t.preview }}
            />
            {t.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
