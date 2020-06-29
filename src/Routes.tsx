import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TrackerPage from './Routes/TrackerRoute';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <TrackerPage />
      </Route>
    </Switch>
  );
}
