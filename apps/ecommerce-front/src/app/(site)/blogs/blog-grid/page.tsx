import React from "react";
import BlogGrid from "@/components/BlogGrid";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Grade de Blogs`,
  description: `Esta é a página da grade de blogs para o template ${shopName}`,
  // other metadata
};

const BlogGridPage = () => {
  return (
    <main>
      <BlogGrid />
    </main>
  );
};

export default BlogGridPage;
