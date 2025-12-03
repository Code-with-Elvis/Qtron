"use client";

import { userRegisterSchema } from "@/lib/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { Loader } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = (data: z.infer<typeof userRegisterSchema>) => {
    console.log(data);
  };

  const isPending = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
      <Card className="rounded-sm shadow-none">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Welcome back! Please enter your details to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex-col gap-4 ">
          <Button
            type="submit"
            size={"lg"}
            aria-label="Sign In"
            disabled={isPending}
            className="w-full"
          >
            {isPending && <Loader className="size-5 animate-spin" />}
            {isPending ? "Validating..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-muted-foreground font-anek-telugu dark:text-neutral-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className=" dark:text-neutral-200 hover:underline font-semibold transition-all duration-100 ease-in-out"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
export default LoginForm;
