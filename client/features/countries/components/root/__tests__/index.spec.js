import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import wait from 'waait';
import Countries, { GET_COUNTRIES_QUERY } from '..';

describe('Countries component', () => {
  afterEach(cleanup);
  
  it('should render a loading message on query start', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );
    
    expect(getByText('Loading countries list...')).toBeDefined();
  });
  
  it('should render an error message on query fail', async () => {
    const mocks = [
      {
        request: {
          query: GET_COUNTRIES_QUERY,
        },
        result: {
          errors: [new GraphQLError('Loading error')],
        },
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>,
    );
    await wait(0);
    
    expect(getByText(/Loading error/)).toBeDefined();
  });
  
  it('should render a list of countries on query success', async () => {
    const countries = [
      {
        name: 'Denmark',
        code: 'DK',
      },
      {
        name: 'Germany',
        code: 'DE',
      },
    ];
    const mocks = [
      {
        request: {
          query: GET_COUNTRIES_QUERY,
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
          <Countries />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    for (let i = 0; i < countries.length; i += 1) {
      expect(
        container.querySelector(`a[href="/countries/${countries[i].code}"]`).innerHTML,
      ).toEqual(countries[i].name);
    }
  });
});
