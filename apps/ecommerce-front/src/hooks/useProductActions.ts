"use client";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types/product";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";

export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (item: Product, quantity: number = 1) => {
    dispatch(
      addItemToCart({
        ...item,
        quantity,
      })
    );

    toast.success(
      quantity > 1
        ? `${quantity}x ${item.title} foi adicionado ao carrinho!`
        : `${item.title} foi adicionado ao carrinho!`
    );
  };

  const handleAddToWishList = (item: Product) => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );

    toast.success(`${item.title} foi adicionado aos favoritos!`);
  };

  return {
    handleAddToCart,
    handleAddToWishList,
  };
};