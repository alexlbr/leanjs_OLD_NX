import React from "react";
import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";

import HomePage from "./HomePage";
import FeedbackRoutes from "./Feedback/Routes";
import NotFound from "./NotFound";

import VideoPlayer from "./VideoPlayer";

const Routes = () => {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={HomePage} />
      <Route path={`${match.url}/feedback`} component={FeedbackRoutes} />
      <Route path="/test" render={() => <VideoPlayer />} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
