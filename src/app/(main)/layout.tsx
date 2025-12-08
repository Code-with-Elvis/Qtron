import Footer from "@/components/footer/Footer";
import HeaderBottom from "@/components/header-bottom/HeaderBottom";
import Header from "@/components/header/Header";
import SearchForm3 from "@/components/header/SearchForm3";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <>
            <div className="qtron-container pb-1.5">
              <div className="h-10 rounded border" />
            </div>
          </>
        }
      >
        <SearchForm3 />
      </Suspense>
      <HeaderBottom />
      <main className="min-h-[calc(100vh-96px)]">{children}</main>
      <Footer />
    </>
  );
}
