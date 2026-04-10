"use client";

import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import { getCartAction } from "../../../actions/cart/get-cart-action";

interface OrderItem {
  id: string;
  orderId?: string;        // opcional, usado no SingleOrder
  orderStatus: string;
  createdAt: string;       // renomeado para combinar com SingleOrder
  title: string;
  price: number;
  total: number;
  quantity: number;
  image?: string;
  [key: string]: any;
}

const Orders = () => {
  const [serverCartItems, setServerCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServerCart() {
      try {
        setLoading(true);
        setError(null);

        const response = await getCartAction();

        if (!response.success) {
          throw new Error(response.message || "Falha ao carregar carrinho");
        }

        setServerCartItems(response.items || []);
      } catch (err: any) {
        console.error("Erro ao buscar carrinho:", err);
        setError(err.message || "Não foi possível carregar os itens.");
      } finally {
        setLoading(false);
      }
    }

    loadServerCart();
  }, []);

  const pendingOrders: OrderItem[] = serverCartItems.map((item) => ({
    id: `cart-${item.id || Date.now()}`,
    orderId: item.id ? `PED${item.id}` : undefined,
    orderStatus: "No Carrinho",
    createdAt: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    title: item.title || "Produto sem título",
    price: item.discountedPrice || item.price || 0,
    total: (item.discountedPrice || item.price || 0) * (item.quantity || 1),
    quantity: item.quantity || 1,
    image: item.imgs?.thumbnails?.[0] || "",
  }));

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-600">Carregando seus pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-dark text-white rounded-md hover:bg-opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (pendingOrders.length === 0) {
    return (
      <div className="py-20 px-6 text-center">
        <p className="text-xl text-gray-600 mb-6">
          Você não tem pedidos recentes nem itens no carrinho.
        </p>
        <a
          href="/shop"
          className="inline-block px-8 py-3 bg-dark text-white rounded-md hover:bg-opacity-90 transition"
        >
          Continuar comprando
        </a>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Cabeçalho desktop */}
      <div className="min-w-[770px]">
        <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex bg-gray-50 border-b">
          <div className="min-w-[111px]"><p className="text-custom-sm text-dark font-medium">Pedido</p></div>
          <div className="min-w-[175px]"><p className="text-custom-sm text-dark font-medium">Data</p></div>
          <div className="min-w-[128px]"><p className="text-custom-sm text-dark font-medium">Status</p></div>
          <div className="min-w-[213px]"><p className="text-custom-sm text-dark font-medium">Título</p></div>
          <div className="min-w-[113px]"><p className="text-custom-sm text-dark font-medium">Total</p></div>
          <div className="min-w-[113px]"><p className="text-custom-sm text-dark font-medium">Ação</p></div>
        </div>

        {/* Itens desktop */}
        {pendingOrders.map((orderItem) => (
          <SingleOrder
            key={orderItem.id}
            orderItem={orderItem}
            smallView={false}
            isPending={true}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 mt-6 px-4">
        {pendingOrders.map((orderItem) => (
          <SingleOrder
            key={orderItem.id}
            orderItem={orderItem}
            smallView={true}
            isPending={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;