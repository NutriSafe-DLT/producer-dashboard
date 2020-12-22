import { Grid } from "@material-ui/core";
import React from "react";
import Controls from "../../src/components/base/controls/Controls";
import { Form, useForm } from "../../src/components/base/useForm";

export interface ShippingOrder {
  id: number;
  sender: string;
  recipient: string;
  client: string;
  positionNumber: string;
  valueOfGoods: string;
  dangerousGoodId: string;
  dimensions: string;
}

const initialValues: ShippingOrder = {
  id: 0,
  sender: "",
  recipient: "",
  client: "",
  positionNumber: "",
  valueOfGoods: "",
  dangerousGoodId: "",
  dimensions: "",
};

const ShippingOrderForm = () => {
  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ("sender" in fieldValues) {
      tempErrors.sender = fieldValues.sender ? "" : "This field is required.";
    }
    if ("positionNumber" in fieldValues) {
      tempErrors.positionNumber = /^\d*$/.test(fieldValues.positionNumber)
        ? ""
        : "This field must me numeric.";
    }
    setErrors({
      ...tempErrors,
    });

    return Object.values(tempErrors).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(values));
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Sender"
            name="sender"
            onChange={handleInputChange}
            value={values.sender}
            error={errors.sender}
          />
          <Controls.Input
            label="Recipient"
            name="recipient"
            onChange={handleInputChange}
            value={values.recipient}
            error={errors.recipient}
          />
          <Controls.Input
            label="Client"
            name="client"
            onChange={handleInputChange}
            value={values.client}
            error={errors.client}
          />
          <Controls.Input
            label="Position Number"
            name="positionNumber"
            onChange={handleInputChange}
            value={values.positionNumber}
            error={errors.positionNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Value of Goods"
            name="valueOfGoods"
            onChange={handleInputChange}
            value={values.valueOfGoods}
            error={errors.valueOfGoods}
          />
          <Controls.Input
            label="Dangerous Good Identifier"
            name="dangerousGoodId"
            onChange={handleInputChange}
            value={values.dangerousGoodId}
            error={errors.dangerousGoodId}
          />
          <Controls.Input
            label="Dimensions"
            name="dimensions"
            onChange={handleInputChange}
            value={values.dimensions}
            error={errors.dimensions}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ShippingOrderForm;
