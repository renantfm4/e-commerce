"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import { useProductDetails } from "@/app/context/ProductsDetailsContext";
import { useRouter } from "next/navigation";

import ProductHeader from "./ProductHeader";
import ProductTabs from "./ProductTabs";

const ShopDetails = () => {
  const { selectedProduct, clearSelectedProduct } = useProductDetails();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tabOne");

  if (!selectedProduct) {
    return (
      <div className="text-center py-20">
        <p>Nenhum produto selecionado.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  const product = selectedProduct;

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  if (product.title === "") {
    return "Por favor, adicione um produto";
  }

  const tabs = [
    {
      id: "tabOne",
      title: "Descrição",
    },
    {
      id: "tabTwo",
      title: "Informações Adicionais",
    },
    {
      id: "tabThree",
      title: "Avaliações",
    },
  ];

  return (
    <>
      <Breadcrumb title={"Detalhes do Produto"} pages={["detalhes da loja"]} />

      <ProductHeader product={product} />

      <ProductTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
      />

      <RecentlyViewdItems />
      <Newsletter />
    </>
  );
};

export default ShopDetails;