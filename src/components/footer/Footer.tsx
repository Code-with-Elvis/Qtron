"use client";

import { footerLinks } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "@/assets/Logo";
import ThemeBox from "./ThemeBox";
import LanguageBox from "./LanguageBox";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      {/* ---- Footer Scroll Top section ---- */}
      <Button
        onClick={scrollToTop}
        size="lg"
        className="bg-accent w-full rounded-none hover:bg-accent/90"
      >
        <div className="qtron-container">Back to top</div>
      </Button>
      {/* ---- Footer Main section ---- */}
      <section className="py-5 bg-[#222] text-white">
        <div className="qtron-container grid grid-cols-2 sm:grid-cols-4 gap-5">
          <nav>
            <h3 className="text-lg font-bold mb-1">{footerLinks[0].title}</h3>
            <ul>
              {footerLinks[0].content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-200 w-full py-1 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="hidden sm:block">
            <h3 className="text-lg font-bold mb-1">{footerLinks[1].title}</h3>
            <ul>
              {footerLinks[1].content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-200 w-full py-1 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <h3 className="text-lg font-bold mb-1">{footerLinks[2].title}</h3>
            <ul>
              {footerLinks[2].content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-200 w-full py-1 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="hidden sm:block">
            <h3 className="text-lg font-bold mb-1">{footerLinks[3].title}</h3>
            <ul>
              {footerLinks[3].content.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-neutral-200 w-full py-1 text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      {/* ---- Theme and Language section ---- */}
      <section className="bg-[#222] text-white border-t border-neutral-700">
        <div className="qtron-container py-5 flex items-center justify-center gap-4 ">
          <Link
            href="/"
            className="h-10 border-transparent hover:border-border border px-1.5 rounded hidden sm:flex items-center w-fit gap-1 text-xl font-semibold transition-all duration-100 ease-in-out"
          >
            <Logo className="size-8 text-primary" />
            <span className="">Qtron</span>
          </Link>
          <ThemeBox />
          <LanguageBox />
        </div>
      </section>

      {/* ---- Footer Bottom section ---- */}
      <section className="bg-[#111] text-neutral-400 text-sm">
        <div className="qtron-container py-4 flex items-center justify-center ">
          <span>© {new Date().getFullYear()} Qtron. All rights reserved.</span>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
