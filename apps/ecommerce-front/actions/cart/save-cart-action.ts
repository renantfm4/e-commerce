"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { CartItem } from "@/types/cart";

export type SaveCartResponse = {
  success: boolean;
  message?: string;
};

export async function saveCartAction(items: CartItem[]): Promise<SaveCartResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "Usuário não autenticado." };
    }

    await prisma.cart.upsert({
      where: { userId: user.id },
      update: { items },
      create: { userId: user.id, items },
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro ao salvar carrinho.",
    };
  }
}