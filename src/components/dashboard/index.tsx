import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles';
import GoodsChart from '../charts/goods';
import ProductionChart from '../charts/production';
import DeliveryChart from '../charts/delivery';

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.dashboardContainer} spacing={2}>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardContent>
                    Wareneingänge
                    <div className={classes.goods}>
                        <GoodsChart />
                    </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardContent>
                    Produktionsprozesse
                    <div className={classes.production}>
                        <ProductionChart />
                    </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined"> 
                    <CardContent>
                    Produktionsprozesse
                    <div className={classes.delivery}>
                        <DeliveryChart />
                    </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Dashboard;
