import React from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./styles";
import GoodsChart from "../charts/goods";
import ProductionChart from "../charts/production";
import DeliveryChart from "../charts/delivery";
import ProgressCircle from "../charts/progress-circle";
import ProductionNavigator from "./production-nav";
import AddGoods from "../goods/add-goods";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.dashboardContainer} spacing={2}>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.goods}>
                <GoodsChart />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.production}>
                <ProductionChart />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <div className={classes.delivery}>
                <DeliveryChart />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <ProductionNavigator></ProductionNavigator>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <ProgressCircle
                title="Wareneingänge"
                subtitle="5 Tests"
                percentage={60}
              ></ProgressCircle>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <iframe
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=99220c97-8327-4561-b385-ba606e22d2db&autoAuth=true&ctid=2d219629-d97e-4adb-8072-3b982a4a49b5&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWdlcm1hbnktd2VzdC1jZW50cmFsLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Dashboard;
