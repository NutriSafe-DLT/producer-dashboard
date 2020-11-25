import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  handleClose: Function;
  handleSubmit: Function;
  productId: String;
}

const ConfirmDialog = ({
  open,
  title,
  handleClose,
  handleSubmit,
  productId,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) =>
            handleSubmit(productId)
              .then(() => handleClose())
              .catch(() => alert("Something went wrong"))
          }
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
