import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { render, cleanup } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import wait from 'waait';
import Continents, { GET_CONTINENTS_QUERY } from '..';

describe('Continents component', () => {
  afterEach(cleanup);
  
  it('should render a loading message on query start', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Continents />
      </MockedProvider>,
    );

    expect(getByText('Loading continents list...')).toBeDefined();
  });
  
  it('should render an error message on query fail', async () => {
    const mocks = [
      {
        request: {
          query: GET_CONTINENTS_QUERY,
        },
        result: {
          errors: [new GraphQLError('Loading error')],
        },
      },
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Continents />
      </MockedProvider>,
    );
    await wait(0);
    
    expect(getByText(/Loading error/)).toBeDefined();
  });
  
  it('should render a list of continents on query success', async () => {
    const continents = [
      {
        name: 'EUROPE',
        code: 'EU',
      },
      {
        name: 'ASIA',
        code: 'AS',
      },
    ];
    const mocks = [
      {
        request: {
          query: GET_CONTINENTS_QUERY,
        },
        result: {
          data: {
            continents,
          },
        },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Continents />
        </MemoryRouter>
      </MockedProvider>,
    );
    await wait(0);
    
    for (let i = 0; i < continents.length; i += 1) {
      expect(
        container.querySelector(`a[href="/continents/${continents[i].code}"]`).innerHTML,
      ).toEqual(continents[i].name);
    }
  });
});
