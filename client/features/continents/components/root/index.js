// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
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

const renderLoading = () => (
  <span>Loading continents list...</span>
);

const renderError = (message?: String) => (
  Maybe.fromNull(message)
    .map((value) => (<span>{value}</span>))
    .orSome('')
);

const renderData = (list?: Array<Continent>) => (
  Maybe.fromNull(list)
    .map((value) => (
      <ul>
        {value.map(({ name, code }) => (
          <li key={code}>
            <Link to={`/continents/${code}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    ))
    .orSome('')
);

const Continents = () => {
  const { loading, error, data } = useQuery<Response>(GET_CONTINENTS_QUERY);
  
  return (
    <div>
      <Link to="/dashboard">
        Back
      </Link>
      {Maybe.fromFalsy(loading)
        .map(() => renderLoading())
        .orSome('')}
      {Maybe.fromNull(error)
        .map((value) => renderError(value.message))
        .orSome('')}
      {Maybe.fromNull(data)
        .map((value) => renderData(value.continents))
        .orSome('')}
    </div>
  );
};

export default Continents;
