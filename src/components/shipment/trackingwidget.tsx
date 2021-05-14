import React from "react";
import { Grid, Typography, Input } from "@material-ui/core";
import { Form, useForm } from "../base/useForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import Controls from "../base/controls/Controls";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';


const TrackingWidget = () => {
    const classes = useStyles();
  
    
  
    return (
        <React.Fragment>
            <Grid container className={classes.dashboardContainer} spacing={2}>
            <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <Typography>Auftrag eingegangen</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <Typography>In Bearbeitung</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <LocalShippingIcon fontSize="large"></LocalShippingIcon>
                <Typography>Lieferung zum Hub</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <Typography>Im Hub angekommen</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <Typography>In Zustellung</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
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