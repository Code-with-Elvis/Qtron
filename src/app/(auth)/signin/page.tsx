import Logo from "@/assets/Logo";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

const SignIn = () => {
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
        <LoginForm />
      </div>
    </section>
  );
};
export default SignIn;
