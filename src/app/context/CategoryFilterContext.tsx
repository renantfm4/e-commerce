"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryFilterContextType {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  addCategories: (categories: string[]) => void;
  clearSelectedCategories: () => void;
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export function CategoryFilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const addCategories = (newCategories: string[]) => {
    setSelectedCategories((prev) => {
      // Remove duplicatas e junta
      const unique = new Set([...prev, ...newCategories]);
      return Array.from(unique);
    });
  };

  const clearSelectedCategories = () => setSelectedCategories([]);

  return (
    <CategoryFilterContext.Provider 
      value={{ selectedCategories, setSelectedCategories, addCategories, clearSelectedCategories }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
}

export function useCategoryFilter() {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error("useCategoryFilter deve ser usado dentro de CategoryFilterProvider");
  }
  return context;
}