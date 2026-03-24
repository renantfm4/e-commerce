"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryFilterContextType {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;

  pendingCategories: string[];
  setPendingCategories: React.Dispatch<React.SetStateAction<string[]>>;

  headerCategoryValue: string;
  setHeaderCategoryValue: React.Dispatch<React.SetStateAction<string>>;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export function CategoryFilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);
  const [headerCategoryValue, setHeaderCategoryValue] =
    useState("__placeholder__");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <CategoryFilterContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        pendingCategories,
        setPendingCategories,
        headerCategoryValue,
        setHeaderCategoryValue,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  const context = useContext(CategoryFilterContext);

  if (!context) {
    throw new Error(
      "useCategoryFilter deve ser usado dentro de CategoryFilterProvider",
    );
  }

  return context;
}