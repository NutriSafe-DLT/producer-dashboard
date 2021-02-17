import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AxiosResponse } from "axios";
import React from "react";
import Controls from "../base/controls/Controls";
import { useForm } from "../base/useForm";

export interface AddAttributeDefProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: (
    attributeName: string,
    attributeType: string
  ) => Promise<AxiosResponse>;
}

interface AttributeDefinition {
  attributeName: string;
  attributeType: string;
}

const initialValues: AttributeDefinition = {
  attributeName: "",
  attributeType: "",
};

export default function AddAttributeDefDialog({
  open,
  handleClose,
  handleSubmit,
}: AddAttributeDefProps) {
  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ("attributeName" in fieldValues) {
      tempErrors.attributeName = fieldValues.attributeName
        ? ""
        : "This field is required.";
    }
    if ("attributeType" in fieldValues) {
      tempErrors.attributeType = fieldValues.attributeType
        ? ""
        : "This field is required.";
    }
    setErrors({
      ...tempErrors,
    });

    return Object.values(tempErrors).every((x) => x == "");
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Create new attribute definition</DialogTitle>
      <DialogContent>
        <Controls.Input
          name="name"
          label="Attribute Name"
          value={values.attributeName}
          onChange={handleInputChange}
          error={errors.attributeName}
        />
        <Controls.Input
          name="type"
          label="Attribute Type"
          value={values.attributeType}
          onChange={handleInputChange}
          error={errors.attributeType}
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button
          onClick={() => {
            resetForm();
            handleClose();
          }}
          color="secondary"
          text="Cancel"
        />
        <Controls.WaitingButton
          onClick={() =>
            handleSubmit(values.attributeName, values.attributeType)
          }
          text="Create"
        />
      </DialogActions>
    </Dialog>
  );
}
