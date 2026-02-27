'use server';

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
};

export async function loginAction(
  payload: LoginPayload
): Promise<LoginResponse> {
  try {
    const { email, password } = payload ?? {};

    if (!email || !password) {
      return { success: false, message: "E-mail ou senha ausente." };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Usuário não encontrado." };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, message: "Senha inválida." };
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "auth_user",
      value: JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "Login realizado com sucesso." };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro inesperado ao entrar.",
    };
  }
}