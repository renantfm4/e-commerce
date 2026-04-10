import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

type CheckoutItem = {
  title: string;
  quantity: number;
  unitPrice: number;
};

type Body = {
  orderId: string;
  emailCustomer: string;
  total: number;
  shippingCost: number;
  items: CheckoutItem[];
};

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const body = (await req.json()) as Body;
    const { orderId, emailCustomer, total, shippingCost, items } = body ?? ({} as Body);

    if (!orderId || !emailCustomer || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
    }

    // 1) Limpa carrinho no DB
    await prisma.cart.deleteMany({
      where: { userId: user.id },
    });

    // 2) Email fake (log no terminal do servidor)
    const to = "renantfm0@gmail.com";
    const subject = `[FAKE] Pagamento confirmado - Pedido ${orderId}`;

    const itemsText = items
      .map((i) => {
        const lineTotal = i.unitPrice * i.quantity;
        return `- ${i.title} ${i.quantity > 1 ? `x${i.quantity}` : ""} | R$ ${lineTotal
          .toFixed(2)
          .replace(".", ",")}`;
      })
      .join("\n");

    const message = [
      `Pagamento confirmado (FAKE)`,
      ``,
      `Pedido: ${orderId}`,
      `Cliente (digitado no pay): ${emailCustomer}`,
      `Usuário logado: ${user.email}`,
      ``,
      `Itens:`,
      itemsText,
      ``,
      `Frete: R$ ${Number(shippingCost).toFixed(2).replace(".", ",")}`,
      `Total: R$ ${Number(total).toFixed(2).replace(".", ",")}`,
      ``,
      `Destinatário (fixo): ${to}`,
    ].join("\n");

    console.log("\n=========== FAKE EMAIL ===========\n");
    console.log("TO:", to);
    console.log("SUBJECT:", subject);
    console.log(message);
    console.log("\n=================================\n");

    return NextResponse.json({ message: "Checkout finalizado com sucesso (fake)." }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erro ao finalizar checkout." },
      { status: 500 }
    );
  }
}