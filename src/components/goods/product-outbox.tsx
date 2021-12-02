import { IconButton, TableBody, TableCell, TableRow } from "@material-ui/core";
import { ArrowBack, Delete, ReportProblem } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../base/ConfirmDialog";
import { ConfirmDialogObj } from "../base/ConfirmDialog.module";
import SearchInputField from "../base/searchInput";
import useTable from "../base/useTable";
import productService from "../services/product-service";
import { OutboxItem } from "./product-outbox.module";


const ProductOutbox = () => {
  const [productState, setProductState] = useState<OutboxItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    updateItems();
  }, []);

  function updateItems() {
    productService.productsOutbox().then((res:any) => {
      let array: OutboxItem[] = [];
      res.data.map((element) => {
        array.push(JSON.parse(element));
      });
      setProductState(array);
    });
  }

  function handleWithdraw(id: string) {
    return productService.withdrawProductFromOutbox(id).then(updateItems);
  }
  function handleDeletion(id: string) {
    return productService.deleteProduct(id).then(updateItems);
  }
  function handleAlert(id: string) {
    return productService.activateAlarmForProduct(id).then(updateItems);
  }

  const headCells = [
    { id: "productName", label: "Product" },
    { id: "amount", label: "Amount", enableSorting: true },
    { id: "unit", label: "Unit" },
    { id: "receiver", label: "To", enableSorting: true },
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
      <SearchInputField
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        key="search-input"
      />
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
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to move this product (${product.key}) back to the stock?`,
                        subtitle: "This can cause major consequences",
                        onConfirm: () => handleWithdraw(product.key),
                      });
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to start an alert for this product (${product.key})?`,
                        subtitle: "This can cause major consequences",
                        onConfirm: () => handleAlert(product.key),
                      });
                    }}
                  >
                    <ReportProblem />
                  </IconButton>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to delete this product (${product.key})?`,
                        subtitle: "This action is irreversible",
                        onConfirm: () => handleDeletion(product.key),
                      });
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
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ProductOutbox;
