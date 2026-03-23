import React from "react";
import BlogDetailsWithSidebar from "@/components/BlogDetailsWithSidebar";
import shopConfig from "@/constants/shop.config.json";

const shopName = shopConfig.shopName;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${shopName} | Detalhes do Blog`,
  description: `Esta é a página de detalhes do blog para o template ${shopName}`,
  // other metadata
};

const BlogDetailsWithSidebarPage = () => {
  return (
    <main>
      <BlogDetailsWithSidebar />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;
