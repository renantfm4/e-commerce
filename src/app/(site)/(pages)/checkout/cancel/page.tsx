import CheckoutCancelClient from "@/components/Checkout/CheckoutCancel";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancelado | NextCommerce",
  description: "Pagamento cancelado",
};

export default function CancelPage() {
  return (
    <main>
      <CheckoutCancelClient />
    </main>
  );
}