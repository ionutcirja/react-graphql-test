// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import type { Theme } from 'types';
import {
  CONTINENTS_ROUTE,
  COUNTRIES_ROUTE,
} from 'routes';
import { Nav, NavLink } from './style';

type Props = {
  theme: Theme,
}

const Dashboard = ({ theme }: Props) => (
  <Nav>
    <NavLink
      color={theme.colors.blue}
      to={CONTINENTS_ROUTE}
    >
      Continents
    </NavLink>
    <NavLink
      color={theme.colors.blue}
      to={COUNTRIES_ROUTE}
    >
      Countries
    </NavLink>
  </Nav>
);

export default withTheme(Dashboard);
