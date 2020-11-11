import * as React from "react";

interface Props {
  products: Product[];
}

const GoodsTable = (props: Props) => {
  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Unit</th>
      </thead>
      <tbody>
        {props.products.map((product) => {
          return (
            <tr>
              <td>{product.id}</td>
              <td>{product.product}</td>
              <td>{product.amount}</td>
              <td>{product.unit}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GoodsTable;
