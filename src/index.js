import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./containers/App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const BasicRouting = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<BasicRouting />, document.getElementById("root"));
