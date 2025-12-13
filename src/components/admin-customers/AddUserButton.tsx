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
import { userRegisterSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const AddUserButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof userRegisterSchema>) => {
    try {
      setIsPending(true);
      const response = await axios.post("/api/auth/signup", data);

      if (response.status === 201) {
        toast.success("User created successfully!");
        router.refresh();
        reset();
        setIsOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "Something went wrong");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          size="sm"
          type="button"
          className="rounded hidden md:flex"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new user account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage && (
            <p className="text-sm mb-2 p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
              {errorMessage}
            </p>
          )}

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

          {/* -- Email -- */}
          <div className="mb-2">
            <Label htmlFor="email" className="text-sm ml-1 mb-1">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
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
          {/* -- Password -- */}
          <div className="mb-2">
            <Label htmlFor="password" className="text-sm ml-1 mb-1">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              {...register("password")}
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
          {/* -- Confirm Password -- */}
          <div className="mb-2">
            <Label htmlFor="confirmPassword" className="text-sm ml-1 mb-1">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
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
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="size-5 animate-spin" />}

              {isPending ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddUserButton;
