import React from "react";
import WithAuthorization from "../src/components/base/withAuthorization";
import MainLayout from "../src/components/layout/index";
import MetaInfo from "../src/components/metainfo/index";
import Head from "next/head";

export default function MetaInfoPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Meta Information</title>
        <meta property="og:title" content="Nutrisafe: Meta Information" key="title" />
      </Head>
      <WithAuthorization requiredRole="ROLE_ADMIN">
        <MetaInfo></MetaInfo>
      </WithAuthorization>
    </MainLayout>
  );
}
