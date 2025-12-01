import Footer from "@/components/footer/Footer";
import HeaderBottom from "@/components/header-bottom/HeaderBottom";
import Header from "@/components/header/Header";
import SearchForm3 from "@/components/header/SearchForm3";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SearchForm3 />
      <HeaderBottom />
      <main className="min-h-[calc(100vh-96px)]">{children}</main>
      <Footer />
    </>
  );
}
