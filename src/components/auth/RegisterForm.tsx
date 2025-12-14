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
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof userRegisterSchema>) => {
    try {
      setIsPending(true);
      const response = await axios.post("/api/auth/signup", data);

      if (response.status === 201) {
        const lang = searchParams.get("lang");
        const redirectUrl = lang ? `/signin?lang=${lang}` : "/signin";
        router.push(redirectUrl);
        toast.success(t("accountCreatedSuccess"));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || t("somethingWentWrong"));
      } else {
        setErrorMessage(t("somethingWentWrong"));
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
      <Card className="rounded-sm shadow-none">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">{t("signUp")}</CardTitle>
          <CardDescription>{t("createAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <p className="text-sm mb-2 p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
              {errorMessage}
            </p>
          )}

          {/* -- Full name -- */}
          <div className="mb-2">
            <Label htmlFor="fullName" className="text-sm ml-1 mb-1">
              {t("fullName")}
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
              {t("email")}
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
              {t("password")}
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
              {t("confirmPassword")}
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
            {isPending ? t("creatingAccount") : t("signUp")}
          </Button>
          <p className="text-center text-sm text-muted-foreground font-anek-telugu dark:text-neutral-300">
            {t("alreadyHaveAccount")}{" "}
            <Link
              href="/signin"
              className=" dark:text-neutral-200 hover:underline font-semibold transition-all duration-100 ease-in-out"
            >
              {tCommon("signIn")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
export default RegisterForm;
