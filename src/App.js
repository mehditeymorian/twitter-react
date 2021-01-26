import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./components/Main";
import {connect} from "react-redux";


function App({userState}) {

    const logged = userState !== null;

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path={"/auth"}><Redirect to={"/auth/sign-in"}/></Route>
                    <Route path={"/auth/"}>{logged ? <Redirect to={"/"}/>: <Auth/>}</Route>
                    <Route path={`/`}>{logged ? <Main/> : <Redirect to={"/auth/sign-in"}/>}</Route>
                </Switch>
            </div>
        </Router>
    );
}

const mapStateToProp = state => ({
    userState: state.user
});

const mapActionsToProp = dispatch => ({});

export default hot(module)(connect(mapStateToProp, mapActionsToProp)(App));
