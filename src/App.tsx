import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Disqualification from "./views/Disqualification";
import Landing from "./views/Landing";
import NewAccount from "./views/NewAccount";

export default function App() {
  return (
    <Router basename="/">
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/denied">
          <Disqualification />
        </Route>
        <Route path="/success">
          <NewAccount />
        </Route>
      </Switch>
    </Router>
  );
}
