import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React from "react";

export interface SetReceiverDialogProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (id: string, receiver: string) => Promise<AxiosResponse>;
  productId: string;
}

const SetReceiverDialog = ({
  open,
  handleClose,
  handleSubmit,
  productId,
}: SetReceiverDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [receiver, setReceiver] = React.useState("");
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Confirm receiver</DialogTitle>
      <DialogContent>
        {error ? (
          <Typography style={{ backgroundColor: "lightpink" }}>
            Something went wrong
          </Typography>
        ) : (
          <div />
        )}
        <Typography>Please specify the receiver</Typography>
      </DialogContent>
      <TextField
        autoFocus
        variant="filled"
        id="name"
        label="Receiver Name"
        type="text"
        value={receiver}
        required
        onChange={(e) => setReceiver(e.target.value)}
      />
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={(e) => {
            handleSubmit(productId, receiver)
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

export default SetReceiverDialog;
