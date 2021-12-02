import React from "react";
import MainLayout from "../src/components/layout/index";
import AddGoods from "../src/components/goods/add-goods";
import Head from "next/head";

export default function GoodsIndexPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Add product</title>
        <meta property="og:title" content="Nutrisafe: Add product" key="title" />
      </Head>
      <AddGoods />
    </MainLayout>
  );
}
