import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";
import Controls from "../base/controls/Controls";
import { SetReceiverDialogProps } from "./set-receiver-dialog.module";



const SetReceiverDialog = ({
  open,
  handleClose,
  handleSubmit,
  productId,
}: SetReceiverDialogProps) => {
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
        <Typography>Please specify the receiver</Typography>
      </DialogContent>
      <Controls.Input
        name="name"
        label="Receiver Name"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Cancel
        </Button>
        <Controls.WaitingButton
          onClick={() => handleSubmit(productId, receiver)}
          text="Confirm"
        />
      </DialogActions>
    </Dialog>
  );
};

export default SetReceiverDialog;
