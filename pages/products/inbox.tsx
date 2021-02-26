import React from "react";
import ProductInbox from "../../src/components/goods/product-inbox";
import MainLayout from "../../src/components/layout";
import Head from "next/head";

export default function ProductInboxPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Inbox</title>
        <meta property="og:title" content="Nutrisafe: Inbox" key="title" />
      </Head>
      <ProductInbox></ProductInbox>
    </MainLayout>
  );
}
