import React from "react";
import MainLayout from "../src/components/layout/index";
import Dashboard from "../src/components/dashboard/index";
import Head from "next/head";

export default function Dash() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Dashboard</title>
        <meta property="og:title" content="Nutrisafe: Dashboard" key="title" />
      </Head>
      <Dashboard />
    </MainLayout>
  );
}
