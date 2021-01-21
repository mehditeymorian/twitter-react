import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import HomeAuth from "./components/HomeAuth";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Route path={"/home"} component={HomeAuth} />
            </div>
        </Router>
    );
}

export default hot(module)(App);
