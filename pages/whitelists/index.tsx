import React from "react";
import MainLayout from "../../src/components/layout";
import WhitelistManegement from "../../src/components/whitelists/whitelist-management";
import Head from "next/head";

export default function WhitelistListPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Whitelist Management</title>
        <meta property="og:title" content="Nutrisafe: Whitelist Management" key="title" />
      </Head>
      <WhitelistManegement></WhitelistManegement>
    </MainLayout>
  );
}
