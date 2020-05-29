import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './styles';

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.dashboardContainer}>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardContent>
                        Goods
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined">
                    <CardContent>
                        Production
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined"> 
                    <CardContent>
                        Delivery
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Dashboard;
