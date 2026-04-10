import Contact from "@/components/Contact";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Contato`,
  description: `Essa é a página de contato para o template ${shopName}`,
  // other metadata
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
