import Home from "@/components/Home";
import { Metadata } from "next";
import shopConfig from "@/constants/shop.config.json";
import { FaWhatsapp } from "react-icons/fa";

const shopName = shopConfig.shopName;

export const metadata: Metadata = {
  title: `${shopName} | O melhor e-commerce tech pra você!`,
  description: `This is the Home page for ${shopName} Template`,
};

export default function HomePage() {
  return (
    <>
      <Home />

      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale pelo WhatsApp"
        className="
          fixed right-8 bottom-22 z-50
          flex items-center justify-center
          h-11 w-11 rounded-full
          bg-[#25D366] text-white
          shadow-[0_8px_30px_rgba(37,211,102,0.35)]
          transition-all duration-300
          hover:scale-105 hover:shadow-[0_10px_35px_rgba(37,211,102,0.45)]
          animate-whatsapp-slide

          md:bottom-24
          md:w-auto md:px-5 md:py-3 md:gap-3
        "
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" />
        <span className="hidden md:inline font-semibold whitespace-nowrap">
          Fale pelo WHATSAPP
        </span>
      </a>
    </>
  );
}