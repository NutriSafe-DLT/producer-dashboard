import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Controls from "./controls/Controls";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
}));

interface ConfirmDialogProps {
  confirmDialog: ConfirmDialogObj;
  setConfirmDialog;
}

export interface ConfirmDialogObj {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onConfirm: () => void;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
