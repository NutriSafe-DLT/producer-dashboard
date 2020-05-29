import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Dashboard from '../dashboard';
import Header from '../header';

const Home = () => {
    const classes = useStyles();
    return(
        <Grid container justify="center">
            <Grid item className={classes.homeContainer}>
                <div className={classes.header}>
                    <Header />
                </div>
                <Dashboard />
            </Grid>
        </Grid>
    )
};

export default Home;
