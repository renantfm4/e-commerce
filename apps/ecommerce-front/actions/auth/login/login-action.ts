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
    console.log(`DEBUG LOGIN: Iniciando tentativa para e-mail: ${email}`);

    if (!email || !password) {
      console.log("DEBUG LOGIN: Falha - E-mail ou senha não fornecidos.");
      return { success: false, message: "E-mail ou senha ausente." };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`DEBUG LOGIN: Falha - Usuário ${email} não encontrado no banco.`);
      return { success: false, message: "Usuário não encontrado." };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log(`DEBUG LOGIN: Falha - Senha incorreta para o usuário: ${email}`);
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

    console.log(`DEBUG LOGIN: Sucesso! Cookie 'auth_user' gerado para: ${email}`);
    return { success: true, message: "Login realizado com sucesso." };

  } catch (err: any) {
    console.error("DEBUG LOGIN: Erro crítico na action ->", err);
    return {
      success: false,
      message: err?.message || "Erro inesperado ao entrar.",
    };
  }
}