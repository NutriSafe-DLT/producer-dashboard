import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, useForm } from "../base/useForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import Controls from "../base/controls/Controls";
import DeliveryChart from "../charts/delivery";
import TrackingWidget from "./trackingwidget";
import logisticsService from "../services/logistics-service";
import { useRouter } from "next/router";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { ShipmentStatus } from "../../model";



interface ShipmentTrackingInfo {
  ID: string;
  privateDataCollection: string;
  status: ShipmentStatus;
}

const initialValues: ShipmentTrackingInfo = {
  ID: "",
  privateDataCollection: "",
  status: ShipmentStatus.NoData
};

const ShipmentTracking = () => {
  const classes = useStyles();
  const router = useRouter();

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ("ID" in fieldValues) {
      if (fieldValues.ID === "")
        tempErrors.username = "This field is required.";
      
    }
    if ("privateDataCollection" in fieldValues) {
      if (fieldValues.privateDataCollection === "")
        tempErrors.privateDataCollection = "This field is required.";
      // if doesnt match password guidelines, error
    }
    
    setErrors({
      ...tempErrors,
    });
    return Object.values(tempErrors).every((x) => x == "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    {ID: router.query.ID, privateDataCollection: router.query.privateDataCollection, status: ShipmentStatus.NoData},
    true,
    validate
  );

  const submitShipmentID = () => {
    if (!errors) {
      logisticsService
        .getShipment(values.ID, values.privateDataCollection)
        .then((res) => {

          router.push("/shipmenttracking", undefined, { shallow: false });
        });
    }
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
              <Controls.Input 
                name="ID" 
                label="Shipment ID" 
                onChange={handleInputChange}
                value={values.ID} 
                error={errors.ID}/>
              <Controls.Input 
                name="privateDataCollection" 
                label="Private Data Collection"
                onChange={handleInputChange} 
                value={values.privateDataCollection} 
                error={errors.privateDataCollection}/>
              <Controls.Button type="submit" text="Submit"/>
            </Form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <Typography>Status: </Typography>
          { values.status !== ShipmentStatus.NoData &&  
            <TrackingWidget showStatus={values.status}></TrackingWidget>
          }
          
        </Grid>
      </Grid>
      
    </div>
  );
};

export default ShipmentTracking;
