"use client";

import { userLoginSchema } from "@/lib/validationSchemas";
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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const LoginForm = () => {
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
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (data: z.infer<typeof userLoginSchema>) => {
    try {
      setIsPending(true);
      setErrorMessage(""); // Clear previous errors

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(t("invalidCredentials"));
      } else if (result?.ok) {
        const lang = searchParams.get("lang");
        const redirectUrl = lang ? `/?lang=${lang}` : "/";
        router.push(redirectUrl);
        router.refresh();
        toast.success(t("loggedInSuccess"));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(t("somethingWentWrong"));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
      <Card className="rounded-sm shadow-none">
        <CardHeader className="gap-1">
          <CardTitle className="text-xl">{t("login")}</CardTitle>
          <CardDescription>
            {t("welcomeBack")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {errorMessage}
            </div>
          )}
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
            {isPending ? t("validating") : tCommon("signIn")}
          </Button>
          <p className="text-center text-sm text-muted-foreground font-anek-telugu dark:text-neutral-300">
            {t("dontHaveAccount")}{" "}
            <Link
              href="/signup"
              className="dark:text-neutral-200 hover:underline font-semibold transition-all duration-100 ease-in-out"
            >
              {t("signUp")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
export default LoginForm;
