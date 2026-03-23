import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

export const metadata: Metadata = {
  title: `${shopName} | Lista de Desejos`,
  description: `Esta é a página da lista de desejos para o template ${shopName}`,
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
