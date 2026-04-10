"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";

import { loginSchema, type LoginFormData } from "../../../schemas/loginSchema";
import { loginAction } from "../../../../actions/auth/login/login-action";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface SigninModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSignup?: () => void;
}

export default function SigninModal({
  open,
  onOpenChange,
  onOpenSignup,
}: SigninModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const handleOpenSignup = () => {
    handleClose();
    onOpenSignup?.();
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const toastId = toast.loading("Entrando...");

    try {
      const response = await loginAction({
        email: data.email,
        password: data.password,
      });

      if (!response?.success) {
        toast.update(toastId, {
          render: response?.message || "Erro ao entrar.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      toast.update(toastId, {
        render: "Login feito com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      handleClose();
      router.refresh();
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.message || "Erro ao entrar.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeButtonVariant="white"
        className="
          max-w-md sm:max-w-lg
          w-[calc(100vw-2rem)]
          max-h-[calc(100vh-2rem)]
          p-0
          bg-white
          border-0
          shadow-2xl
          overflow-hidden
          flex flex-col
          rounded-2xl
          animate-in fade-in-0 zoom-in-95 duration-300
        "
      >
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-t-2xl">
          <div className="flex items-center gap-3 pr-12">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <LogIn className="w-6 h-6 text-white" />
            </div>

            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Entrar na sua conta
              </DialogTitle>

              <DialogDescription className="text-white/80 mt-1 text-sm">
                Digite seus dados para acessar sua conta
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-dark">
                E-mail
              </label>

              <input
                type="email"
                className="rounded-xl border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none transition focus:border-primary"
                {...register("email", {
                  onBlur: () => trigger("email"),
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-dark">
                Senha
              </label>

              <input
                type="password"
                className="rounded-xl border border-gray-3 bg-gray-1 w-full py-3 px-5 outline-none transition focus:border-primary"
                {...register("password", {
                  onBlur: () => trigger("password"),
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center font-medium text-white bg-dark py-3.5 px-6 rounded-xl ease-out duration-200 hover:bg-primary mt-7 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Entrando..." : "Entrar na conta"}
            </button>
          </form>

          <span className="relative z-1 block font-medium text-center mt-6">
            <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
            <span className="inline-block px-3 bg-white">Ou</span>
          </span>

          <button
            type="button"
            className="flex justify-center items-center gap-3.5 rounded-xl border border-gray-3 bg-gray-1 p-3 mt-5 ease-out duration-200 hover:bg-gray-2 w-full"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_98_7461)">
                <path
                  d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                  fill="#34A853"
                />
                <path
                  d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_98_7461">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Entrar com Google
          </button>

          <button
            type="button"
            className="flex justify-center items-center gap-3.5 rounded-xl border border-gray-3 bg-gray-1 p-3 mt-3 ease-out duration-200 hover:bg-gray-2 w-full"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9997 1.83331C5.93773 1.83331 1.83301 6.04119 1.83301 11.232C1.83301 15.3847 4.45954 18.9077 8.10178 20.1505C8.55988 20.2375 8.72811 19.9466 8.72811 19.6983C8.72811 19.4743 8.71956 18.7338 8.71567 17.9485C6.16541 18.517 5.6273 16.8395 5.6273 16.8395C5.21032 15.7532 4.60951 15.4644 4.60951 15.4644C3.77785 14.8811 4.6722 14.893 4.6722 14.893C5.59272 14.9593 6.07742 15.8615 6.07742 15.8615C6.89499 17.2984 8.22184 16.883 8.74493 16.6429C8.82718 16.0353 9.06478 15.6208 9.32694 15.3861C7.2909 15.1484 5.15051 14.3425 5.15051 10.7412C5.15051 9.71509 5.5086 8.87661 6.09503 8.21844C5.99984 7.98167 5.68611 7.02577 6.18382 5.73115C6.18382 5.73115 6.95358 5.47855 8.70532 6.69458C9.43648 6.48627 10.2207 6.3819 10.9997 6.37836C11.7787 6.3819 12.5635 6.48627 13.2961 6.69458C15.0457 5.47855 15.8145 5.73115 15.8145 5.73115C16.3134 7.02577 15.9995 7.98167 15.9043 8.21844C16.4921 8.87661 16.8477 9.715 16.8477 10.7412C16.8477 14.351 14.7033 15.146 12.662 15.3786C12.9909 15.6702 13.2838 16.2423 13.2838 17.1191C13.2838 18.3766 13.2732 19.3888 13.2732 19.6983C13.2732 19.9485 13.4382 20.2415 13.9028 20.1492C17.5431 18.905 20.1663 15.3833 20.1663 11.232C20.1663 6.04119 16.0621 1.83331 10.9997 1.83331Z"
                fill="#15171A"
              />
            </svg>
            Entrar com GitHub
          </button>

          <p className="text-center mt-6 text-sm text-dark-5">
            Não tem uma conta?
            <button
              type="button"
              onClick={handleOpenSignup}
              className="text-dark hover:text-primary pl-2 font-medium"
            >
              Cadastre-se agora!
            </button>
          </p>
        </div>

        <div className="px-6 py-5 border-t border-gray-200 flex justify-end bg-white">
          <button
            onClick={handleClose}
            className="
              px-6 py-3
              bg-gray-200
              text-gray-800
              rounded-xl font-medium
              hover:bg-gray-300
              transition-colors
            "
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
