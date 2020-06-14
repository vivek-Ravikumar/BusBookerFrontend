import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CurrentUserProvider from "./store/currentUserProvider";
import CurrentBusProvider from "./store/currentBusProvider";
import AlertProvider from "./store/alertProvider";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <CurrentUserProvider>
        <CurrentBusProvider>
          <Router>
            <App />
          </Router>
        </CurrentBusProvider>
      </CurrentUserProvider>
    </AlertProvider>
  </React.StrictMode>,
  rootElement
);
