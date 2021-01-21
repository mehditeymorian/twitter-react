import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Route path={"/auth"} component={Auth} />
            </div>
        </Router>
    );
}

export default hot(module)(App);
