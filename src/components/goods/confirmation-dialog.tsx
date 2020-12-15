import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  handleClose: Function;
  handleSubmit: (any) => Promise<AxiosResponse>;
  param: any;
}

const ConfirmDialog = ({
  open,
  title,
  handleClose,
  handleSubmit,
  param,
}: ConfirmDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Confirm Action</DialogTitle>
      <DialogContent>
        {error ? (
          <Typography style={{ backgroundColor: "lightpink" }}>
            Something went wrong
          </Typography>
        ) : (
          <div />
        )}
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={(e) => {
            handleSubmit(param)
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
