import { Typography } from "@material-ui/core";
import * as React from "react";
import Controls from "../base/controls/Controls";
import { Form } from "../base/useForm";

const BasicProductForm = (props) => {
  const {
    setSelectedProduct,
    productOptions,
    unitOptions,
    values,
    errors,
    handleInputChange,
  } = props;

  return (
    <>
      <Typography component="h1" variant="h5">
        Basic information
      </Typography>
      <Form>
        <Controls.Select
          label="Product"
          name="product"
          options={productOptions}
          onChange={(e) => {
            handleInputChange(e);
            setSelectedProduct(e.target.value);
          }}
          value={values.product}
          error={errors.product}
        />
        <Controls.Input
          label="ID"
          name="id"
          onChange={handleInputChange}
          value={values.id}
          error={errors.id}
        />
        <Controls.Input
          label="Predeccessor"
          name="pdc"
          onChange={handleInputChange}
          value={values.pdc}
          error={errors.pdc}
        />
        <Controls.Input
          label="Amount"
          name="amount"
          onChange={handleInputChange}
          value={values.amount}
          error={errors.amount}
        />
        <Controls.Select
          label="Unit"
          name="unit"
          options={unitOptions}
          onChange={handleInputChange}
          value={values.unit}
          error={errors.unit}
        />
      </Form>
    </>
  );
};

export default BasicProductForm;
