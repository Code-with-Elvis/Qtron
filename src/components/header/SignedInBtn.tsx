"use client";

import { useAuth } from "@/hooks/useAuth";
import { IoCaretDownSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";

const SignedInBtn = () => {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer h-12.5 shrink-0 px-1.5 border-transparent hover:border-border border rounded hidden md:flex items-center gap-1 transition-all duration-100 ease-in-out">
          <div className="flex items-start flex-col gap-0.5">
            <span className="text-sm text-muted-foreground leading-none capitalize truncate">
              Hello, {user?.name || "User"}
            </span>
            <span className="font-semibold leading-none flex items-center gap-1">
              Account & Orders <IoCaretDownSharp className="size-3 mt-1" />
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded">
        <DropdownMenuLabel>
          <h4>{user?.name || "User"}</h4>
          <p className="text-muted-foreground font-normal truncate">
            {user?.email || "user@example.com"}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile" className="inline-block w-full">
            Your Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/orders" className="inline-block w-full">
            Your Orders
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin" className="inline-block w-full">
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <span className="flex w-full justify-center">
              <Loader className="size-4 animate-spin" />
            </span>
          ) : (
            "Sign Out"
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SignedInBtn;
