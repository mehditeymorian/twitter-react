import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./components/Main";
import {connect} from "react-redux";
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from "@material-ui/core";
import {isStatePresent} from "./redux/stateUtils";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#D63230",
        },
        secondary: {
            main: "#88D5E7",
        },
    },
});

function App({userState}) {

    const logged = isStatePresent(userState);

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path={"/auth"}><Redirect to={"/auth/sign-in"}/></Route>
                        <Route path={"/auth/"}>{logged ? <Redirect to={"/"}/> : <Auth/>}</Route>
                        <Route path={`/`}><Main/></Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

const mapStateToProp = state => ({
    userState: state.user
});

const mapActionsToProp = dispatch => ({});

export default hot(module)(connect(mapStateToProp, mapActionsToProp)(App));
