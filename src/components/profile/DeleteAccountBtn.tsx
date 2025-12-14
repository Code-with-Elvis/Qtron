"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmPasswordSchema } from "@/lib/validationSchemas";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const DeleteAccountBtn = () => {
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      setIsLoading(true);
      const res = await axios.delete("/api/auth/delete-account", { data });

      toast.success(res.data.message || "Account deleted successfully.");
      setOpen(false);

      // Sign out the user after password update

      const lang = searchParams.get("lang");
      const callbackUrl = lang ? `/signin?lang=${lang}` : "/signin";
      await signOut({ redirect: true, callbackUrl });
    } catch (error) {
      console.error("Error deleting account:", error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          toast.error(
            error.response?.data.message ||
              "Validation error. Please check your input."
          );
        } else if (status === 403) {
          const lang = searchParams.get("lang");
          const redirectUrl = lang ? `/?lang=${lang}` : "/";
          router.push(redirectUrl);
          toast.error("You do not have permission to perform this action.");
        } else if (status === 401) {
          toast.error(
            error.response?.data.message || "Please sign in to continue."
          );
        } else {
          toast.error(error.response?.data.message || "Something went wrong.");
        }
      } else {
        toast.error("Failed to delete account. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <Button className="rounded" disabled>
        Processing...
      </Button>
    );
  }

  if (!isAuthenticated) {
    const lang = searchParams.get("lang");
    const redirectUrl = lang ? `/signin?lang=${lang}` : "/signin";
    router.push(redirectUrl);
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password input field can be added here */}
          <div className="mb-4">
            <Input
              type="password"
              id="user-password"
              {...register("password")}
              placeholder="********"
              className={`rounded ${
                errors.password ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.password.message}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader /> : "Continue"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteAccountBtn;
