import Link from "next/link";

const SignedOutBtn = () => {
  return (
    <Link
      href="/"
      className="cursor-pointer h-12.5 shrink-0 px-1.5 border-transparent hover:border-border border rounded hidden md:flex items-center gap-1 transition-all duration-100 ease-in-out"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-muted-foreground leading-none">
          Hello, sign in
        </span>
        <span className="font-semibold leading-none">Account & Orders</span>
      </div>
    </Link>
  );
};
export default SignedOutBtn;
