// Altere para ler o seu cookie manual em vez do NextAuth
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth_user");

  console.log("DEBUG: Cookie bruto ->", authCookie?.value);

  if (!authCookie) {
    console.log("DEBUG: Usuário não logado (Cookie auth_user ausente)");
    return null;
  }

  try {
    const userData = JSON.parse(authCookie.value);
    
    // Opcional: Validar no banco se o ID do cookie ainda é válido
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      select: { id: true, name: true, email: true },
    });

    console.log("DEBUG: Usuário recuperado do cookie ->", user?.email);
    return user;
  } catch (error) {
    console.log("DEBUG: Erro ao ler cookie ->", error);
    return null;
  }
}