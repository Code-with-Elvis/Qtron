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
import { useState, useEffect } from "react";
import { IoCaretDownSharp } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const LanguageBox = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en";

  const [language, setLanguage] = useState(
    () => languages.find((lang) => lang.code === currentLang) || languages[0]
  );

  // Update language state when URL param changes
  useEffect(() => {
    const lang = languages.find((l) => l.code === currentLang);
    if (lang) setLanguage(lang);
  }, [currentLang]);

  const handleLanguageChange = (value: string) => {
    const selected = languages.find((lang) => lang.name === value);
    if (selected) {
      setLanguage(selected);

      // Create new URLSearchParams preserving existing params
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", selected.code);

      // Navigate with updated params and refresh to pick up new locale
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1 h-10 shrink-0 px-1.5 border-neutral-700 hover:border-border border rounded transition-all duration-100 ease-in-out">
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
          <IoCaretDownSharp className="size-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language.name}
          onValueChange={handleLanguageChange}
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
export default LanguageBox;
