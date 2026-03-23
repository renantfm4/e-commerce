import React from "react";
import CheckoutPayClient from "@/components/Checkout/CheckoutPayClient";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Pagamento`,
  description: `Página de pagamento para ${shopName}`,
};

export default function CheckoutPayPage() {
  return (
    <main>
      <CheckoutPayClient />
    </main>
  );
}