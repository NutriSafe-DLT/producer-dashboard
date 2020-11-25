import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  handleClose: Function;
  handleSubmit: (id: string) => Promise<AxiosResponse>;
  productId: string;
}

const ConfirmDialog = ({
  open,
  title,
  handleClose,
  handleSubmit,
  productId,
}: ConfirmDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        {error ? (
          <DialogTitle style={{ backgroundColor: "lightpink" }}>
            Something went wrong
          </DialogTitle>
        ) : (
          <div />
        )}
        <DialogTitle>{title}</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={(e) => {
            handleSubmit(productId)
              .catch(() => setError(true))
              .then(() => setError(false))
              .finally(() => setLoading(false));
            setLoading(true);
          }}
        >
          {loading ? <CircularProgress color="primary" size={20} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
