import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiHome5Line, RiSearchLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";

function NotFound() {
  return (
    <section>
      <div className="qtron-container py-10 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          {/* ---- 404 Visual ---- */}
          <div className="relative mb-8">
            <h1 className="text-[100px] md:text-[150px] font-bold text-primary/10 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* --- Animated Logo --- */}
                <svg
                  className="size-14 md:size-24 text-primary animate-pulse"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M22.962 8.863c-2.628-2.576-4.988-5.407-7.045-8.458l-0.123-0.193c-2.234 3.193-4.556 5.993-7.083 8.592l0.015-0.016c-2.645 2.742-5.496 5.245-8.542 7.499l-0.184 0.13c3.341 2.271 6.262 4.682 8.943 7.335l-0.005-0.005c2.459 2.429 4.71 5.055 6.731 7.858l0.125 0.182c4.324-6.341 9.724-11.606 15.986-15.649l0.219-0.133c-3.401-2.168-6.359-4.524-9.048-7.153l0.010 0.010zM18.761 18.998c-1.036 1.024-1.971 2.145-2.792 3.35l-0.050 0.078c-0.884-1.215-1.8-2.285-2.793-3.279l0 0c-1.090-1.075-2.28-2.055-3.552-2.923l-0.088-0.057c1.326-0.969 2.495-1.988 3.571-3.097l0.007-0.007c1.010-1.051 1.947-2.191 2.794-3.399l0.061-0.092c0.882 1.32 1.842 2.471 2.912 3.51l0.005 0.005c1.089 1.072 2.293 2.034 3.589 2.864l0.088 0.053c-1.412 0.905-2.641 1.891-3.754 2.994l0.002-0.002z" />
                </svg>
                {/* --- Disconnected plug animation --- */}
                <div className="absolute -bottom-2 -right-2">
                  <svg
                    className="size-6 md:size-8 text-destructive animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2v11h3v9l7-12h-4l3-8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* --- Error Message --- */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connection Lost
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Oops! The page you&#39;re looking for is unplugged.
          </p>
          <p className="text-muted-foreground mb-8">
            It seems this product has been discontinued or the URL circuit is
            broken.
          </p>

          {/* ---- Action Buttons ---- */}
          <div className="flex gap-4 max-[400px]:flex-col justify-center items-center mb-12">
            <Button asChild size="lg" className="max-[400px]:w-full">
              <Link href="/" className="flex items-center gap-2">
                <RiHome5Line className="size-5" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="max-[400px]:w-full"
            >
              <Link href="/#search" className="flex items-center gap-2">
                <RiSearchLine className="size-5" />
                Search Products
              </Link>
            </Button>
          </div>

          {/* ---- Quick Links ---- */}
          <div className="border-t border-border pt-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              POPULAR CATEGORIES
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="secondary" size="sm">
                <Link href="/category/mobile-phones-tablets">
                  <BiCategoryAlt className="size-4 mr-1" />
                  Mobile Phones
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/category/computers-laptops">
                  <BiCategoryAlt className="size-4 mr-1" />
                  Laptops
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/category/gaming">
                  <BiCategoryAlt className="size-4 mr-1" />
                  Gaming
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/category/audio-sound">
                  <BiCategoryAlt className="size-4 mr-1" />
                  Audio
                </Link>
              </Button>
            </div>
          </div>

          {/* ---- Error Code ---- */}
          <p className="text-xs text-muted-foreground mt-12">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
