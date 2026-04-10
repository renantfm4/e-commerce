import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ items: [] }, { status: 200 });

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json({ items: cart?.items ?? [] });
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items = [] } = await req.json();

  const cart = await prisma.cart.upsert({
    where: { userId: user.id },
    update: { items },
    create: { userId: user.id, items },
  });

  return NextResponse.json({ items: cart.items });
}