import "./css/euclid-circular-a-font.css";
import "./css/style.css";

import SiteProviders from "./(site)/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}