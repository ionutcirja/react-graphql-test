// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import type { Continent } from 'types';

type ContinentsData = {|
  continents: Array<Continent>,
|}

type ErrorData = {|
  message: string,
|}

type Response = ContinentsData | ErrorData

export const GET_CONTINENTS_QUERY = gql`
  {
    continents {
      name,
      code
    }
  }
`;

const Continents = () => {
  const { loading, error, data } = useQuery<Response>(GET_CONTINENTS_QUERY);
  
  if (loading) {
    return <span>Loading continents list...</span>;
  }
  
  if (error) {
    return <span>{error.message}</span>;
  }
  
  return (
    <ul>
      {data.continents.map(({ name, code }) => (
        <li key={code}>
          <Link to={`/continents/${code}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Continents;
