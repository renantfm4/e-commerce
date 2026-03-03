"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/product";

interface ProductDetailsContextType {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  clearSelectedProduct: () => void;
}

const ProductDetailsContext = createContext<ProductDetailsContextType | undefined>(undefined);

export function ProductDetailsProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const clearSelectedProduct = () => setSelectedProduct(null);

  return (
    <ProductDetailsContext.Provider value={{ selectedProduct, setSelectedProduct, clearSelectedProduct }}>
      {children}
    </ProductDetailsContext.Provider>
  );
}

export function useProductDetails() {
  const context = useContext(ProductDetailsContext);
  if (!context) {
    throw new Error("useProductDetails deve ser usado dentro de ProductDetailsProvider");
  }
  return context;
}