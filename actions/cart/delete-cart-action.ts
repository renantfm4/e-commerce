"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function clearCartAction() {
  const user = await getCurrentUser();
  if (!user) return { success: true };

  await prisma.cart.deleteMany({
    where: { userId: user.id },
  });

  return { success: true };
}