// @flow
import React from 'react';
import { withTheme } from 'styled-components';
import type { Theme } from 'types';
import { Nav, NavLink } from './style';

type Props = {
  theme: Theme,
}

const Dashboard = ({ theme }: Props) => (
  <Nav>
    <NavLink
      color={theme.colors.blue}
      to="/continents"
    >
      Continents
    </NavLink>
    <NavLink
      color={theme.colors.blue}
      to="/countries"
    >
      Countries
    </NavLink>
  </Nav>
);

export default withTheme(Dashboard);
