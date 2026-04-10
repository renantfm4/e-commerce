import React from "react";
import MailSuccess from "@/components/MailSuccess";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Sucesso no Envio do E-mail`,
  description: `Esta é a página de sucesso no envio do e-mail para o template ${shopName}`,
  // other metadata
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
