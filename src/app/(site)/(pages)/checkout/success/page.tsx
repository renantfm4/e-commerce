import React from "react";
import CheckoutSuccessClient from "@/components/Checkout/CheckoutSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sucesso | NextCommerce",
  description: "Pagamento aprovado (fake)",
};

export default function SuccessPage() {
  return (
    <main>
      <CheckoutSuccessClient />
    </main>
  );
}