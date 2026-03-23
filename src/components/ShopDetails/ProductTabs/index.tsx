import React from "react";
import ProductDescription from "../ProductDescription";
import ProductAdditionalInfo from "../ProductAdditionalInfo";
import ProductReviews from "../ProductReviews";

const ProductTabs = ({ tabs, activeTab, setActiveTab, product }) => {
  return (
    <section className="overflow-hidden bg-gray-2 py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
          {tabs.map((item, key) => (
            <button
              key={key}
              onClick={() => setActiveTab(item.id)}
              className={`font-medium lg:text-lg ease-out duration-200 hover:text-primary relative before:h-0.5 before:bg-primary before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${activeTab === item.id
                ? "text-primary before:w-full"
                : "text-dark before:w-0"
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {activeTab === "tabOne" && <ProductDescription />}
        {activeTab === "tabTwo" && <ProductAdditionalInfo />}
        {activeTab === "tabThree" && <ProductReviews />}
      </div>
    </section>
  );
};

export default ProductTabs;