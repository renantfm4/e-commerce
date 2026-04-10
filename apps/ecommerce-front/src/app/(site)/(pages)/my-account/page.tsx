import MyAccount from "@/components/MyAccount";
import React from "react";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Minha Conta`,
  description: `Essa é a página da minha conta para o template ${shopName}`,
  // other metadata
};

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
