"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import { useCheckoutFlow } from "@/app/context/CheckoutFlowContext";
import { FiCheckCircle } from "react-icons/fi";

export default function CheckoutSuccessClient() {
  const router = useRouter();
  const { lastOrder, hydrated, clearLastOrder, clearDraft } = useCheckoutFlow();

  useEffect(() => {
    if (hydrated && !lastOrder) router.replace("/checkout");
  }, [hydrated, lastOrder, router]);

  useEffect(() => {
    if (hydrated && lastOrder) clearDraft();
  }, [hydrated, lastOrder, clearDraft]);

  if (!hydrated) return null;
  if (!lastOrder) return null;

  const totalFmt = `R$ ${lastOrder.total.toFixed(2).replace(".", ",")}`;

  return (
    <>
      <Breadcrumb title={"Pagamento Confirmado"} pages={["checkout", "success"]} />

      <section className="py-20 bg-gray-2 relative overflow-hidden">
        {/* fundo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative max-w-[980px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white shadow-1 rounded-[14px] p-6 sm:p-10 border border-gray-3">
            {/* Header / Icon */}
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <FiCheckCircle className="text-primary" size={46} />
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-dark">
                Pagamento aprovado!
              </h1>

              <p className="mt-2 text-dark-5 max-w-[560px]">
                Seu pedido foi confirmado e já está sendo preparado. Você receberá uma confirmação
                (fake) por e-mail.
              </p>

              {/* Badges */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="rounded-full border border-gray-3 bg-gray-1 px-4 py-2 text-sm">
                  <span className="text-dark-5">Pedido:</span>{" "}
                  <span className="font-mono text-dark">{lastOrder.orderId}</span>
                </div>

                <div className="rounded-full border border-gray-3 bg-gray-1 px-4 py-2 text-sm">
                  <span className="text-dark-5">E-mail:</span>{" "}
                  <span className="font-mono text-dark">{lastOrder.email ?? "-"}</span>
                </div>

                <div className="rounded-full border border-gray-3 bg-gray-1 px-4 py-2 text-sm">
                  <span className="text-dark-5">Total:</span>{" "}
                  <span className="font-semibold text-dark">{totalFmt}</span>
                </div>
              </div>
            </div>

            {/* Content grid */}
 {/* Content grid */}
<div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
  {/* Itens */}
  <div className="lg:col-span-7 flex flex-col">
    <div className="rounded-[12px] border border-gray-3 bg-white flex-1 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-3 flex items-center justify-between">
        <p className="font-medium text-dark">Itens do pedido</p>
        <p className="text-sm text-dark-5">{lastOrder.items.length} item(ns)</p>
      </div>

      <div className="p-5 flex-1">
        <div className="space-y-3">
          {lastOrder.items.map((it, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 rounded-[10px] bg-gray-1/60 border border-gray-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-dark font-medium truncate">{it.title}</p>
                <p className="text-sm text-dark-5">
                  Quantidade: <span className="text-dark">{it.quantity}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-dark font-medium">
                  R$ {(it.unitPrice * it.quantity).toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs text-dark-5">
                  Unidade: R$ {it.unitPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Resumo */}
  <div className="lg:col-span-5 flex flex-col">
    <div className="rounded-[12px] border border-gray-3 bg-white flex-1 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-3">
        <p className="font-medium text-dark">Resumo</p>
      </div>

      <div className="p-5 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-dark-5">Status</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
            <FiCheckCircle />
            Pago
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-dark-5">Pagamento</p>
          <p className="text-dark font-medium">{lastOrder.paymentMethod ?? "cartão"}</p>
        </div>

        <div className="h-px bg-gray-3 my-2" />

        <div className="flex items-center justify-between">
          <p className="text-dark font-medium">Total</p>
          <p className="text-dark font-semibold text-lg">
            R$ {lastOrder.total.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-dark-5">
            * Este é um checkout de teste. Nenhum dado real de cartão foi armazenado.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Botões (embaixo das duas caixas, largura total do grid) */}
  <div className="lg:col-span-12">
    <div className="mt-2 flex flex-col sm:flex-row gap-4 w-full">
      <a
        href="/"
        className="w-full sm:flex-1 inline-flex justify-center items-center font-medium text-white bg-primary py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark"
      >
        Voltar para Home
      </a>

      <button
        type="button"
        onClick={() => {
          clearLastOrder();
          router.push("/shop-with-sidebar");
        }}
        className="w-full sm:flex-1 inline-flex justify-center items-center font-medium text-dark bg-gray-1 border border-gray-3 py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-gray-2"
      >
        Nova compra
      </button>
    </div>
  </div>
</div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-3 text-center text-sm text-dark-5">
              Obrigado pela compra — seu pedido já está em andamento.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}