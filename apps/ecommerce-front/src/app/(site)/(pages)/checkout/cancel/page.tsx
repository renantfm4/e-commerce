import CheckoutCancelClient from "@/components/Checkout/CheckoutCancel";
import { Metadata } from "next";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

export const metadata: Metadata = {
  title: `${shopName} | Cancelado`,
  description: `Pagamento cancelado para o template ${shopName}`,
};

export default function CancelPage() {
  return (
    <main>
      <CheckoutCancelClient />
    </main>
  );
}