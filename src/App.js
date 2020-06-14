import React from "react";
import "./styles.css";
import Login from "../src/pages/Login";
import Home from "./pages/Home";
import AlertComponent from "./components/alert";
import BookingPage from "./pages/bookingPage";
import Profile from "./pages/Profile";
import routes from "../src/Routes/routes";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Header from "./components/Header";
export default function App() {
  return (
    <div className="App">
      <AlertComponent />
      <Header />

      <Switch>
        <Route path={routes.login}>
          <Login />
        </Route>
        <Route path={routes.home}>
          <Home />
        </Route>
        <Route path={routes.profile}>
          <Profile />
        </Route>

        <Route path="/booking">
          <BookingPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
