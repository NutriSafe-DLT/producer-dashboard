import React from "react";
import MainLayout from "../../src/components/layout";
import WhitelistList from "../../src/components/whitelists/whitelists";

export default function WhitelistListPage() {
  return (
    <MainLayout>
      <WhitelistList></WhitelistList>
    </MainLayout>
  );
}
