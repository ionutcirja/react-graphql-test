import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import wait from 'waait';
import Country, { GET_COUNTRY_QUERY } from '..';

describe('Country component', () => {
  const theme = {
    colors: {
      darkBlue: 'dark-blue',
      blue: 'blue',
      red: 'red',
      turquoise: 'turquoise',
    },
  };
  
  afterEach(cleanup);
  
  it('should render a link to the countries route of location continent query param is not passed', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Country
            match={{ params: { code: 'DE' } }}
            location={{ search: '' }}
            theme={theme}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(container.querySelector('a[href="/countries"]')).toBeDefined();
  });
  
  it('should render a link to the continent route of location continent query param is passed', () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Country
            match={{ params: { code: 'DE' } }}
            location={{ search: '?continent=EU' }}
            theme={theme}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(container.querySelector('a[href="/continents/EU"]')).toBeDefined();
  });
  
  it('should render a loading message on query start', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <Country
            match={{ params: { code: 'DE' } }}
            location={{ search: '' }}
            theme={theme}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    
    expect(getByText('Loading country data...')).toBeDefined();
  });
  
  it('should render an error message on query fail', async () => {
    const mocks = [
      {
        request: {
          query: GET_COUNTRY_QUERY,
          variables: {
            code: 'DE',
          },
        },
        result: {
          errors: [new GraphQLError('Loading error')],
          data: {},
        },
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Country
            match={{ params: { code: 'DE' } }}
            location={{ search: '' }}
            theme={theme}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    expect(getByText(/Loading error/)).toBeDefined();
  });
  
  it('should render country data on query success', async () => {
    const country = {
      name: 'Denmark',
      code: 'DK',
      native: 'Danmark',
      phone: '45',
      currency: 'DKK',
      continent: {
        name: 'Europe',
      },
      languages: [
        {
          name: 'Danish',
          native: 'Dansk',
        },
      ],
    };
    
    const mocks = [
      {
        request: {
          query: GET_COUNTRY_QUERY,
          variables: {
            code: 'DK',
          },
        },
        result: {
          data: {
            country,
          },
        },
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Country
            match={{ params: { code: 'DK' } }}
            location={{ search: '' }}
            theme={theme}
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    expect(getByText(/Denmark/)).toBeDefined();
    expect(getByText(/Danmark/)).toBeDefined();
    expect(getByText(/45/)).toBeDefined();
    expect(getByText(/DKK/)).toBeDefined();
    expect(getByText(/Danish/)).toBeDefined();
    expect(getByText(/Dansk/)).toBeDefined();
  });
});
