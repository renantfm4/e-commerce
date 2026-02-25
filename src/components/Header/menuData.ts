import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Popular",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Loja",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Contato",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Páginas",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Loja com Barra Lateral",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Loja sem Barra Lateral",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Finalizar Compra",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Carrinho",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Lista de Desejos",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Entrar",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Cadastrar",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Minha Conta",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "Contato",
        newTab: false,
        path: "/contact",
      },
      {
        id: 62,
        title: "Erro",
        newTab: false,
        path: "/error",
      },
      {
        id: 63,
        title: "E-mail Enviado com Sucesso",
        newTab: false,
        path: "/mail-success",
      },
    ],
  },
  {
    id: 7,
    title: "Blog",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Blog em Grade com Barra Lateral",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Blog em Grade",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Detalhes do Blog com Barra Lateral",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 74,
        title: "Detalhes do Blog",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];