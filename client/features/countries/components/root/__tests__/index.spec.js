import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import wait from 'waait';
import Countries, { GET_ALL_COUNTRIES_QUERY, GET_CONTINENT_COUNTRIES_QUERY } from '..';

describe('Countries component', () => {
  const theme = {
    colors: {
      darkBlue: 'dark-blue',
      blue: 'blue',
      red: 'red',
      turquoise: 'turquoise',
    },
  };
  
  afterEach(cleanup);
  
  it('should render a link to the dashboard route if route code param is not passed', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: {} }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(container.querySelector('a[href="/dashboard"]')).toBeDefined();
  });
  
  it('should render a link to the continents route if route code param is passed', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: { code: 'AU' } }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(container.querySelector('a[href="/continents"]')).toBeDefined();
  });
  
  it('should render a loading message on query start', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: {} }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(getByText('Loading countries list...')).toBeDefined();
  });
  
  it('should render an error message on query fail', async () => {
    const mocks = [
      {
        request: {
          query: GET_ALL_COUNTRIES_QUERY,
        },
        result: {
          errors: [new GraphQLError('Loading error')],
        },
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: {} }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    expect(getByText(/Loading error/)).toBeDefined();
  });
  
  it('should render a list of countries on query success if no route code param is passed', async () => {
    const countries = [
      {
        name: 'Denmark',
        code: 'DK',
        native: 'Denmark',
        continent: {
          name: 'Europe',
        },
      },
      {
        name: 'Germany',
        code: 'DE',
        native: 'Germany',
        continent: {
          name: 'Europe',
        },
      },
    ];
    const mocks = [
      {
        request: {
          query: GET_ALL_COUNTRIES_QUERY,
        },
        result: {
          data: {
            countries,
          },
        },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: {} }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    for (let i = 0; i < countries.length; i += 1) {
      expect(
        container.querySelector(`a[href="/countries/${countries[i].code}"]`).innerHTML,
      ).toEqual(`${countries[i].name} (${countries[i].native}) - ${countries[i].continent.name}`);
    }
  });
  
  it('should render the continent name and a list of countries '
    + 'on query success if no route code param is passed', async () => {
    const countries = [
      {
        name: 'United Kingdom',
        code: 'UK',
        native: 'United Kingdom',
      },
      {
        name: 'France',
        code: 'FR',
        native: 'France',
      },
    ];
    const mocks = [
      {
        request: {
          query: GET_CONTINENT_COUNTRIES_QUERY,
          variables: {
            code: 'EU',
          },
        },
        result: {
          data: {
            continent: {
              name: 'Europe',
              code: 'EU',
              countries,
            },
          },
        },
      },
    ];
    const { container, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Countries
            theme={theme}
            match={{ params: { code: 'EU' } }}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
  
    expect(getByText('Europe')).toBeDefined();
    
    for (let i = 0; i < countries.length; i += 1) {
      expect(
        container.querySelector(`a[href="/countries/${countries[i].code}?continent=EU"]`).innerHTML,
      ).toEqual(`${countries[i].name} (${countries[i].native})`);
    }
  });
});
