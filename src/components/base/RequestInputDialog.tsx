import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Controls from "./controls/Controls";
import { RequestInputDialogProps } from "./RequestInputDialog.module";

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

export default function RequestInputDialog(props: RequestInputDialogProps) {
  const { requestInputData, setInputData } = props;
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputData({...requestInputData, companyName: event.target.value
    });
  };
  return (
    <Dialog open={requestInputData.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{requestInputData.title}</Typography>
        <Typography variant="subtitle2">{requestInputData.subtitle}</Typography>
        <TextField id="standard-basic" label="Target company:" required={ true } value={requestInputData.companyName} onChange={handleInputChange}/>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setInputData({ ...requestInputData, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="secondary"
          onClick={() => {requestInputData.onConfirm(); setInputData({ ...requestInputData, isOpen: false }) } }
        />
      </DialogActions>
    </Dialog>
  );
}
