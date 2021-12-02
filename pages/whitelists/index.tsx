import React from "react";
import MainLayout from "../../src/components/layout";
import WhitelistManegement from "../../src/components/whitelists/whitelist-management";

export default function WhitelistListPage() {
  return (
    <MainLayout>
      <WhitelistManegement></WhitelistManegement>
    </MainLayout>
  );
}
