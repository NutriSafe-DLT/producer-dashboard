import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, MenuItem, Select } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

export interface AddProductDefProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
  attributes: string[];
}

export default function AddProductDefDialog({
  open,
  handleClose,
  handleSubmit,
  attributes,
}: AddProductDefProps) {
  const [productName, setProductName] = React.useState("");
  const [selectedAttributes, setSelectedAttributes] = React.useState([]);

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
          margin="dense"
          id="name"
          label="Product Name"
          type="text"
          fullWidth
          value={productName}
          required
          onChange={(e) => setProductName(e.target.value)}
        />
        {selectedAttributes.map((attribute) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                margin="dense"
                id={attribute}
                label="Attribute"
                fullWidth
                value={attribute}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton
                color="secondary"
                onClick={() =>
                  setSelectedAttributes([
                    ...selectedAttributes.filter((attr) => attr != attribute),
                  ])
                }
              >
                <Clear />
              </IconButton>
            </div>
          );
        })}
        <TextField
          margin="dense"
          id="newAttribute"
          label="Attribute"
          fullWidth
          select
          onChange={(e) =>
            setSelectedAttributes([...selectedAttributes, e.target.value])
          }
        >
          {attributes
            .filter((attr) => !selectedAttributes.includes(attr))
            .map((option) => {
              return (
                <MenuItem key={option + "flexible"} value={option}>
                  {option}
                </MenuItem>
              );
            })}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleSubmit(productName, selectedAttributes)
              .then(() => {
                handleClose();
                setProductName("");
                setSelectedAttributes([]);
              })
              .catch((err) => alert("Something went wrong"))
          }
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
