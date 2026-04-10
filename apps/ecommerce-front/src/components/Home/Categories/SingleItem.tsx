"use client";

import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SingleItemProps {
  item: Category;
  onClick: () => void;
}

const SingleItem = ({ item, onClick }: SingleItemProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center w-full cursor-pointer focus:outline-none"
    >
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
        <Image src={item.img} alt={item.title} width={82} height={62} />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-primary to-primary bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-primary">
          {item.title}
        </h3>
      </div>
    </button>
  );
};

export default SingleItem;