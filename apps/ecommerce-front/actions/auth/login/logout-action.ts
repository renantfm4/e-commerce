"use server";

import { cookies } from "next/headers";

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export async function logoutAction(): Promise<LogoutResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_user");

    return { success: true, message: "Logout feito com sucesso." };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro ao sair.",
    };
  }
}