import { Testimonial } from "@/types/testimonial";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

const testimonialsData: Testimonial[] = [
  {
    review: `Migrei minha loja de eletrônicos pra ${shopName} e o checkout converteu 18% a mais em celulares e notebooks. Os upsells de capa + película + garantia estendida funcionam muito bem — cliente compra TV de 65" e leva acessórios fácil. Taxa de aprovação de parcelamento top, sem estorno alto.`,
    authorName: "Renan Araújo",
    authorImg: "/images/users/renan-icon.png",
    authorRole: "Gerente de E-commerce Tech",
    authorLink: "https://www.linkedin.com/in/renanaraujo7/",
  },
  {
    review: `Plataforma boa pra vender TVs, notebooks e smartwatches, mas logística é o calcanhar de Aquiles. Frete de produtos pesados (TV 75", PC gamer) sai caro e demora, cliente reclama muito. Prefiro Mercado Livre pra eletrônicos grandes, NextCommerce é melhor pra itens menores como fones e relógios.`,
    authorName: "Leandro Silva",
    authorImg: "/images/users/leandro-icon.png",
    authorRole: "Dono de Loja de Eletrônicos",
    authorLink: "https://www.linkedin.com/in/leandro-silva-a78979216/",
  },
  {
    review: `Testei dropshipping de celulares e acessórios na ${shopName} — integração com fornecedores chineses é rápida e o AOV subiu com bundles (celular + carregador + capa). Mas devoluções por "não gostei" ou "defeito" são altas em eletrônicos, e o antifraude local não pega tudo. Cuidado com chargeback!`,
    authorName: "Miracle Exterm",
    authorImg: "/images/users/user-03.jpg",
    authorRole: "Dropshipper de Eletrônicos",
  },
  {
    review: `Ótima pra loja de informática: venda de notebooks, PCs montados e periféricos converte bem com fotos 360° e zoom no produto. Comparador de specs ajuda o cliente indeciso. Mas pro Brasil, integração com Correios e transportadoras de tech (que cobram por seguro extra) ainda deixa a desejar.`,
    authorName: "Thomas Frank",
    authorImg: "/images/users/user-01.jpg",
    authorRole: "Empreendedor Loja de Informática",
  },
  {
    review: `Se você vende relógios smart, earbuds e gadgets baratos, ${shopName} é overkill e cara. Fica mais em conta no Shopify + apps de comparação de preço. Pra tíquete alto (TV, notebook gamer), vale se você tem estoque próprio e logística própria — senão vira prejuízo com frete e devolução.`,
    authorName: "Dave Smith",
    authorImg: "/images/users/user-02.jpg",
    authorRole: "Revendedor de Gadgets",
  },
  {
    review: `Melhor parte: recuperação de carrinho abandonado insana pra eletrônicos — manda oferta de desconto em notebook que o cara deixou no carrinho e converte 30%+. Pior: suporte demora pra aprovar produtos com "alto risco" (celulares importados), e imposto de importação bagunça o preço final pro cliente.`,
    authorName: "Davis Dorwart",
    authorImg: "/images/users/user-03.jpg",
    authorRole: "Performance Marketer - Nicho Tech",
  },
];

export default testimonialsData;