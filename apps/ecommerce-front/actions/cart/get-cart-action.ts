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
    console.log("DEBUG CART: Buscando usuário atual...");
    const user = await getCurrentUser();

    if (!user) {
      console.log("DEBUG CART: Nenhum usuário autenticado encontrado. Retornando carrinho vazio.");
      return { success: true, items: [] };
    }

    console.log(`DEBUG CART: Buscando itens no banco para o userId: ${user.id}`);
    
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      select: { items: true },
    });

    const items = (cart?.items as CartItem[]) ?? [];
    console.log(`DEBUG CART: Busca finalizada. Itens encontrados: ${items.length}`);

    return { success: true, items };

  } catch (err: any) {
    console.error("DEBUG CART: Erro ao buscar carrinho ->", err);
    return {
      success: false,
      items: [],
      message: err?.message || "Erro ao buscar carrinho.",
    };
  }
}