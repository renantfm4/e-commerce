"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";

// Importações do Redux para pegar os itens reais do carrinho
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";

const Checkout = () => {
  // Pega os itens reais do carrinho e o total
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <>
      <Breadcrumb title={"Finalizar Compra"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout esquerda --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- caixa de login --> */}
                <Login />

                {/* <!-- detalhes de faturamento --> */}
                <Billing />

                {/* <!-- caixa de endereço de entrega --> */}
                <Shipping />

                {/* <!-- caixa de observações adicionais --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Outras Observações (opcional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Observações sobre o seu pedido, ex.: instruções especiais para entrega."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* <!-- checkout direita --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- caixa de resumo do pedido --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Seu Pedido
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- título --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Produto</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {cartItems.length > 0 ? (
                      cartItems.map((item, key) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                          <div>
                            <p className="text-dark">
                              {item.title}
                             {item.quantity > 1 && ` × ${item.quantity}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              R$ {(item.discountedPrice * item.quantity).toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-5 text-center text-gray-500">
                        Nenhum produto no carrinho
                      </div>
                    )}

                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">Frete</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">R$ 75,00</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          R$ {totalPrice.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- caixa de cupom --> */}
                <Coupon />

                {/* <!-- métodos de envio --> */}
                <ShippingMethod />

                {/* <!-- métodos de pagamento --> */}
                <PaymentMethod />

                {/* <!-- botão de finalizar compra --> */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
                >
                  Finalizar Compra
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