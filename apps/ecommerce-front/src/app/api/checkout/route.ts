import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const items = body?.items as Array<any> | undefined;
    const paymentMethod = body?.paymentMethod as string | undefined;
    const total = body?.total as number | undefined;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }
    if (!paymentMethod) {
      return NextResponse.json({ error: "Método de pagamento ausente" }, { status: 400 });
    }
    if (typeof total !== "number") {
      return NextResponse.json({ error: "Total inválido" }, { status: 400 });
    }

    const orderId = `ORD-${Date.now()}`;

    // Segurança: desabilite em produção
    if (paymentMethod === "test" && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Pagamento teste desabilitado em produção" },
        { status: 403 }
      );
    }

    // ✅ MODO FAKE
    if (paymentMethod === "test") {
      // aqui você poderia salvar no DB se quiser, como "paid"
      return NextResponse.json({
        orderId,
        status: "paid",
        mode: "test",
      });
    }

    // Outros métodos (ainda não implementados)
    return NextResponse.json({
      orderId,
      status: "created",
      mode: "real",
      message: `Método "${paymentMethod}" ainda não implementado.`,
    });
  } catch (e) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}