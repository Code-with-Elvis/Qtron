"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "@/lib/validationSchemas";
import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AccountForm = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { update } = useSession();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        image: user.photo || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof userUpdateSchema>) => {
    try {
      setIsUpdating(true);
      const res = await axios.put("/api/auth/me", data);
      if (res.data.success) {
        // Trigger session update to refetch user data from database
        await update();
        toast.success("Account updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
          router.push("/");
          toast.error("Please sign in to continue.");
        } else {
          toast.error("Failed to update account. Please try again later.");
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-10 justify-center flex items-center gap-2">
        <Loader className="size-6 animate-spin" />
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 mx-auto max-w-[400px]"
    >
      <Card className="rounded-sm shadow-none">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">Account Settings</CardTitle>
          <CardDescription>
            Make changes to your personal account information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* -- Full name -- */}
          <div className="mb-2">
            <Label htmlFor="fullName" className="text-sm ml-1 mb-1">
              Full Name
            </Label>
            <Input
              type="text"
              id="fullName"
              {...register("name")}
              className={`rounded ${
                errors.name ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.name && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.name.message}
              </p>
            )}
          </div>
          {/* -- Phone -- */}
          <div className="mb-2">
            <Label htmlFor="phone" className="text-sm ml-1 mb-1">
              Phone (optional)
            </Label>
            <Input
              type="tel"
              id="phone"
              {...register("phone")}
              className={`rounded ${
                errors.phone ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.phone && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.phone.message}
              </p>
            )}
          </div>
          {/* -- Email -- */}
          <div className="mb-2">
            <Label htmlFor="email" className="text-sm ml-1 mb-1">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              disabled
              className={`rounded ${
                errors.email ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.email.message}
              </p>
            )}
          </div>

          {/* -- Image Url -- */}
          <div className="mb-2">
            <Label htmlFor="image" className="text-sm ml-1 mb-1">
              Image URL (optional)
            </Label>
            <Input
              type="url"
              id="image"
              {...register("image")}
              className={`rounded ${
                errors.image ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.image && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.image.message}
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
export default AccountForm;
