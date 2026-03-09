"use client";

import { useEffect, useMemo, useState } from "react";
import shopData from "@/components/Shop/shopData";
import { useCategoryFilter } from "@/app/context/CategoryFilterContext";

export interface PriceRange {
  from: number;
  to: number;
}

export const SHOP_DEFAULT_PRICE: PriceRange = {
  from: 0,
  to: 2000,
};

export const SHOP_SORT_OPTIONS = [
  { label: "Produtos Mais Recentes", value: "0" },
  { label: "Mais Vendidos", value: "1" },
  { label: "Produtos Antigos", value: "2" },
] as const;

export const useShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [selectedPrice, setSelectedPrice] =
    useState<PriceRange>(SHOP_DEFAULT_PRICE);

  const { selectedCategories, setSelectedCategories } = useCategoryFilter();

  const categories = useMemo(() => {
    return Array.from(new Set(shopData.map((product) => product.category))).map(
      (category) => ({
        name: category,
        products: shopData.filter((p) => p.category === category).length,
      })
    );
  }, []);

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  const toggleSidebar = () => {
    setProductSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setProductSidebar(false);
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice(SHOP_DEFAULT_PRICE);
  };

  const filteredProducts = useMemo(() => {
    return shopData.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        product.price >= selectedPrice.from &&
        product.price <= selectedPrice.to;

      return matchesCategory && matchesPrice;
    });
  }, [selectedCategories, selectedPrice]);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".sidebar-content")) {
        closeSidebar();
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  useEffect(() => {
    return () => {
      setSelectedCategories([]);
      setSelectedPrice(SHOP_DEFAULT_PRICE);
    };
  }, [setSelectedCategories]);

  return {
    productStyle,
    setProductStyle,
    productSidebar,
    stickyMenu,
    selectedCategories,
    selectedPrice,
    setSelectedPrice,
    categories,
    filteredProducts,
    options: SHOP_SORT_OPTIONS,
    totalProducts: shopData.length,
    toggleSidebar,
    toggleCategory,
    clearAllFilters,
  };
};