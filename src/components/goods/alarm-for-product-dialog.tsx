import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

export interface AlarmProductProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
  productId: String;
}

const AlarmProduct = ({
  open,
  handleClose,
  handleSubmit,
  productId,
}: AlarmProductProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <Typography variant="h2">
          Are your sure you want to start an alarm for this product?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={(e) =>
            handleSubmit(productId)
              .then(() => handleClose())
              .catch(() => alert("Something went wrong"))
          }
        >
          Alert
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmProduct;
