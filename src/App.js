import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./components/Main";


function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                <Route path={"/auth/"} render={props=>( <Auth {...props} routes={[]} />)} />
                <Route path={`/`} render={props=>( <Main {...props} routes={[]} />)} />
                </Switch>
            </div>
        </Router>
    );
}


export default hot(module)(App);
