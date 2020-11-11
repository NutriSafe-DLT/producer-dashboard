import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

export interface AddAttributeDefProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
}

export default function AddAttributeDefDialog({
  open,
  handleClose,
  handleSubmit,
}: AddAttributeDefProps) {
  const [attributeName, setAttributeName] = React.useState("");
  const [attributeType, setAttributeType] = React.useState("");

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Attribute Name"
          type="text"
          fullWidth
          value={attributeName}
          required
          onChange={(e) => setAttributeName(e.target.value)}
        />

        <TextField
          autoFocus
          margin="normal"
          id="type"
          label="Attribute Type"
          type="text"
          fullWidth
          value={attributeType}
          required
          onChange={(e) => setAttributeType(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit(attributeName, attributeType)
              .then(() => {
                handleClose();
                setAttributeName("");
                setAttributeType("");
              })
              .catch((err) => alert("Something went wrong"));
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
