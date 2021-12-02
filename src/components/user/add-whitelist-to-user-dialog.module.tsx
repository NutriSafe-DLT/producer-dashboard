import { AxiosResponse } from "axios";

export interface AddWhitelistToUserDialogProps {
    open: boolean;
    handleClose: Function;
    handleSubmit: (any) => Promise<AxiosResponse>;
    username: string;
    userWhitelists: string[];
    allWhitelists: string[];
  }