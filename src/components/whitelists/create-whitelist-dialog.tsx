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

export interface AddFunctionToWhitelistProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (string) => Promise<AxiosResponse>;
  whitelists: string[];
}

const AddFunctionToWhitelist = ({
  open,
  handleClose,
  handleSubmit,
  whitelists,
}: AddFunctionToWhitelistProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [whitelistName, setWhitelistName] = React.useState("");

  const validateWhitelist = (whitelist: string) => {
    if (whitelists.includes(whitelist)) {
      setError("This whitelist is already in use! Choose a different one");
    } else {
      setError("");
    }
  };

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
            {error}
          </Typography>
        ) : (
          <div />
        )}
        <Typography>What is the name of the new whitelist?</Typography>
        <TextField
          margin="dense"
          id="func"
          label="Whitelist"
          fullWidth
          onChange={(e) => {
            validateWhitelist(e.target.value);
            setWhitelistName(e.target.value + "");
          }}
          value={whitelistName}
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
            handleSubmit(whitelistName)
              .catch(() => setError("Something went wrong"))
              .then(() => {
                setError("");
                handleClose();
              })
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
