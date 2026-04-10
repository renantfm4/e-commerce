"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Breadcrumb from "../Common/Breadcrumb";
import { useCheckoutFlow } from "@/app/context/CheckoutFlowContext";
import { completeCheckoutAction } from "../../../actions/checkout/complete-checkout-action";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

export default function CheckoutPayClient() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { draft, hydrated, setLastOrder } = useCheckoutFlow();

  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!draft && !processing) router.replace("/checkout");
  }, [hydrated, draft, processing, router]);

  const formattedCard = useMemo(() => {
    const d = onlyDigits(cardNumber).slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ");
  }, [cardNumber]);

  const total = draft?.total ?? 0;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!draft) return;

    // validações fake
    const digits = onlyDigits(cardNumber);
    if (!email.includes("@")) return setError("E-mail inválido.");
    if (!name.trim()) return setError("Nome no cartão é obrigatório.");
    if (digits.length < 13) return setError("Número do cartão inválido.");
    if (onlyDigits(exp).length < 4) return setError("Validade inválida (MM/AA).");
    if (onlyDigits(cvc).length < 3) return setError("CVC inválido.");

    setProcessing(true);

    // simula processando
    await new Promise((r) => setTimeout(r, 900));

    const orderId = `ORD-${Date.now()}`;

    setLastOrder({
      ...draft,
      email,
      orderId,
      status: "paid",
      paidAt: new Date().toISOString(),
    });

    const result = await completeCheckoutAction({
      orderId,
      emailCustomer: email,
      total: draft.total,
      shippingCost: draft.shippingCost,
      items: draft.items.map((i) => ({
        title: i.title,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    });

    if (!result.success) {
      setError(result.message);
      setProcessing(false);
      return;
    }

    dispatch(removeAllItemsFromCart());

    router.push("/checkout/success");
  }

  if (!hydrated) {
    return (
      <>
        <Breadcrumb title={"Pagamento"} pages={["checkout", "pay"]} />
        <section className="py-20 bg-gray-2">
          <div className="max-w-[1170px] mx-auto px-4">Carregando...</div>
        </section>
      </>
    );
  }

  if (!draft) return null;

  return (
    <>
      <Breadcrumb title={"Pagamento"} pages={["checkout", "pay"]} />

      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* esquerda: resumo */}
            <div className="lg:max-w-[670px] w-full">
              <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark">Resumo do Pedido</h3>
                </div>

                <div className="p-4 sm:p-8.5 space-y-4">
                  <div className="space-y-2">
                    {draft.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-dark">
                          {it.title} {it.quantity > 1 ? `× ${it.quantity}` : ""}
                        </span>
                        <span className="text-dark">
                          R$ {(it.unitPrice * it.quantity).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-3 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-dark">Subtotal</span>
                      <span className="text-dark">
                        R$ {draft.subtotal.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-dark">Frete</span>
                      <span className="text-dark">
                        R$ {draft.shippingCost.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span className="font-medium text-lg text-dark">Total</span>
                      <span className="font-medium text-lg text-dark">
                        R$ {total.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* direita: cartão */}
            <div className="max-w-[455px] w-full">
              <form onSubmit={handlePay} className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                <h3 className="font-medium text-xl text-dark">Dados do Cartão (FAKE)</h3>

                {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block mb-2 text-sm text-dark">E-mail</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-gray-3 bg-gray-1 p-3 outline-none"
                      placeholder="seuemail@exemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-dark">Nome no cartão</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-gray-3 bg-gray-1 p-3 outline-none"
                      placeholder="Como está no cartão"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-dark">Número do cartão</label>
                    <input
                      value={formattedCard}
                      onChange={(e) => setCardNumber(e.target.value)}
                      inputMode="numeric"
                      className="w-full rounded-md border border-gray-3 bg-gray-1 p-3 outline-none"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="w-1/2">
                      <label className="block mb-2 text-sm text-dark">Validade (MM/AA)</label>
                      <input
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                        inputMode="numeric"
                        className="w-full rounded-md border border-gray-3 bg-gray-1 p-3 outline-none"
                        placeholder="12/34"
                      />
                    </div>

                    <div className="w-1/2">
                      <label className="block mb-2 text-sm text-dark">CVC</label>
                      <input
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        inputMode="numeric"
                        className="w-full rounded-md border border-gray-3 bg-gray-1 p-3 outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark disabled:opacity-60"
                  >
                    {processing
                      ? "Processando..."
                      : `Pagar R$ ${total.toFixed(2).replace(".", ",")}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/checkout")}
                    className="w-full flex justify-center font-medium text-dark bg-gray-2 py-3 px-6 rounded-md"
                  >
                    Voltar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}