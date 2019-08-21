// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
import type { Country } from 'types';

type Props ={
  match: {
    params: {
      code?: string,
    },
  },
}

type CountriesData = {|
  countries: Array<Country>,
|}

type ContinentData = {|
  code: string,
  name: string,
  continent: CountriesData,
|}

type ErrorData = {|
  message: string,
|}

type Response = ContinentData | CountriesData | ErrorData

type QueryVars = {
  code?: string,
}

export const GET_COUNTRIES_QUERY = gql`
  {
    countries {
      name,
      code
    }
  }
`;

export const GET_CONTINENT_COUNTRIES_QUERY = gql`
  query getContinent($code: String) {
    continent(code: $code) {
      countries {
        name,
        code
      }
    }
  }
`;

const renderLoading = () => (
  <span>Loading countries list...</span>
);

const renderError = (message?: String) => (
  Maybe.fromNull(message)
    .map((value) => (<span>{value}</span>))
    .orSome('')
);

const renderData = (list?: Array<Country>) => (
  Maybe.fromNull(list)
    .map((value) => (
      <ul>
        {value.map(({ name, code }) => (
          <li key={code}>
            <Link to={`/countries/${code}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    ))
    .orSome('')
);

const Countries = ({ match }: Props) => {
  const backLink = Maybe.fromNull(match.params.code)
    .fold('/dashboard')(
      () => '/continents',
    );
  
  const query = Maybe.fromNull(match.params.code)
    .fold([GET_COUNTRIES_QUERY])(
      (code) => [
        GET_CONTINENT_COUNTRIES_QUERY,
        { variables: { code } },
      ],
    );
  const { loading, error, data } = useQuery<Response, QueryVars>(...query);
  
  return (
    <div>
      <Link to={backLink}>
        Back
      </Link>
      {Maybe.fromFalsy(loading)
        .map(() => renderLoading())
        .orSome('')}
      {Maybe.fromNull(error)
        .map((value) => renderError(value.message))
        .orSome('')}
      {Maybe.fromNull(data)
        .map((value) => renderData(Maybe.fromNull(value.continent)
          .fold(value.countries)(
            (continent) => continent.countries,
          )))
        .orSome('')}
    </div>
  );
};

export default Countries;
