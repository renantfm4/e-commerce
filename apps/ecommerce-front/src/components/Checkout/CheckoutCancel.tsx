"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import { FiAlertCircle } from "react-icons/fi";

export default function CheckoutCancelClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams.get("reason");

  const reasonLabelMap: Record<string, string> = {
    abandoned: "Pagamento abandonado",
    rejected: "Pagamento recusado",
    expired: "Sessão expirada",
    cancelled: "Pagamento cancelado pelo usuário",
    canceled: "Pagamento cancelado pelo usuário",
  };

  const formattedReason = reason
    ? reasonLabelMap[reason.toLowerCase()] ??
      reason.charAt(0).toUpperCase() + reason.slice(1)
    : "Motivo desconhecido";

  return (
    <>
      <Breadcrumb title={"Pagamento Cancelado"} pages={["checkout", "cancel"]} />

      <section className="py-20 bg-gray-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-[980px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white shadow-1 rounded-[14px] p-6 sm:p-10 border border-gray-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiAlertCircle className="text-red-500" size={46} />
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-dark">
                Pagamento cancelado
              </h1>

              <p className="mt-2 text-dark-5 max-w-[560px]">
                Seu pagamento não foi concluído. Você pode revisar as informações
                e tentar novamente quando quiser.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="rounded-full border border-gray-3 bg-gray-1 px-4 py-2 text-sm">
                  <span className="text-dark-5">Status:</span>{" "}
                  <span className="font-medium text-red-500">Cancelado</span>
                </div>

                <div className="rounded-full border border-gray-3 bg-gray-1 px-4 py-2 text-sm">
                  <span className="text-dark-5">Motivo:</span>{" "}
                  <span className="font-mono text-dark">{formattedReason}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col">
                <div className="rounded-[12px] border border-gray-3 bg-white flex-1 flex flex-col">
                  <div className="px-5 py-4 border-b border-gray-3">
                    <p className="font-medium text-dark">O que aconteceu?</p>
                  </div>

                  <div className="p-5 space-y-4 flex-1">
                    <div className="rounded-[10px] bg-gray-1/60 border border-gray-3 px-4 py-3">
                      <p className="text-dark font-medium">Pagamento interrompido</p>
                      <p className="text-sm text-dark-5 mt-1">
                        O processo de checkout foi cancelado antes da confirmação final.
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-gray-1/60 border border-gray-3 px-4 py-3">
                      <p className="text-dark font-medium">Nenhuma cobrança real</p>
                      <p className="text-sm text-dark-5 mt-1">
                        Como este é um fluxo de teste, nenhum pagamento real foi processado.
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-gray-1/60 border border-gray-3 px-4 py-3">
                      <p className="text-dark font-medium">Você pode tentar novamente</p>
                      <p className="text-sm text-dark-5 mt-1">
                        Basta voltar ao checkout ou retornar para a loja e iniciar uma nova compra.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <div className="rounded-[12px] border border-gray-3 bg-white flex-1 flex flex-col">
                  <div className="px-5 py-4 border-b border-gray-3">
                    <p className="font-medium text-dark">Resumo</p>
                  </div>

                  <div className="p-5 space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-dark-5">Status</p>
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-500 px-3 py-1 text-sm font-medium">
                        <FiAlertCircle />
                        Cancelado
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-dark-5">Motivo</p>
                      <p className="text-dark font-medium text-right">
                        {formattedReason}
                      </p>
                    </div>

                    <div className="h-px bg-gray-3 my-2" />

                    <div>
                      <p className="text-sm text-dark-5">
                        Você pode retornar ao checkout para tentar novamente ou
                        voltar para a loja e continuar comprando.
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-sm text-dark-5">
                        * Este é um checkout de teste. Nenhum dado real foi armazenado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-12">
                <div className="mt-2 flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => router.push("/checkout")}
                    className="w-full sm:flex-1 inline-flex justify-center items-center font-medium text-white bg-primary py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark"
                  >
                    Voltar para o checkout
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/shop-with-sidebar")}
                    className="w-full sm:flex-1 inline-flex justify-center items-center font-medium text-dark bg-gray-1 border border-gray-3 py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-gray-2"
                  >
                    Voltar para a loja
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-3 text-center text-sm text-dark-5">
              Seu checkout foi encerrado sem concluir o pagamento.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}