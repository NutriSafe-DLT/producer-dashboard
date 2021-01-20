import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import React from "react";
import productService from "../services/product-service";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import {
  ArrowForward,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ReportProblem,
  Search,
} from "@material-ui/icons";
import SetReceiverDialog from "./set-receiver-dialog";
import useTable from "../base/useTable";
import ConfirmDialog, { ConfirmDialogObj } from "../base/ConfirmDialog";
import Controls from "../base/controls/Controls";
import SearchInputField from "../base/searchInput";

interface StockItem {
  alarmFlag: boolean;
  amount: number;
  key: string;
  productName: string;
  unit: string;
  attributes: any;
}

interface ProductStockRowProps {
  row: StockItem;
  setConfirmDialog;
  handleProductDeletion;
  handleSetReceiver;
  handleSetAlert;
}

function Row(props: ProductStockRowProps) {
  const {
    row,
    setConfirmDialog,
    handleProductDeletion,
    handleSetReceiver,
    handleSetAlert,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        style={{
          backgroundColor: row.alarmFlag ? "lightpink" : undefined,
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.key}</TableCell>
        <TableCell>{row.productName}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.unit}</TableCell>
        <TableCell>
          {row.alarmFlag ? (
            <div />
          ) : (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: `Are your sure you want to start an alert for this product (${row.key})?`,
                  subtitle: "This can cause major consequences",
                  onConfirm: () => handleSetAlert(row.key),
                });
              }}
            >
              <ReportProblem />
            </IconButton>
          )}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: `Are your sure you want to delete this product (${row.key})?`,
                subtitle: "This action is irreversible",
                onConfirm: () => handleProductDeletion(row.key),
              });
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() =>
              console.log("IMPLEMENT setReceiver stuff, maybe with useDialog?")
            }
          >
            <ArrowForward />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow
        style={{
          backgroundColor: row.alarmFlag ? "lightpink" : undefined,
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Attributes
              </Typography>

              {Object.keys(row.attributes).map((objKey) => (
                <Typography variant="subtitle1" gutterBottom component="div">
                  {`${objKey}: ${row.attributes[objKey]}`}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ProductStock = () => {
  const [productState, setProductState] = useState<StockItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const headCells = [
    { id: "toggle", label: "" },
    { id: "key", label: "Key", enableSorting: true },
    { id: "productName", label: "Product" },
    { id: "amount", label: "Amount", enableSorting: true },
    { id: "unit", label: "Unit" },
    { id: "actions", label: "Actions" },
  ];
  const {
    TblContainer,
    searchTerm,
    setSearchTerm,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSortingAndSearching,
  } = useTable(productState, headCells, ["productName", "key"]);

  useEffect(() => {
    updateItems();
  }, []);

  function updateItems() {
    productService.productStock().then((res) => {
      let array: StockItem[] = [];
      res.data.map((element) => {
        array.push(JSON.parse(element));
      });
      setProductState(array);
    });
  }

  function handleProductDeletion(id) {
    productService.deleteProduct(id).then(updateItems);
  }

  function handleSetAlert(id) {
    productService.activateAlarmForProduct(id).then(updateItems);
  }

  function handleSetReceiver(id: string, receiver: string) {
    productService
      .sendProductToOutboxForReceiver(id, receiver)
      .then(updateItems);
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
            (product: StockItem) => (
              <Row
                key={product.key}
                row={product}
                setConfirmDialog={setConfirmDialog}
                handleProductDeletion={handleProductDeletion}
                handleSetReceiver={handleSetReceiver}
                handleSetAlert={handleSetAlert}
              />
            )
          )}
        </TableBody>
        <TblPagination />
      </TblContainer>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
    </>
  );
};

export default ProductStock;
