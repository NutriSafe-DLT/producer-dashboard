import React from "react";
import MainLayout from "../src/components/layout/index";
import AddGoods from "../src/components/goods/add-goods";

export default function Index() {
  return (
    <MainLayout>
      <AddGoods />
    </MainLayout>
  );
}
