"use client";

import { changePasswordSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

const PasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      setIsUpdating(true);
      const res = await axios.put("/api/auth/update-password", data);
      if (res.data.success) {
        toast.success("Password updated successfully! Logging out...");
        // Sign out the user after password update
        const lang = searchParams.get("lang");
        const callbackUrl = lang ? `/signin?lang=${lang}` : "/signin";
        await signOut({ redirect: true, callbackUrl });
      }
    } catch (error) {
      console.error("Error updating password:", error);
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
          const lang = searchParams.get("lang");
          const redirectUrl = lang ? `/?lang=${lang}` : "/";
          router.push(redirectUrl);
          toast.error("Please sign in to continue.");
        } else {
          toast.error(
            "Failed to update account password. Please try again later."
          );
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 mx-auto max-w-[400px]"
    >
      <Card className="rounded-sm shadow-none">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">Change Password</CardTitle>
          <CardDescription>
            Update your account password securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* -- Current Password -- */}
          <div className="mb-2">
            <Label htmlFor="currentPassword" className="text-sm ml-1 mb-1">
              Current Password
            </Label>
            <Input
              type="password"
              id="currentPassword"
              {...register("currentPassword")}
              placeholder="********"
              className={`rounded ${
                errors.currentPassword ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.currentPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.currentPassword.message}
              </p>
            )}
          </div>
          {/* -- New Password -- */}
          <div className="mb-2">
            <Label htmlFor="newPassword" className="text-sm ml-1 mb-1">
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              {...register("newPassword")}
              placeholder="********"
              className={`rounded ${
                errors.newPassword ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.newPassword.message}
              </p>
            )}
          </div>
          {/* -- Confirm New Password -- */}
          <div className="mb-2">
            <Label htmlFor="confirmNewPassword" className="text-sm ml-1 mb-1">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirmNewPassword"
              {...register("confirmPassword")}
              placeholder="********"
              className={`rounded ${
                errors.confirmPassword ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            size={"lg"}
            aria-label="Sign In"
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating && <Loader className="size-5 animate-spin" />}
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default PasswordForm;
