// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { Switch, Route } from 'react-router';
import { Wrapper } from './style';

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
  <Wrapper>
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
  </Wrapper>
);

export default App;
