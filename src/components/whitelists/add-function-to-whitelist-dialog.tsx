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

export interface AddFunctionToWhitelistProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (any) => Promise<AxiosResponse>;
  whitelist: string;
  funcs: string[];
}

const AddFunctionToWhitelist = ({
  open,
  handleClose,
  handleSubmit,
  whitelist,
  funcs,
}: AddFunctionToWhitelistProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [functionName, setFunctionName] = React.useState("");

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
        <Typography>
          Type a function that you want to add to {whitelist}?
        </Typography>
        <TextField
          margin="dense"
          id="func"
          label="Function"
          fullWidth
          onChange={(e) => setFunctionName(e.target.value + "")}
          value={functionName}
          defaultValue=""
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={(e) => {
            handleSubmit({ whitelist, func: functionName })
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

export default AddFunctionToWhitelist;
