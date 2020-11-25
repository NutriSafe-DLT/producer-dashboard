import { Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import ConfirmDialog from "./confirmation-dialog";
import { AxiosResponse } from "axios";

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
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);

  useEffect(() => {
    productService.productsInbox().then((res) => {
      if (res.data.length > 0) setProductState([JSON.parse(res.data)]);
    });
    return () => setProductState([]);
  }, []);

  function handleAcceptProduct(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.acceptProductFromInbox(id);
    promise.then(() => {
      const filteredList = productState.filter((item) => item.key != id);
      setProductState(filteredList);
    });
    return promise;
  }

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
                style={{
                  backgroundColor: product.alarmFlag ? "lightpink" : undefined,
                }}
              >
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.actualOwner}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => setAcceptDialogOpen(true)}
                  >
                    <Check />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <Clear />
                  </IconButton>
                </TableCell>
                <ConfirmDialog
                  title="Are your sure you want to accept for this product?"
                  handleClose={() => setAcceptDialogOpen(false)}
                  handleSubmit={handleAcceptProduct}
                  open={acceptDialogOpen}
                  productId={product.key}
                />
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
