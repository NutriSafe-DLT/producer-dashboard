import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Controls from "../../src/components/base/controls/Controls";
import { Form, useForm } from "../../src/components/base/useForm";

export interface ShippingOrder {
  id: number;
  senderName: string;
  senderStreet: string;
  senderHouseNumber: string;
  senderPostCode: string;
  senderCity: string;
  senderIsClient: boolean;
  recipientName: string;
  recipientStreet: string;
  recipientHouseNumber: string;
  recipientPostCode: string;
  recipientCity: string;
  recipientIsClient: boolean;
  positionNumber: number | string;
  specialRemarks: string;
  valueOfGoodsInEuro: number | string;
  adrNumber: number | string;
  adrClass: string;
  adrLetter: string;
  adr: string;
  length: number | string;
  height: number | string;
  width: number | string;
  letters: string;
  amount: number | string;
  typeOfPackaging: string;
  content: string;
  weightInKg: number | string;
  postageRegulationFree: boolean;
  transportInsurance: boolean;
}

const initialValues: ShippingOrder = {
  id: 0,
  senderName: "",
  senderStreet: "",
  senderHouseNumber: "",
  senderPostCode: "",
  senderCity: "",
  senderIsClient: false,
  recipientName: "",
  recipientStreet: "",
  recipientHouseNumber: "",
  recipientPostCode: "",
  recipientCity: "",
  recipientIsClient: false,
  positionNumber: "",
  specialRemarks: "",
  valueOfGoodsInEuro: "",
  adrNumber: "",
  adrClass: "",
  adrLetter: "",
  adr: "",
  length: "",
  height: "",
  width: "",
  letters: "",
  amount: "",
  typeOfPackaging: "",
  content: "",
  weightInKg: "",
  postageRegulationFree: false,
  transportInsurance: false,
};

const ShippingOrderForm = () => {
  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    const requiredFields = [
      "senderName",
      "senderStreet",
      "senderHouseNumber",
      "senderPostCode",
      "senderCity",
      "recipientName",
      "recipientStreet",
      "recipientHouseNumber",
      "recipientPostCode",
      "recipientCity",
      "positionNumber",
    ];
    requiredFields.map((field) => {
      if (field in fieldValues) {
        tempErrors[field] = fieldValues[field] ? "" : "This field is required.";
      }
    });
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
          <Typography variant="h6">Sender Information</Typography>
          <Controls.Input
            label="Name"
            name="senderName"
            onChange={handleInputChange}
            value={values.senderName}
            error={errors.senderName}
          />
          <Controls.Input
            label="Street"
            name="senderStreet"
            onChange={handleInputChange}
            value={values.senderStreet}
            error={errors.senderStreet}
          />
          <Controls.Input
            label="House Nr."
            name="senderHouseNumber"
            onChange={handleInputChange}
            value={values.senderHouseNumber}
            error={errors.senderHouseNumber}
          />
          <Controls.Input
            label="Post Code"
            name="senderPostCode"
            onChange={handleInputChange}
            value={values.senderPostCode}
            error={errors.senderPostCode}
          />
          <Controls.Input
            label="City"
            name="senderCity"
            onChange={handleInputChange}
            value={values.senderCity}
            error={errors.senderCity}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Recipient Information</Typography>
          <Controls.Input
            label="Name"
            name="recipientName"
            onChange={handleInputChange}
            value={values.recipientName}
            error={errors.recipientName}
          />
          <Controls.Input
            label="Street"
            name="recipientStreet"
            onChange={handleInputChange}
            value={values.recipientStreet}
            error={errors.recipientStreet}
          />
          <Controls.Input
            label="House Nr."
            name="recipientHouseNumber"
            onChange={handleInputChange}
            value={values.recipientHouseNumber}
            error={errors.recipientHouseNumber}
          />
          <Controls.Input
            label="Post Code"
            name="recipientPostCode"
            onChange={handleInputChange}
            value={values.recipientPostCode}
            error={errors.recipientPostCode}
          />
          <Controls.Input
            label="City"
            name="recipientCity"
            onChange={handleInputChange}
            value={values.recipientCity}
            error={errors.recipientCity}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Who is client?</Typography>
          <Controls.Checkbox
            label="Sender"
            name={values.senderIsClient}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            label="Recipient"
            name={values.recipientIsClient}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Controls.Input
            label="Position Nr."
            name="positionNumber"
            onChange={handleInputChange}
            value={values.positionNumber}
            error={errors.positionNumber}
          />
        </Grid>
        <Grid item xs={7}>
          <Controls.Input
            label="Special Remarks"
            name="specialRemarks"
            onChange={handleInputChange}
            value={values.specialRemarks}
            error={errors.specialRemarks}
          />
        </Grid>
        <Grid item container xs={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Value of the goods in €</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controls.Input
              label="Value of goods"
              name="valueOfGoodsInEuro"
              onChange={handleInputChange}
              value={values.valueOfGoodsInEuro}
              error={errors.valueOfGoodsInEuro}
            />
          </Grid>
        </Grid>
        <Grid item container xs={4}>
          <Grid item xs={12}>
            <Typography variant="h6">Dangerous Goods</Typography>
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              label="ADR Class"
              name="adrClass"
              onChange={handleInputChange}
              value={values.adrClass}
              error={errors.adrClass}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              label="ADR Letter"
              name="adrLetter"
              onChange={handleInputChange}
              value={values.adrLetter}
              error={errors.adrLetter}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              label="ADR Number"
              name="adrNumber"
              onChange={handleInputChange}
              value={values.adrNumber}
              error={errors.adrNumber}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              label="ADR"
              name="ADR"
              onChange={handleInputChange}
              value={values.ADR}
              error={errors.ADR}
            />
          </Grid>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Typography variant="h6">Measurements</Typography>
          </Grid>
          <Grid item xs={4}>
            <Controls.Input
              label="Length"
              name="length"
              onChange={handleInputChange}
              value={values.length}
              error={errors.length}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Input
              label="Height"
              name="height"
              onChange={handleInputChange}
              value={values.height}
              error={errors.height}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Input
              label="Width"
              name="width"
              onChange={handleInputChange}
              value={values.width}
              error={errors.width}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Controls.Input
            label="Letters"
            name="letters"
            onChange={handleInputChange}
            value={values.letters}
            error={errors.letters}
          />
        </Grid>
        <Grid item xs={2}>
          <Controls.Input
            label="Amount"
            name="amount"
            onChange={handleInputChange}
            value={values.amount}
            error={errors.amount}
          />
        </Grid>
        <Grid item xs={2}>
          <Controls.Input
            label="Type of Packaging"
            name="typeOfPackaging"
            onChange={handleInputChange}
            value={values.typeOfPackaging}
            error={errors.typeOfPackaging}
          />
        </Grid>
        <Grid item xs={2}>
          <Controls.Input
            label="Content"
            name="content"
            onChange={handleInputChange}
            value={values.content}
            error={errors.content}
          />
        </Grid>
        <Grid item xs={3}>
          <Controls.Input
            label="Weight"
            name="weightInKg"
            onChange={handleInputChange}
            value={values.weightInKg}
            error={errors.weightInKg}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            label="Postage regulation for free?"
            name="postageRegulationFree"
            onChange={handleInputChange}
            value={values.postageRegulationFree}
            error={errors.postageRegulationFree}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            label="Do you need transport insurance?"
            name="transportInsurance"
            onChange={handleInputChange}
            value={values.transportInsurance}
            error={errors.transportInsurance}
          />
        </Grid>
        <div>
          <Controls.Button type="submit" text="Submit" />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
};

export default ShippingOrderForm;
