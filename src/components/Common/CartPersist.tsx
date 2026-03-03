"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { setCartItems } from "@/redux/features/cart-slice";

import { getCartAction } from "../../../actions/cart/get-cart-action";
import { saveCartAction } from "../../../actions/cart/save-cart-action";

export default function CartPersist() {
  const dispatch = useDispatch();

  const items = useAppSelector((s) => s.cartReducer.items);
  const userId = useAppSelector((s) => s.userReducer.id);

  // evita salvar antes de carregar
  const loadedRef = useRef(false);
  const firstRunRef = useRef(true);

  // 1) quando loga, carrega carrinho do banco pro redux
  useEffect(() => {
    if (!userId) return;

    const loadCart = async () => {
      const response = await getCartAction();
      if (response.success) {
        dispatch(setCartItems(response.items));
        loadedRef.current = true;
      }
    };

    loadCart();
  }, [userId, dispatch]);

  // 2) quando itens mudam, salva no banco (debounce)
  useEffect(() => {
    if (!userId) return;
    if (!loadedRef.current) return;

    // evita salvar imediatamente após setCartItems
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      saveCartAction(items);
    }, 500);

    return () => clearTimeout(timeout);
  }, [items, userId]);

  return null;
}