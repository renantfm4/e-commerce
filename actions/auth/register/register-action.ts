export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
};

export async function registerAction(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  try {
    const { name, email, password } = payload ?? {};

    if (!name || !email || !password) {
      return { success: false, message: "Nome, e-mail ou senha ausente." };
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return {
        success: false,
        message: data?.error || data?.message || "Erro ao cadastrar.",
      };
    }

    return {
      success: true,
      message: data?.message || "Conta criada com sucesso.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro inesperado ao cadastrar.",
    };
  }
}