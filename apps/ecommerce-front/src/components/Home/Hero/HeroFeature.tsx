import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Frete Grátis",
    description: "Para pedidos acima de R$ 1.000",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "Pagamentos 100% Seguros",
    description: "Garantia total de segurança",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "Suporte 24/7 Dedicado",
    description: "A qualquer hora e em qualquer lugar",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="ícones" width={40} height={41} />

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;