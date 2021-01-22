import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";


function App() {
    return (
        /*todo: auth and Main have route overlap*/
        <Router>
            <div className="App">
                <Route path={"/auth"} render={props=>( <Auth {...props} routes={[]} />)} />
                <Route path={"/"} render={props=>( <Main {...props} routes={[]} />)} />
            </div>
        </Router>
    );
}


export default hot(module)(App);
