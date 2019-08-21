import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, cleanup } from '@testing-library/react';
import Dashboard from '..';

describe('Dashboard component', () => {
  const theme = {
    colors: {
      blue: 'blue',
    },
  };
  
  afterEach(cleanup);
  
  it('should render a link to the continents route', () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard theme={theme} />
      </MemoryRouter>,
    );
  
    expect(container.querySelector('a[href="/continents"]')).toBeDefined();
  });
  
  it('should render a link to the countries route', () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard theme={theme} />
      </MemoryRouter>,
    );

    expect(container.querySelector('a[href="/countries"]')).toBeDefined();
  });
});
