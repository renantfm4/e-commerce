import React from "react";
import CheckoutSuccessClient from "@/components/Checkout/CheckoutSuccess";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Sucesso`,
  description: `Pagamento aprovado para ${shopName}`,
};

export default function SuccessPage() {
  return (
    <main>
      <CheckoutSuccessClient />
    </main>
  );
}