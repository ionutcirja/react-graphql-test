import Dashboard from 'features/dashboard/components/root';
import Continents from 'features/continents/components/root';
import Countries from 'features/countries/components/root';
import Country from 'features/country/components/root';

export default [
  {
    key: 'dashboard',
    path: '/',
    exact: true,
    component: Dashboard,
  },
  {
    key: 'continents',
    path: '/continents',
    exact: true,
    component: Continents,
  },
  {
    key: 'continent',
    path: '/continents/:code',
    component: Countries,
  },
  {
    key: 'countries',
    path: '/countries',
    exact: true,
    component: Countries,
  },
  {
    key: 'country',
    path: '/countries/:code',
    component: Country,
  },
  {
    key: 'not-found',
    component: Dashboard,
  },
];
