"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Breadcrumb from "../Common/Breadcrumb";
import Coupon from "./Coupon";
import Billing from "./Billing";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";

import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";

import { useCheckoutFlow } from "@/app/context/CheckoutFlowContext";

type Shipping = "free" | "fedex" | "dhl";
type Payment = "bank" | "cash" | "paypal" | "test";

const Checkout = () => {
  const router = useRouter();
  const { setDraft, clearLastOrder } = useCheckoutFlow();

  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const subtotal = useAppSelector(selectTotalPrice);

  const [shippingMethod, setShippingMethod] = useState<Shipping>("free");
  const [paymentMethod, setPaymentMethod] = useState<Payment>("test");
  const [notes, setNotes] = useState("");

  const shippingCost = useMemo(() => {
    if (shippingMethod === "free") return 0;
    if (shippingMethod === "fedex") return 10.99;
    return 12.5;
  }, [shippingMethod]);

  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Carrinho vazio");
      return;
    }

    // aqui estamos só suportando o fluxo fake "test"
    if (paymentMethod !== "test") {
      alert(`Método "${paymentMethod}" ainda não implementado. Selecione "Pagamento Teste".`);
      return;
    }

    clearLastOrder();

    // cria o draft do checkout (sem URL)
    setDraft({
      createdAt: new Date().toISOString(),
      notes,
      shippingMethod,
      shippingCost,
      paymentMethod: "test",
      items: cartItems.map((i) => ({
        id: i.id,
        title: i.title,
        quantity: i.quantity,
        unitPrice: i.discountedPrice,
      })),
      subtotal,
      total,
    });

    router.push("/checkout/pay");
  }

  return (
    <>
      <Breadcrumb title={"Finalizar Compra"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              <div className="lg:max-w-[670px] w-full mb-90">
                <Billing />

                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <label htmlFor="notes" className="block mb-2.5">
                    Outras Observações (opcional)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Observações sobre o seu pedido, ex.: instruções especiais para entrega."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Seu Pedido</h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <h4 className="font-medium text-dark">Produto</h4>
                      <h4 className="font-medium text-dark text-right">Subtotal</h4>
                    </div>

                    {cartItems.length > 0 ? (
                      cartItems.map((item, key) => (
                        <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
                          <p className="text-dark">
                            {item.title}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </p>
                          <p className="text-dark text-right">
                            R$ {(item.discountedPrice * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-5 text-center text-gray-500">Nenhum produto no carrinho</div>
                    )}

                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <p className="text-dark">Frete</p>
                      <p className="text-dark text-right">
                        R$ {shippingCost.toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5">
                      <p className="font-medium text-lg text-dark">Total</p>
                      <p className="font-medium text-lg text-dark text-right">
                        R$ {total.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <Coupon /> */}
                <ShippingMethod value={shippingMethod} onChange={setShippingMethod} />
                <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
                  disabled={cartItems.length === 0}
                >
                  Ir para Pagamento
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;