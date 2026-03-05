export type CompleteCheckoutItem = {
  title: string;
  quantity: number;
  unitPrice: number;
};

export type CompleteCheckoutPayload = {
  orderId: string;
  emailCustomer: string;
  total: number;
  shippingCost: number;
  items: CompleteCheckoutItem[];
};

export type CompleteCheckoutResponse = {
  success: boolean;
  message: string;
};

export async function completeCheckoutAction(
  payload: CompleteCheckoutPayload
): Promise<CompleteCheckoutResponse> {
  try {
    const { orderId, emailCustomer, total, shippingCost, items } = payload ?? ({} as any);

    if (!orderId || !emailCustomer || !Array.isArray(items) || items.length === 0) {
      return { success: false, message: "Payload inválido." };
    }

    const res = await fetch("/api/checkout/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, emailCustomer, total, shippingCost, items }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.error || data?.message || "Erro ao finalizar checkout.",
      };
    }

    return {
      success: true,
      message: data?.message || "Checkout finalizado.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro inesperado ao finalizar checkout.",
    };
  }
}