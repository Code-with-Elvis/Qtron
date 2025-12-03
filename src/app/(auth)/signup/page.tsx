import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const Signup = () => {
  return (
    <section className="py-10">
      <div className="qtron-container">
        <RegisterForm />
        <footer className="text-center text-sm leading-relaxed text-muted-foreground mt-8 max-w-[400px] mx-auto">
          By continuing, you agree to Qtron&#39;{" "}
          <Link href="/terms-conditions" className="underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline">
            privacy policy.
          </Link>
        </footer>
      </div>
    </section>
  );
};
export default Signup;
