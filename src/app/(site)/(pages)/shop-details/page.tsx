import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalhes do Produto",
  description: "Aqui está os detalhes do produto selecionado.",
};

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />  
    </main>
  );
};

export default ShopDetailsPage;