"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/types/data";
import { adminUserUpdateSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Checkbox } from "../ui/checkbox";

const EditUserButton = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminUserUpdateSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        image: user.photo || "",
        role: user.role || "user",
        isVerified: user.isVerified || false,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof adminUserUpdateSchema>) => {
    try {
      setIsUpdating(true);
      const res = await axios.put(`/api/admin/users/${user._id}`, data);
      if (res.status === 200) {
        toast.success("Account updated successfully!");
        router.refresh();
        setIsOpen(false);
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
          toast.error("Failed to update user account. Please try again later.");
        }
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm" disabled={isUpdating}>
          {isUpdating ? <Loader2 className="animate-spin" /> : <Edit />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {user.name}</DialogTitle>
          <DialogDescription>
            Update the user information below and save changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* -- Role -- */}

          <div className="mb-2">
            <Label htmlFor="role" className="text-sm ml-1 mb-1">
              Role (optional)
            </Label>
            <Input
              type="text"
              id="role"
              {...register("role")}
              className={`rounded ${
                errors.role ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.role && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.role.message}
              </p>
            )}
          </div>

          {/* -- Verified -- */}

          <div className="mb-2">
            <Label htmlFor="isVerified" className="text-sm ml-1 mb-1">
              Verified (optional)
            </Label>
            <Controller
              name="isVerified"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isVerified"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  className="ml-.5 scale-150"
                />
              )}
            />
            {errors.isVerified && (
              <p className="text-xs font-medium ml-1 mt-1 text-red-500">
                * {errors.isVerified.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditUserButton;
