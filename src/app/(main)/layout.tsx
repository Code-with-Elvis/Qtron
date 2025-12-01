import HeaderBottom from "@/components/header-bottom/HeaderBottom";
import Header from "@/components/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <HeaderBottom />
      {children}
    </>
  );
}
