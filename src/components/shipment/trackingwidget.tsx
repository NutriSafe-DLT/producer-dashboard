import React from "react";
import { Grid, Typography, Input } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { ShipmentStatus } from "../../model";

interface StatusProps {
    showStatus: ShipmentStatus;
}

const TrackingWidget = (props:StatusProps) => {
    const classes = useStyles();
  
    
  
    return (
        <React.Fragment>
            <Grid container className={classes.dashboardContainer} spacing={2}>
            <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                  {props.showStatus === ShipmentStatus.OrderReceived && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>Auftrag eingegangen</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
              {props.showStatus === ShipmentStatus.Processing && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>In Bearbeitung</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
              {props.showStatus === ShipmentStatus.DeliveringToHub && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>Lieferung zum Hub</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
              {props.showStatus === ShipmentStatus.ReceivedAtHub && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>Im Hub angekommen</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
              {props.showStatus === ShipmentStatus.DeliveringToRecipient && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>In Zustellung</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
              {props.showStatus === ShipmentStatus.Delivered && 
                    <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                  }
                <Typography>Zugestellt</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default TrackingWidget;