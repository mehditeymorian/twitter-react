import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from "./SignUp";
import {AuthStyle} from "./AuthStyle";



export default function Auth() {
    const classes = AuthStyle();
    const {url} = useRouteMatch();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <Switch>
                    <Route exact path={`${url}/sign-up`} component={SignUp} />
                    <Route path={`${url}/sign-in`} component={SignIn}/>
                </Switch>

            </Grid>
        </Grid>
    );
}