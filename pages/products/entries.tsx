import React from "react";
import MainLayout from "../../src/components/layout/index";
import GoodsEntry from "../../src/components/goods/goods-entry";
import Head from "next/head";


export default function MetaInfoPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Goods Entry</title>
        <meta property="og:title" content="Nutrisafe: Goods Entry" key="title" />
      </Head>
      <GoodsEntry></GoodsEntry>
    </MainLayout>
  );
}
