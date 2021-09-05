import { Switch, Route } from "react-router-dom";
import React from "react";

import Wall from "./pages/Wall";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/wall" component={Wall} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
