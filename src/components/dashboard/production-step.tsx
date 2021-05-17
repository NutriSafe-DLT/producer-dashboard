import React, { useState } from "react";
import BarChart from "../charts/basic-barchart";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
}));

const ProductionStep = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BarChart
        title="Zutaten"
        color="darkblue"
        flipped={true}
        xAxis={["Rohmilch", "Nussmischung", "Schnittlauch"]}
        yAxis={[90, 5, 3]}
      ></BarChart>
      <BarChart
        title="Endprodukt"
        color="lightblue"
        flipped={false}
        xAxis={["Weichkäse"]}
        yAxis={[100]}
      ></BarChart>
    </div>
  );
};

export default ProductionStep;
