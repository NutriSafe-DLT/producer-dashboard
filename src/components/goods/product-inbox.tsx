import { IconButton, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../base/ConfirmDialog";
import { ConfirmDialogObj } from "../base/ConfirmDialog.module";
import SearchInputField from "../base/searchInput";
import useTable from "../base/useTable";
import productService from "../services/product-service";
import { InboxItem } from "./product-inbox.module";


const ProductInbox = () => {
  const [productState, setProductState] = useState<InboxItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const headCells = [
    { id: "key", label: "Key", enableSorting: true },
    { id: "productName", label: "Product" },
    { id: "actualOwner", label: "From", enableSorting: true },
    { id: "amount", label: "Amount", enableSorting: true },
    { id: "unit", label: "Unit" },
    { id: "actions", label: "" },
  ];

  const {
    searchTerm,
    setSearchTerm,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSortingAndSearching,
  } = useTable(productState, headCells, ["productName", "actualOwner", "key"]);

  useEffect(() => {
    updateItems();
  }, []);

  function updateItems() {
    productService.productsInbox().then((res) => {
      if (res.data.length > 0) setProductState([JSON.parse(res.data)]);
    });
  }

  function handleAcceptProduct(id: string) {
    productService.acceptProductFromInbox(id).then(updateItems);
  }

  function handleRejectProduct(id: string) {
    // what function to use when rejecting???
    // productService.acceptProductFromInbox(id).then(updateItems);
  }

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
            (product: InboxItem) => (
              <TableRow
                key={product.key}
                style={{
                  backgroundColor: product.alarmFlag ? "lightpink" : undefined,
                }}
              >
                <TableCell>{product.key}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.actualOwner}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to accept this product (${product.key})?`,
                        subtitle: "This action is irreversible",
                        onConfirm: () => handleAcceptProduct(product.key),
                      });
                    }}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to reject this product (${product.key})?`,
                        subtitle: "",
                        onConfirm: () => handleRejectProduct(product.key),
                      });
                    }}
                  >
                    <Clear />
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

export default ProductInbox;
