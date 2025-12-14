"use client";

import { useTheme } from "next-themes";
import { IoCaretDownSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/lib/data";

const Theme = () => {
  const t = useTranslations("common");
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
      <DropdownMenuTrigger className="hidden md:flex  items-center gap-1 h-12.5 shrink-0 px-1.5 border-transparent hover:border-border border rounded transition-all duration-100 ease-in-out">
        <div className="flex flex-col items-start gap-0.5 justify-center">
          <span className="text-sm inline-block text-muted-foreground leading-none">
            {t("theme")}:
          </span>
          <div className="flex items-center gap-1">
            <span className="font-semibold leading-none">
              {themes.find((t) => t.id === theme)?.label || "Volt"}
            </span>
            <IoCaretDownSharp className="size-3 mt-1" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 max-[1280px]:mr-4">
        <DropdownMenuLabel>{t("chooseTheme")}</DropdownMenuLabel>
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
