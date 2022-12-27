const BASE_URL = 'https://restcountries.com';

export function fetchCountries(countryName = '') {
  return fetch(
    `${BASE_URL}/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}