import { AxiosResponse } from "axios";
import { AttributeDefinition } from "../../model";

export interface AddAttributeDefProps {
    open: boolean;
    handleClose: Function;
    handleSubmit: (
      attributeDefinition: AttributeDefinition
    ) => Promise<AxiosResponse>;
  }