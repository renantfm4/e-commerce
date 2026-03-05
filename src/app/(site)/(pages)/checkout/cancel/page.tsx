"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams();

  const reason = searchParams.get("reason");

  return (
    <div style={{ padding: 40 }}>
      <h1>Checkout cancelado</h1>

      <p>
        Motivo: <strong>{reason || "desconhecido"}</strong>
      </p>

      <a href="/checkout">Voltar</a>
    </div>
  );
}