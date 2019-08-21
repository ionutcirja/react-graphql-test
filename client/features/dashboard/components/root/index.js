// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <nav>
    <Link to="/continents">
      Continents
    </Link>
    <Link to="/countries">
      Countries
    </Link>
  </nav>
);

export default Dashboard;
