import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};
refs.input.addEventListener(
  'input',
  debounce(getEnteredCountryName, DEBOUNCE_DELAY)
);

function getEnteredCountryName(e) {
  let countryName = e.target.value.trim();
  if (!countryName.length) {
    clearRenderMarkup();
    return;
  }

  fetchCountries(countryName).then(renderCountriesMarkup).catch(onFetchError);
}

function renderCountriesMarkup(countries = {}) {
  if (countries.length > 10) {
    clearRenderMarkup();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length === 1) {
    let markup = countryTempl(...countries);
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = markup;
  } else if (countries.length > 1 && countries.length < 10) {
    let markup = countriesTempl(countries);
    refs.countryCard.innerHTML = '';
    refs.countryList.innerHTML = markup;
  }
}

function clearRenderMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function onFetchError() {
  clearRenderMarkup();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}