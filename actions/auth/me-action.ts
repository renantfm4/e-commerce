"use server";

import { cookies } from "next/headers";

export type MeResponse =
  | { success: true; data: { id: string; email: string; name?: string | null } }
  | { success: false; message: string };

export async function meAction(): Promise<MeResponse> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("auth_user");

    if (!cookie?.value) {
      return { success: false, message: "Não autenticado." };
    }

    const user = JSON.parse(cookie.value);

    return { success: true, data: user };
  } catch (err: any) {
    return { success: false, message: err?.message || "Cookie inválido." };
  }
}