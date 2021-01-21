import {hot} from "react-hot-loader";
import React from "react";
import './App.css';
import HomeAuth from "./components/HomeAuth";

function App() {
  return (
    <div className="App">
      <HomeAuth />
    </div>
  );
}

export default hot(module)(App);
