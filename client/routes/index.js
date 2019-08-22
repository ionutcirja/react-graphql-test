import Dashboard from 'features/dashboard/components/root';
import Continents from 'features/continents/components/root';
import Countries from 'features/countries/components/root';
import Country from 'features/country/components/root';

export const DASHBOARD_ROUTE = '/';
export const CONTINENTS_ROUTE = '/continents';
export const COUNTRIES_ROUTE = '/countries';

export const CONTINENT_QUERY_PARAM = 'continent';

export default [
  {
    key: 'dashboard',
    path: DASHBOARD_ROUTE,
    exact: true,
    component: Dashboard,
  },
  {
    key: 'continents',
    path: CONTINENTS_ROUTE,
    exact: true,
    component: Continents,
  },
  {
    key: 'continent',
    path: `${CONTINENTS_ROUTE}/:code`,
    component: Countries,
  },
  {
    key: 'countries',
    path: COUNTRIES_ROUTE,
    exact: true,
    component: Countries,
  },
  {
    key: 'country',
    path: `${COUNTRIES_ROUTE}/:code`,
    component: Country,
  },
  {
    key: 'not-found',
    component: Dashboard,
  },
];
