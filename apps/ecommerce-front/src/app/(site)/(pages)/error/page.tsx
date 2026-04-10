import React from "react";
import Error from "@/components/Error";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Página de Erro`,
  description: `Essa é a página de erro para o template ${shopName}`,
  // other metadata
};

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
