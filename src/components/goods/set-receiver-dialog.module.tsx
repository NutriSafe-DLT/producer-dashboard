import { AxiosResponse } from "axios";

export interface SetReceiverDialogProps {
    open: boolean;
    handleClose: Function;
    handleSubmit: (id: string, receiver: string) => Promise<AxiosResponse>;
    productId: string;
  }