import Logo from "@/assets/Logo";
import Link from "next/link";
import LocationBox from "./LocationBox";
import SearchForm from "./SearchForm";
import LanguageBox from "./LanguageBox";
import ThemeBox from "./ThemeBox";
import SignedOutBtn from "./SignedOutBtn";
import CartButton from "./CartButton";
import SearchForm2 from "./SearchForm2";
import CategoriesBtn from "./CategoriesBtn";
import UserButton from "./UserButton";

const Header = () => {
  return (
    <header>
      <div className="qtron-container h-16 flex items-center justify-between md:justify-start gap-1">
        <div className="flex items-center gap-1">
          <CategoriesBtn />
          <Link
            href="/"
            className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex items-center gap-1 text-xl font-semibold transition-all duration-100 ease-in-out"
          >
            <Logo className="size-9 text-primary" />
            <span className="hidden sm:inline-block">Qtron</span>
          </Link>
        </div>
        <LocationBox />
        <SearchForm />
        <SearchForm2 />
        <LanguageBox />
        <ThemeBox />
        <SignedOutBtn />
        <div className="flex items-center gap-1">
          <UserButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
};
export default Header;
