"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type DraftCheckout = {
  createdAt: string;
  email?: string;
  notes?: string;
  shippingMethod: "free" | "fedex" | "dhl";
  shippingCost: number;
  paymentMethod: "test";
  items: Array<{
    id: string | number;
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  total: number;
};

export type PaidOrder = DraftCheckout & {
  orderId: string;
  status: "paid";
  paidAt: string;
};

type Ctx = {
  draft: DraftCheckout | null;
  setDraft: (d: DraftCheckout) => void;
  clearDraft: () => void;

  lastOrder: PaidOrder | null;
  setLastOrder: (o: PaidOrder) => void;
  clearLastOrder: () => void;

  hydrated: boolean;
};

const CheckoutFlowContext = createContext<Ctx | null>(null);

const DRAFT_KEY = "checkoutDraft";
const ORDER_KEY = "checkoutLastOrder";

export function CheckoutFlowProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<DraftCheckout | null>(null);
  const [lastOrder, setLastOrderState] = useState<PaidOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const d = sessionStorage.getItem(DRAFT_KEY);
      const o = sessionStorage.getItem(ORDER_KEY);
      if (d) setDraftState(JSON.parse(d));
      if (o) setLastOrderState(JSON.parse(o));
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  const setDraft = (d: DraftCheckout) => {
    setDraftState(d);
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch {}
  };

  const clearDraft = () => {
    setDraftState(null);
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const setLastOrder = (o: PaidOrder) => {
    setLastOrderState(o);
    try {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(o));
    } catch {}
  };

  const clearLastOrder = () => {
    setLastOrderState(null);
    try {
      sessionStorage.removeItem(ORDER_KEY);
    } catch {}
  };

  const value = useMemo(
    () => ({
      draft,
      setDraft,
      clearDraft,
      lastOrder,
      setLastOrder,
      clearLastOrder,
      hydrated,
    }),
    [draft, lastOrder, hydrated]
  );

  return <CheckoutFlowContext.Provider value={value}>{children}</CheckoutFlowContext.Provider>;
}

export function useCheckoutFlow() {
  const ctx = useContext(CheckoutFlowContext);
  if (!ctx) throw new Error("useCheckoutFlow precisa estar dentro de <CheckoutFlowProvider />");
  return ctx;
}