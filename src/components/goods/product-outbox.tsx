import { IconButton, TableBody } from "@material-ui/core";
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
import useTable from "../base/useTable";

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
  const [selectedProduct, setSelectedProduct] = useState<OutboxItem>();

  useEffect(() => {
    productService.productsOutbox().then((res) => {
      if (res.data.length > 0) setProductState([JSON.parse(res.data)]);
    });
    return () => setProductState([]);
  }, [openAlert, openDeleteion, withdrawOpen]);

  function handleWithdraw(id: string): Promise<AxiosResponse<any>> {
    return productService.withdrawProductFromOutbox(id);
  }
  function handleDeletion(id: string): Promise<AxiosResponse<any>> {
    return productService.deleteProduct(id);
  }
  function handleAlert(id: string): Promise<AxiosResponse<any>> {
    return productService.activateAlarmForProduct(id);
  }

  const headCells = [
    { id: "productName", label: "Product", enableSearch: true },
    { id: "amount", label: "Amount", enableSorting: true },
    { id: "unit", label: "Unit" },
    { id: "receiver", label: "To", enableSorting: true, enableSearch: true },
    { id: "actions", label: "" },
  ];

  const {
    searchTerm,
    setSearchTerm,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSortingAndSearching,
  } = useTable(productState, headCells, ["productName", "receiver", "amount"]);

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSortingAndSearching().map(
            (product: OutboxItem) => (
              <TableRow
                key={product.key}
                style={{
                  backgroundColor: product.alarmFlag ? "lightpink" : undefined,
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
                    onClick={() => {
                      setSelectedProduct(product);
                      setWithdrawOpen(true);
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenAlert(true);
                    }}
                  >
                    <ReportProblem />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDeleteion(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <ConfirmDialog
        title="Are your sure you want to delete this product?"
        handleClose={() => setOpenDeleteion(false)}
        handleSubmit={handleDeletion}
        open={openDeleteion}
        productId={selectedProduct.key}
      />
      <ConfirmDialog
        title="Are your sure you want to start an alarm for this product?"
        handleClose={() => setOpenAlert(false)}
        handleSubmit={handleAlert}
        open={openAlert}
        productId={selectedProduct.key}
      />
      <ConfirmDialog
        title="Are your sure you want to move this product back to the stock?"
        handleClose={() => setWithdrawOpen(false)}
        handleSubmit={handleWithdraw}
        open={withdrawOpen}
        productId={selectedProduct.key}
      />
    </>
  );
};

export default ProductOutbox;
