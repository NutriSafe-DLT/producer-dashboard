import React from "react";
import WithAuthentication from "../src/components/base/withAuthentication";
import MainLayout from "../src/components/layout/index";
import MetaInfo from "../src/components/metainfo/index";

export default function MetaInfoPage() {
  return (
    <MainLayout>
      <WithAuthentication requiredRole="ROLE_ADMIN">
        <MetaInfo></MetaInfo>
      </WithAuthentication>
    </MainLayout>
  );
}
