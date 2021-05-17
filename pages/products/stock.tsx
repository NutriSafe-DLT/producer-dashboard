import React from "react";
import ProductStock from "../../src/components/goods/product-stock";
import MainLayout from "../../src/components/layout";
import Head from "next/head";

export default function ProductStockPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: View Stock</title>
        <meta property="og:title" content="Nutrisafe: View Stock" key="title" />
      </Head>
      <ProductStock></ProductStock>
    </MainLayout>
  );
}
