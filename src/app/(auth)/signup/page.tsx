import Logo from "@/assets/Logo";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="py-10">
      <div className="qtron-container">
        <Link
          href="/"
          className="h-11 w-fit mx-auto mb-2 border-transparent hover:border-border border px-1.5 rounded flex items-center gap-1 text-xl font-semibold transition-all duration-100 ease-in-out"
        >
          <Logo className="size-8 text-primary" />
          <span>Qtron</span>
        </Link>
        <RegisterForm />
        <footer className="text-center text-sm leading-relaxed text-muted-foreground mt-8 max-w-[400px] mx-auto">
          By continuing, you agree to Qtron&#39;{" "}
          <Link href="/terms" className="underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            privacy policy.
          </Link>
        </footer>
      </div>
    </section>
  );
};
export default SignUp;
