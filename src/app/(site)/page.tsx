import Home from "@/components/Home";
import { Metadata } from "next";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

export const metadata: Metadata = {
  title: `${shopName} | Nextjs E-commerce template`,
  description: `This is the Home page for ${shopName} Template`,
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
