import {
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import React from "react";
import productService from "../services/product-service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  ArrowForward,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ReportProblem,
} from "@material-ui/icons";
import ConfirmDialog from "./confirmation-dialog";
import { AxiosResponse } from "axios";
import SetReceiverDialog from "./set-receiver-dialog";

interface StockItem {
  alarmFlag: boolean;
  amount: number;
  key: string;
  productName: string;
  unit: string;
  attributes: any;
}

function Row(props: {
  row: StockItem;
  handleProductDeletion: (id: string) => Promise<AxiosResponse<any>>;
  handleSetReceiver: (
    id: string,
    receiver: string
  ) => Promise<AxiosResponse<any>>;
}) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDeleteion, setOpenDeleteion] = useState(false);
  const [openSetReceiver, setOpenSetReceiver] = useState(false);

  function handleSetAlert(id: string): Promise<AxiosResponse<any>> {
    const promise = productService.activateAlarmForProduct(id);
    promise.then((res) => (row.alarmFlag = true));
    return promise;
  }

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
        {row.alarmFlag ? (
          <div />
        ) : (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenAlert(true)}
            >
              <ReportProblem />
            </IconButton>
          </TableCell>
        )}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenDeleteion(true)}
          >
            <Delete />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenSetReceiver(true)}
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
      <ConfirmDialog
        title="Are your sure you want to delete this product?"
        handleClose={() => setOpenDeleteion(false)}
        handleSubmit={props.handleProductDeletion}
        open={openDeleteion}
        productId={row.key}
      />
      <ConfirmDialog
        title="Are your sure you want to start an alarm for this product?"
        handleClose={() => setOpenAlert(false)}
        handleSubmit={handleSetAlert}
        open={openAlert}
        productId={row.key}
      />
      <SetReceiverDialog
        handleClose={() => setOpenSetReceiver(false)}
        handleSubmit={props.handleSetReceiver}
        open={openSetReceiver}
        productId={row.key}
      />
    </React.Fragment>
  );
}

const ProductStock = () => {
  const [productState, setProductState] = useState<StockItem[]>([]);

  useEffect(() => {
    productService.productStock().then((res) => {
      let array: StockItem[] = [];
      res.data.map((element) => {
        array.push(JSON.parse(element));
      });
      setProductState(array);
    });
    return () => setProductState([]);
  }, []);

  function handleProductDeletion(id): Promise<AxiosResponse<any>> {
    const promise = productService.deleteProduct(id);
    promise.then((res) => {
      const filteredList: StockItem[] = productState.filter(
        (item) => id != item.key
      );
      setProductState(filteredList);
    });
    return promise;
  }

  function handleSetReceiver(
    id: string,
    receiver: string
  ): Promise<AxiosResponse<any>> {
    const promise = productService.sendProductToOutboxForReceiver(id, receiver);
    promise.then((res) => {
      const filteredList: StockItem[] = productState.filter(
        (item) => id != item.key
      );
      setProductState(filteredList);
    });
    return promise;
  }

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Key</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {productState.length != 0 ? (
            productState.map((product: StockItem) => (
              <Row
                key={product.key}
                row={product}
                handleProductDeletion={handleProductDeletion}
                handleSetReceiver={handleSetReceiver}
              />
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductStock;
