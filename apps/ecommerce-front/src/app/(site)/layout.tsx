import HeaderServer from "@/components/Header/header-server";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderServer />
      {children}
      <Footer />
    </>
  );
}