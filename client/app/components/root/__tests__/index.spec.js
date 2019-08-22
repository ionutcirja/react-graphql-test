import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import App from '..';

const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

describe('App component', () => {
  const routes = [
    {
      key: 'dashboard',
      path: '/',
      exact: true,
      component: () => <span>dashboard</span>,
    },
    {
      key: 'countries',
      path: '/countries',
      component: () => <span>countries list</span>,
    },
  ];
  
  afterEach(cleanup);
  
  it('should render a dashboard route', () => {
    const { container } = renderWithRouter(<App routes={routes} />, {
      route: '/',
    });
    expect(container.innerHTML).toMatch('dashboard');
  });
  
  it('should render a countries route', () => {
    const { container } = renderWithRouter(<App routes={routes} />, {
      route: '/countries',
    });
    expect(container.innerHTML).toMatch('countries list');
  });
});
