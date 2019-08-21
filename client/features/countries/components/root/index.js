// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import type { Country } from '../../../../types';

type CountriesData = {|
  countries: Array<Country>,
|}

type ErrorData = {|
  message: string,
|}

type Response = CountriesData | ErrorData

export const GET_COUNTRIES_QUERY = gql`
  {
    countries {
      name,
      code
    }
  }
`;

const Countries = () => {
  const { loading, error, data } = useQuery<Response>(GET_COUNTRIES_QUERY);
  
  if (loading) {
    return <span>Loading countries list...</span>;
  }
  
  if (error) {
    return <span>{error.message}</span>;
  }
  
  return (
    <ul>
      {data.countries.map(({ name, code }) => (
        <li key={code}>
          <Link to={`/countries/${code}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
