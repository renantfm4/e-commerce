"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { CartItem } from "@/types/cart";

export type GetCartResponse = {
  success: boolean;
  items: CartItem[];
  message?: string;
};

export async function getCartAction(): Promise<GetCartResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: true, items: [] };

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      select: { items: true },
    });

    return { success: true, items: (cart?.items as CartItem[]) ?? [] };
  } catch (err: any) {
    return {
      success: false,
      items: [],
      message: err?.message || "Erro ao buscar carrinho.",
    };
  }
}