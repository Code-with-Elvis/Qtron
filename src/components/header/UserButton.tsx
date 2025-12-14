"use client";

import ProfileIcon from "@/assets/ProfileIcon";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineChevronRight } from "react-icons/md";
import { useTranslations } from "next-intl";

const UserButton = () => {
  const t = useTranslations("common");
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <article className="skeleton h-8 w-16 rounded block md:hidden"></article>
    );
  }

  if (isAuthenticated) {
    return (
      <Link
        href="/profile"
        className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex md:hidden items-center gap-1 transition-all duration-100 ease-in-out"
      >
        <div className="flex items-center">
          <span className="capitalize">{user?.name.split(" ")[0]}</span>
          <MdOutlineChevronRight className="leading-none mt-1" />
        </div>
        <Image
          src={user?.photo || "/default-profile.png"}
          alt="Avatar"
          width={28}
          height={28}
          className="rounded-full w-8 shrink-0 h-8 border border-border object-cover "
        />
      </Link>
    );
  }

  return (
    <Link
      href="/signin"
      className="h-12.5 border-transparent hover:border-border border px-1.5 rounded flex md:hidden items-center gap-1 transition-all duration-100 ease-in-out"
    >
      <div className="flex items-center">
        <span className="">{t("signIn")}</span>
        <MdOutlineChevronRight className="leading-none mt-1" />
      </div>
      <ProfileIcon className="size-6" />
    </Link>
  );
};
export default UserButton;
