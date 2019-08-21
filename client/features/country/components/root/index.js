// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Maybe } from 'monet';
import queryString from 'query-string';
import type { Country } from 'types';

type Props = {
  match: {
    params: {
      code?: string,
    },
  },
  location: {
    search: string,
  },
}

type CountryData = {|
  country: Country,
|}

type ErrorData = {|
  message: string,
|}

type Response = CountryData | ErrorData

type QueryVars = {
  code?: string,
}

export const GET_COUNTRY_QUERY = gql`
  query getCountry($code: String) {
    country(code: $code) {
      name,
      native,
      phone,
      continent {
        name
      },
      currency,
      languages {
        name,
        native
      }
    }
  }
`;

const renderLoading = () => (
  <span>Loading country data...</span>
);

const renderError = (message?: String) => (
  Maybe.fromNull(message)
    .map((value) => (<span>{value}</span>))
    .orSome('')
);

const renderData = ({
  name,
  native,
  continent,
  phone,
  currency,
  languages,
}: Country) => (
  <>
    <span>{name}</span>
    {Maybe.fromNull(native)
      .map((value) => (<span>{`Native name: ${value}`}</span>))
      .orSome('')}
    {Maybe.fromNull(continent)
      .map((value) => (<span>{`Continent: ${value.name}`}</span>))
      .orSome('')}
    {Maybe.fromNull(phone)
      .map((value) => (<span>{`Phone prefix: ${value}`}</span>))
      .orSome('')}
    {Maybe.fromNull(currency)
      .map((value) => (<span>{`Currency: ${value}`}</span>))
      .orSome('')}
    {Maybe.fromNull(languages)
      .map((value) => (
        <>
          <span>Languages</span>
          <ul>
            {value.map(({ name, native }) => ( // eslint-disable-line no-shadow
              <li key={name}>
                {`${name} (Native name: ${native})`}
              </li>
            ))}
          </ul>
        </>
      ))
      .orSome('')}
  </>
);

const CountryInfo = ({ match, location }: Props) => {
  const queries = queryString.parse(location.search);
  const backLink = Maybe.fromNull(queries.continent)
    .fold('/countries')(
      (value) => `/continents/${value}`,
    );
  
  const { loading, error, data } = useQuery<Response, QueryVars>(
    GET_COUNTRY_QUERY,
    { variables: { code: match.params.code } },
  );
  
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
        .map((value) => renderData({ ...value.country }))
        .orSome('')}
    </div>
  );
};

export default CountryInfo;
