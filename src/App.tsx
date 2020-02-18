import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Disqualification } from "./views/Disqualification";
import { Landing } from "./views/Landing";
import { NewAccount } from "./views/NewAccount";

export default function App() {
  /**
   * If this application were larger in scope Redux would
   * probably be a good choice for handling state management
   * across the application - however, due to the small scope,
   * a single hook is sufficient.
   */
  const [loanResponse, setLoanResponse] = useState<{
    [key: string]: string | boolean;
  } | null>(null);

  const handleSetLoanResponse = (response: {
    [key: string]: string | boolean;
  }) => {
    setLoanResponse(response);
  };

  return (
    <div className={"App"}>
      <Router basename="/">
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Landing
              loanResponse={loanResponse}
              handleSetLoanResponse={handleSetLoanResponse}
            />
          </Route>
          <Route path="/denied">
            <Disqualification loanResponse={loanResponse} />
          </Route>
          <Route path="/success">
            <NewAccount loanResponse={loanResponse} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
