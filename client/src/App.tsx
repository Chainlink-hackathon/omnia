import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import Web3 from "web3";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
