import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import Controls from "../base/controls/Controls";

export interface AddFunctionToWhitelistProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (any) => Promise<AxiosResponse>;
  whitelist: string;
}

const AddFunctionToWhitelist = ({
  open,
  handleClose,
  handleSubmit,
  whitelist,
}: AddFunctionToWhitelistProps) => {
  const [functionName, setFunctionName] = React.useState("");

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Add function to whitelist</DialogTitle>
      <DialogContent>
        <Typography>
          Type a function that you want to add to {whitelist}?
        </Typography>
        <Controls.Input
          label="Function"
          name="function"
          onChange={(e) => setFunctionName(e.target.value)}
          value={functionName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Controls.WaitingButton
          onClick={() => handleSubmit({ whitelist, func: functionName })}
          text="Confirm"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddFunctionToWhitelist;
