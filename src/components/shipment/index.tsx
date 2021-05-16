import React from "react";
import { Grid, Typography, Input } from "@material-ui/core";
import { Form, useForm } from "../base/useForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import Controls from "../base/controls/Controls";
import DeliveryChart from "../charts/delivery";
import TrackingWidget from "./trackingwidget";


const ShipmentTracking = () => {
  const classes = useStyles();

  const submitShipmentID = () => {
    //if (!errors) {
      //TBD!
    //}
  };

  return (
    <div>
      <Grid container className={classes.dashboardContainer} spacing={2}>
        <Grid item xs={12}>
          <Card variant="elevation">
            <CardContent>
              <div className={classes.goods}>
                <Typography align="center">Lieferstatus</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="elevation">
            <CardContent>
            <Typography component="h1" variant="h5">
              Shipment data:
            </Typography>
            <Form onSubmit={submitShipmentID}>
              <Controls.Input name="ID" label="Shipment ID"></Controls.Input>
              <Controls.Input name="PDC" label="Private Data Collection"></Controls.Input>
              <Controls.Button type="submit" text="Submit"/>
            </Form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography>Status: </Typography>
          <TrackingWidget></TrackingWidget>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ShipmentTracking;
