import Head from "next/head";
import React from "react";
import MainLayout from "../src/components/layout";
import TraceTransaction from "../src/components/goods/trace-transactions";


export default function TraceTransactionPage() {
    return (
      <MainLayout>
        <Head>
          <title>Nutrisafe: Trace Transactions</title>
          <meta property="og:title" content="Nutrisafe: Trace Transactions" key="title" />
        </Head>
        <TraceTransaction/>
      </MainLayout>
    );
  }