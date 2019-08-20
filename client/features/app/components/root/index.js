// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { Switch, Route } from 'react-router';

type RouteProps = {
  key: string,
  exact: boolean,
  path?: string,
  component: ComponentType<any>,
}

type Props = {
  routes: Array<RouteProps>,
};

const App = ({ routes }: Props) => (
  <Switch>
    {routes.map(({
      key,
      path,
      exact,
      component,
    }) => (
      <Route
        key={key}
        path={path}
        exact={exact}
        component={component}
      />
    ))}
  </Switch>
);

export default App;
