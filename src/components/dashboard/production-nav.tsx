import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ProductionStep from "./production-step";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 10fr 1fr",
  },
}));

const ProductionNavigator = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary">
        <ArrowBackIosIcon />
      </Button>
      <ProductionStep></ProductionStep>
      <Button variant="outlined" color="primary">
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

export default ProductionNavigator;
