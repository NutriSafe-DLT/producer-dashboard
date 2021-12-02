import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AxiosResponse } from "axios";
import React from "react";
import Controls from "../base/controls/Controls";

export interface AddAttributeDefProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (
    attributeName: string,
    attributeType: string
  ) => Promise<AxiosResponse>;
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
        <Controls.Input
          name="name"
          label="Attribute Name"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
        />
        <Controls.Input
          name="type"
          label="Attribute Type"
          value={attributeType}
          onChange={(e) => setAttributeType(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button
          onClick={() => handleClose()}
          color="secondary"
          text="Cancel"
        />
        <Controls.WaitingButton
          onClick={() => handleSubmit(attributeName, attributeType)}
          text="Create"
        />
      </DialogActions>
    </Dialog>
  );
}
