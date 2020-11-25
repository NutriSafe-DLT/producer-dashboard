import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import productService from "../services/product-service";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ArrowBack, Delete, ReportProblem } from "@material-ui/icons";
import ConfirmDialog from "./confirmation-dialog";
import { AxiosResponse } from "axios";

interface OutboxItem {
  receiver: string;
  alarmFlag: boolean;
  amount: number;
  key: string;
  productName: string;
  unit: string;
}

const ProductOutbox = () => {
  const [productState, setProductState] = useState<OutboxItem[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDeleteion, setOpenDeleteion] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  useEffect(() => {
    productService.productsOutbox().then((res) => {
      setProductState([JSON.parse(res.data)]);
    });
    return () => setProductState([]);
  }, []);

  function handleWithdraw(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.withdrawProductFromOutbox(id);
    promise.then(() => {
      const filtered = productState.filter((item) => item.key != id);
      setProductState(filtered);
    });
    return promise;
  }
  function handleDeletion(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.deleteProduct(id);
    promise.then(() => {
      const filtered = productState.filter((item) => item.key != id);
      setProductState(filtered);
    });
    return promise;
  }
  function handleAlert(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.activateAlarmForProduct(id);
    promise.then(() => {
      const filtered = [].concat(productState);
      filtered.forEach((item) => {
        if (item.key === id) item.alarmFlag = true;
      });
      setProductState(filtered);
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
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {productState.length != 0 ? (
            productState.map((product: OutboxItem) => (
              <TableRow
                key={product.key}
                style={{
                  backgroundColor: product.alarmFlag ? "red" : undefined,
                }}
              >
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.receiver}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setWithdrawOpen(true)}
                  >
                    <ArrowBack />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenAlert(true)}
                  >
                    <ReportProblem />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpenDeleteion(true)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <ConfirmDialog
                  title="Are your sure you want to delete this product?"
                  handleClose={() => setOpenDeleteion(false)}
                  handleSubmit={handleDeletion}
                  open={openDeleteion}
                  productId={product.key}
                />
                <ConfirmDialog
                  title="Are your sure you want to start an alarm for this product?"
                  handleClose={() => setOpenAlert(false)}
                  handleSubmit={handleAlert}
                  open={openAlert}
                  productId={product.key}
                />
                <ConfirmDialog
                  title="Are your sure you want to move this product back to the stock?"
                  handleClose={() => setWithdrawOpen(false)}
                  handleSubmit={handleWithdraw}
                  open={withdrawOpen}
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

export default ProductOutbox;
