import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import Auth from "./components/Auth";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path={"/auth/:section"} component={Auth} />
                <Route exact path={"/:id"} component={Main} />
            </div>
        </Router>
    );
}

export default hot(module)(App);
