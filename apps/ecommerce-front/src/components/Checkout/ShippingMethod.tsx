import React from "react";
import Image from "next/image";

type Props = {
  value: "free" | "fedex" | "dhl";
  onChange: (v: "free" | "fedex" | "dhl") => void;
};

const ShippingMethod = ({ value, onChange }: Props) => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Shipping Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-4">
          {/* FREE */}
          <label className="flex cursor-pointer select-none items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              value="free"
              checked={value === "free"}
              onChange={() => onChange("free")}
              className="sr-only"
            />
            <div
              className={`flex h-4 w-4 rounded-full ${
                value === "free" ? "border-4 border-primary" : "border border-gray-4"
              }`}
            />
            Free Shipping
          </label>

          {/* FEDEX */}
          <label className="flex cursor-pointer select-none items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              value="fedex"
              checked={value === "fedex"}
              onChange={() => onChange("fedex")}
              className="sr-only"
            />
            <div
              className={`flex h-4 w-4 rounded-full ${
                value === "fedex" ? "border-4 border-primary" : "border border-gray-4"
              }`}
            />

            <div className="rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image src="/images/checkout/fedex.svg" alt="fedex" width={64} height={18} />
                </div>

                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">R$ 10,99</p>
                  <p className="text-custom-xs">Standard Shipping</p>
                </div>
              </div>
            </div>
          </label>

          {/* DHL */}
          <label className="flex cursor-pointer select-none items-center gap-3.5">
            <input
              type="radio"
              name="shipping"
              value="dhl"
              checked={value === "dhl"}
              onChange={() => onChange("dhl")}
              className="sr-only"
            />
            <div
              className={`flex h-4 w-4 rounded-full ${
                value === "dhl" ? "border-4 border-primary" : "border border-gray-4"
              }`}
            />

            <div className="rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image src="/images/checkout/dhl.svg" alt="dhl" width={64} height={20} />
                </div>

                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">R$ 12,50</p>
                  <p className="text-custom-xs">Standard Shipping</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;