"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
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
import { confirmPasswordSchema } from "@/lib/validationSchemas";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

const DeactivationBtn = () => {
  const router = useRouter();
  const { isActive, isLoading: authLoading, isAuthenticated } = useAuth();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      setIsLoading(true);
      const res = await axios.put("/api/auth/deactivate-accout", data);

      // Success - API returns { message, active }
      toast.success(res.data.message || "Account status updated successfully.");
      reset();
      setOpen(false);

      // Update session to reflect new active status
      await update();
    } catch (error) {
      console.error("Error toggling account status:", error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          toast.error(
            error.response?.data.message ||
              "Validation error. Please check your input."
          );
        } else if (status === 403) {
          router.push("/");
          toast.error("You do not have permission to perform this action.");
        } else if (status === 401) {
          toast.error(
            error.response?.data.message || "Please sign in to continue."
          );
        } else {
          toast.error(error.response?.data.message || "Something went wrong.");
        }
      } else {
        toast.error("Failed to update account status. Please try again later.");
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
    router.push("/signin");
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={isActive ? "default" : "outline"} className="rounded">
          {isActive ? "Deactivate" : "Activate"} Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter your password to confirm</AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? "This action will deactivate your account. You can reactivate it by logging back in. All your data will be preserved."
              : "This action will reactivate your account."}
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
export default DeactivationBtn;
