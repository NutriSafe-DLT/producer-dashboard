import {
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Check, Clear, Search } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Controls from "../base/controls/Controls";
import useTable from "../base/useTable";
import productService from "../services/product-service";
import ConfirmDialog from "./confirmation-dialog";

interface InboxItem {
  actualOwner: string;
  alarmFlag: boolean;
  amount: number;
  key: string;
  productName: string;
  unit: string;
}

const headCells = [
  { id: "productName", label: "Product", enableSearch: true },
  { id: "amount", label: "Amount", enableSorting: true },
  { id: "unit", label: "Unit" },
  { id: "actualOwner", label: "From", enableSorting: true, enableSearch: true },
  { id: "actions", label: "" },
];

const ProductInboxNew = () => {
  const [products, setProducts] = useState<InboxItem[]>([]);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [acceptProductId, setAcceptProductId] = useState();

  useEffect(() => {
    productService.productsInbox().then((res) => {
      if (res.data.length > 0) setProducts([JSON.parse(res.data)]);
    });
    return () => setProducts([]);
  }, []);

  function handleAcceptProduct(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.acceptProductFromInbox(id);
    promise.then(() => {
      const filteredList = products.filter((item) => item.key != id);
      setProducts(filteredList);
    });
    return promise;
  }

  const {
    searchTerm,
    setSearchTerm,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSortingAndSearching,
  } = useTable(products, headCells, ["productName", "actualOwner"]);

  return (
    <>
      <Controls.Input
        label="Search"
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSortingAndSearching().map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.actualOwner}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <ConfirmDialog
        title="Are your sure you want to accept for this product?"
        handleClose={() => setAcceptDialogOpen(false)}
        handleSubmit={handleAcceptProduct}
        open={acceptDialogOpen}
        productId={acceptProductId}
      />
    </>
  );
};

export default ProductInboxNew;
