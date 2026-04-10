import BlogDetails from "@/components/BlogDetails";
import React from "react";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Detalhes do Blog`,
  description: `Esta é a página de detalhes do blog para o template ${shopName}`,
  // other metadata
};

const BlogDetailsPage = () => {
  return (
    <main>
      <BlogDetails />
    </main>
  );
};

export default BlogDetailsPage;
