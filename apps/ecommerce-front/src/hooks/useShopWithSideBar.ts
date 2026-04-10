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

const normalizeText = (value: unknown) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const useShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [selectedPrice, setSelectedPrice] =
    useState<PriceRange>(SHOP_DEFAULT_PRICE);

  const {
    selectedCategories,
    setSelectedCategories,
    pendingCategories,
    setPendingCategories,
    setHeaderCategoryValue,
    searchTerm,
    setSearchTerm,
  } = useCategoryFilter();

  const categories = useMemo(() => {
    return Array.from(new Set(shopData.map((product: any) => product.category))).map(
      (category) => ({
        name: category,
        products: shopData.filter((p: any) => p.category === category).length,
      }),
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
        : [...prev, categoryName],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice(SHOP_DEFAULT_PRICE);
    setHeaderCategoryValue("");
    setSearchTerm("");
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return shopData.filter((product: any) => {
      const productName = normalizeText(
        product.title ?? product.name ?? product.productName ?? "",
      );
      const productCategory = normalizeText(product.category);
      const productDescription = normalizeText(
        product.description ?? product.details ?? product.summary ?? "",
      );
      const productTags = normalizeText(
        Array.isArray(product.tags) ? product.tags.join(" ") : product.tags,
      );

      const productPrice = Number(product.price ?? 0);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        productPrice >= selectedPrice.from && productPrice <= selectedPrice.to;

      const matchesSearch =
        normalizedSearch === "" ||
        productName.includes(normalizedSearch) ||
        productCategory.includes(normalizedSearch) ||
        productDescription.includes(normalizedSearch) ||
        productTags.includes(normalizedSearch);

      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [selectedCategories, selectedPrice, searchTerm]);

  useEffect(() => {
    if (pendingCategories.length > 0) {
      setSelectedCategories(pendingCategories);
      setPendingCategories([]);
    }
  }, [pendingCategories, setSelectedCategories, setPendingCategories]);

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
    searchTerm,
  };
};