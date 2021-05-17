import React from "react";
import ProductOutbox from "../../src/components/goods/product-outbox";
import MainLayout from "../../src/components/layout";
import Head from "next/head";

export default function ProductOutboxPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Outbox</title>
        <meta property="og:title" content="Nutrisafe: Outbox" key="title" />
      </Head>
      <ProductOutbox></ProductOutbox>
    </MainLayout>
  );
}
