import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from "./SignUp";
import {AuthStyle} from "./AuthStyle";
import {connect} from "react-redux";



function Auth({userState}) {
    const classes = AuthStyle();
    let {url} = useRouteMatch();
    let logged = userState !== null;

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Switch>
                    <Route path={`${url}/sign-in`}>{logged ? <Redirect to={"/home"} /> : <SignIn />}</Route>
                    <Route path={`${url}/sign-up`}>{logged ? <Redirect to={"/home"} /> : <SignUp />}</Route>
                </Switch>

            </Grid>
        </Grid>
    );
}

const mapStateToProp = state => ({
    userState: state.user
});

const mapActionsToProp = dispatch => ({
});

export default connect(mapStateToProp,mapActionsToProp)(Auth);