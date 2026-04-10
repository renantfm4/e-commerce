"use client";

import { useState, useEffect } from "react";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import { ProductDetailsProvider } from "../context/ProductsDetailsContext";
import { CategoryFilterProvider } from "../context/CategoryFilterContext";
import { CheckoutFlowProvider } from "../context/CheckoutFlowContext";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SiteProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />

      <ReduxProvider>
        <ProductDetailsProvider>
          <CheckoutFlowProvider>
            <CategoryFilterProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    {loading ? <PreLoader /> : children}
                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </CategoryFilterProvider>
          </CheckoutFlowProvider>
        </ProductDetailsProvider>
      </ReduxProvider>

      <ScrollToTop />
    </>
  );
}
