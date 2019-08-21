/* eslint-disable no-use-before-define */
// @flow

export type Language = {
  code: string,
  name: string,
  native: string,
  rtl: number,
}

export type Country = {
  code: string,
  name: string,
  native: string,
  phone: string,
  continent: Continent,
  currency: string,
  languages: Array<Language>,
  emoji: string,
  emojiU: string,
}

export type Continent = {
  code: string,
  name: string,
  countries: Array<Country>,
}
