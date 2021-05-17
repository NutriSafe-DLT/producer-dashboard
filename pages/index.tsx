import React from "react";
import MainLayout from "../src/components/layout/index";
import SignIn from "./login";
import Head from "next/head";

export default function Index() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: Welcome</title>
        <meta property="og:title" content="Nutrisafe: Welcome" key="title" />
      </Head>
      <SignIn />
    </MainLayout>
  );
}
