import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Informe seu nome."),
    email: z.string().min(1, "Informe o e-mail.").email("E-mail inválido."),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha.")
      .min(6, "A confirmação precisa ter no mínimo 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;