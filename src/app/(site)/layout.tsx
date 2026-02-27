import HeaderServer from "@/components/Header/header-server";
import Footer from "@/components/Footer";
import SiteProviders from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <SiteProviders>
          <HeaderServer />
          {children}
          <Footer />
        </SiteProviders>
      </body>
    </html>
  );
}