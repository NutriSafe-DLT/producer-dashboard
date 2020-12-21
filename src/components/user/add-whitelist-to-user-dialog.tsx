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

export interface AddWhitelistToUserProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (any) => Promise<AxiosResponse>;
  username: string;
  userWhitelists: string[];
  allWhitelists: string[];
}

const AddWhitelistToUser = ({
  open,
  handleClose,
  handleSubmit,
  username,
  userWhitelists,
  allWhitelists,
}: AddWhitelistToUserProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [selectedWhitelist, setSelectedWhitelist] = React.useState("");

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
          Which whitelist do you want to add to {username}?
        </Typography>
        <TextField
          margin="dense"
          id="newAttribute"
          label="Attribute"
          fullWidth
          select
          onChange={(e) => setSelectedWhitelist(e.target.value + "")}
          value={selectedWhitelist}
          defaultValue=""
        >
          {allWhitelists
            .filter((all) => !userWhitelists.includes(all))
            .map((item) => {
              return (
                <MenuItem key={item + "key"} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          <option value="outside" />
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={(e) => {
            handleSubmit({ whitelist: selectedWhitelist, username })
              .catch(() => setError(true))
              .then(() => {
                setError(false);
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

export default AddWhitelistToUser;
