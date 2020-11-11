import { Button, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import productService from "../services/product-service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";

interface InboxItem {
  actualOwner: string;
  alarmFlag: boolean;
  amount: number;
  key: string;
  productName: string;
  unit: string;
}

const ProductInbox = () => {
  const [productState, setProductState] = useState<InboxItem[]>([]);

  useEffect(() => {
    productService.productsInbox().then((res) => {
      setProductState([JSON.parse(res.data)]);
    });
    return () => setProductState([]);
  }, []);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>From</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {productState.length != 0 ? (
            productState.map((product: InboxItem) => (
              <TableRow
                key={product.key}
                className={product.alarmFlag ? "background-color: red" : null}
              >
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.actualOwner}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      console.log(
                        "Implement behavior for productService.acceptProductFromInbox(product.key).then()"
                      )
                    }
                  >
                    <Check />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <Clear />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductInbox;
