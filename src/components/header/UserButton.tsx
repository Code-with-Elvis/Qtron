import ProfileIcon from "@/assets/ProfileIcon";
import Link from "next/link";
import { MdOutlineChevronRight } from "react-icons/md";

const UserButton = () => {
  return (
    <Link
      href="/signin"
      className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex md:hidden items-center gap-1 transition-all duration-100 ease-in-out"
    >
      <div className="flex items-center">
        <span className="">Sign in</span>
        <MdOutlineChevronRight className="leading-none mt-1" />
      </div>
      <ProfileIcon className="size-6" />
    </Link>
  );
};
export default UserButton;
