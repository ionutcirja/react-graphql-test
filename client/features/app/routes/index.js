import Dashboard from '../../dashboard/components/root';
import Continents from '../../continents/components/root';
import Continent from '../../continent/components/root';
import Countries from '../../countries/components/root';
import Country from '../../country/components/root';

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
    component: Continents,
  },
  {
    key: 'continent',
    path: '/continent/:id',
    component: Continent,
  },
  {
    key: 'countries',
    path: '/countries',
    component: Countries,
  },
  {
    key: 'country',
    path: '/countries/:id',
    component: Country,
  },
  {
    key: 'not-found',
    component: Dashboard,
  },
];
