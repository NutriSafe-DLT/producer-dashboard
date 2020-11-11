import * as React from "react";
import { useState } from "react";
import GoodsTable from "./goods-table";

const GoodsEntry = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "milk1",
      product: "productName",
      amount: "50",
      unit: "Liters",
      attributes: [],
      attrValues: [],
    },
  ]);
  return <GoodsTable products={products}></GoodsTable>;
};

export default GoodsEntry;
