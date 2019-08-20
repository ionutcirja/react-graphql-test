import Dashboard from '../../dashboard/components/root';
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
