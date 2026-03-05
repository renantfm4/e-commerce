import React from "react";
import CheckoutPayClient from "@/components/Checkout/CheckoutPayClient";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pagamento | NextCommerce",
  description: "Pagamento (fake)",
};

export default function CheckoutPayPage() {
  return (
    <main>
      <CheckoutPayClient />
    </main>
  );
}