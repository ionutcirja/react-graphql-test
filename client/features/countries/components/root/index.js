/* eslint-disable react/require-default-props */
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
  continent: CountriesData & {
    name: string,
  },
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
      code,
      native,
      continent {
        name
      }
    }
  }
`;

export const GET_CONTINENT_COUNTRIES_QUERY = gql`
  query getContinent($code: String) {
    continent(code: $code) {
      name,
      countries {
        name,
        code,
        native
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

type RenderData = {
  cname?: string,
  list?: Array<Country>,
}

const renderData = ({ list, cname }: RenderData) => (
  <>
    {Maybe.fromNull(cname)
      .map((value) => (
        <span>{value}</span>
      ))
      .orSome('')}
    {Maybe.fromNull(list)
      .map((value) => (
        <ul>
          {value.map(({
            name,
            code,
            native,
            continent,
          }) => (
            <li key={code}>
              <Link to={`/countries/${code}`}>
                {Maybe.fromNull(continent)
                  .fold(`${name} (${native})`)(
                    (cvalue) => `${name} (${native}) - ${cvalue.name}`,
                  )}
              </Link>
            </li>
          ))}
        </ul>
      ))
      .orSome('')}
  </>
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
          .fold({ list: value.countries })(
            (continent) => ({
              cname: continent.name,
              list: continent.countries,
            }),
          )))
        .orSome('')}
    </div>
  );
};

export default Countries;
