import React from "react";
import MainLayout from "../../src/components/layout";
import UserManagement from "../../src/components/user/users-management";
import Head from "next/head";

export default function UserListPage() {
  return (
    <MainLayout>
      <Head>
        <title>Nutrisafe: List Users</title>
        <meta property="og:title" content="Nutrisafe: List Users" key="title" />
      </Head>
      <UserManagement></UserManagement>
    </MainLayout>
  );
}
