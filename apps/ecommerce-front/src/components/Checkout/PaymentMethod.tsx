import React from "react";
import Image from "next/image";

type Payment = "bank" | "cash" | "paypal" | "test";

type Props = {
  value: Payment;
  onChange: (v: Payment) => void;
};

const PaymentMethod = ({ value, onChange }: Props) => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Payment Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-3">

          {/* BANK */}
          <label className="flex cursor-pointer select-none items-center gap-4">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={value === "bank"}
              onChange={() => onChange("bank")}
              className="sr-only"
            />
            <div className={`flex h-4 w-4 rounded-full ${value === "bank" ? "border-4 border-primary" : "border border-gray-4"}`} />
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none
              ${value === "bank" ? "border-transparent bg-gray-2" : "border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/bank.svg" alt="bank" width={29} height={12} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Direct bank transfer</p>
                </div>
              </div>
            </div>
          </label>

          {/* CASH */}
          <label className="flex cursor-pointer select-none items-center gap-4">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={value === "cash"}
              onChange={() => onChange("cash")}
              className="sr-only"
            />
            <div className={`flex h-4 w-4 rounded-full ${value === "cash" ? "border-4 border-primary" : "border border-gray-4"}`} />
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none
              ${value === "cash" ? "border-transparent bg-gray-2" : "border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/cash.svg" alt="cash" width={21} height={21} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Cash on delivery</p>
                </div>
              </div>
            </div>
          </label>

          {/* PAYPAL (visual placeholder) */}
          <label className="flex cursor-pointer select-none items-center gap-4">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={value === "paypal"}
              onChange={() => onChange("paypal")}
              className="sr-only"
            />
            <div className={`flex h-4 w-4 rounded-full ${value === "paypal" ? "border-4 border-primary" : "border border-gray-4"}`} />
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none
              ${value === "paypal" ? "border-transparent bg-gray-2" : "border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/paypal.svg" alt="paypal" width={75} height={20} />
                </div>
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Paypal</p>
                </div>
              </div>
            </div>
          </label>

          {/* TEST (FAKE) */}
          <label className="flex cursor-pointer select-none items-center gap-4">
            <input
              type="radio"
              name="payment"
              value="test"
              checked={value === "test"}
              onChange={() => onChange("test")}
              className="sr-only"
            />
            <div className={`flex h-4 w-4 rounded-full ${value === "test" ? "border-4 border-primary" : "border border-gray-4"}`} />
            <div className={`rounded-md border-[0.5px] py-3.5 px-5 min-w-[240px] ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none
              ${value === "test" ? "border-transparent bg-gray-2" : "border-gray-4 shadow-1"}`}>
              <div className="flex items-center">
                <div className="border-l border-gray-4 pl-2.5">
                  <p>Pagamento Teste (mock)</p>
                  <p className="text-custom-xs text-dark-5">Apenas para desenvolvimento</p>
                </div>
              </div>
            </div>
          </label>

        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;