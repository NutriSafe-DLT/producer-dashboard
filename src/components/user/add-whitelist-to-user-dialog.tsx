import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import Controls from "../base/controls/Controls";
import { Option } from "../base/controls/Option";

export interface AddWhitelistToUserDialogProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (any) => Promise<AxiosResponse>;
  username: string;
  userWhitelists: string[];
  allWhitelists: string[];
}

const AddWhitelistToUserDialog = ({
  open,
  handleClose,
  handleSubmit,
  username,
  userWhitelists,
  allWhitelists,
}: AddWhitelistToUserDialogProps) => {
  const [selectedWhitelist, setSelectedWhitelist] = React.useState("");
  const [whitelistOptions, setWhitelistOptions] = React.useState<Option[]>([]);

  useEffect(() => {
    const options: Option[] = [];
    allWhitelists
      .filter((element) => !userWhitelists.includes(element))
      .map((element) => options.push({ id: element, title: element }));
    setWhitelistOptions(options);
  }, []);

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>
        Which whitelist do you want to link to {username}?
      </DialogTitle>
      <DialogContent>
        <Controls.Select
          name="whitelistName"
          options={whitelistOptions}
          error=""
          label="Whitelist"
          onChange={(e) => setSelectedWhitelist(e.target.value)}
          value={selectedWhitelist}
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button onClick={() => handleClose()} color="secondary">
          Cancel
        </Controls.Button>
        <Controls.WaitingButton
          onClick={() =>
            handleSubmit({ whitelist: selectedWhitelist, username })
          }
          text="Add"
        ></Controls.WaitingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddWhitelistToUserDialog;
