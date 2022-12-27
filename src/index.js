import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  cardContainer: document.querySelector('.country-info'),
  countriesList: document.querySelector('#search-box'),
  country: document.querySelector('.country-list'),
};
refs.countriesList.addEventListener(
  'input',
  debounce(onSearch, DEBOUNCE_DELAY)
);
function onSearch(e) {
  const search = e.target.value.trim();
  if (search === " ") {
    refs.cardContainer = " ";
    refs.country =" ";
   };
  addMarkup();
  fetchCountries(search)
    .then(response => {
      const length = response.length;
if (length === 1) {
        const markup = createMarkupCountry(response);
        addMarkup(markup);
      } else if (length > 1 && length <= 10) {
        const markup = createMarkupListCountry(response);
        addMarkup('', markup);
      } else {
        e.target.removeEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return error;
    });
}
function addMarkup(cm = '', clm = '') {
  refs.cardContainer.innerHTML = cm;
  refs.country.innerHTML = clm;
}
function createMarkupCountry(data = []) {
  return data
    .map(({ flags, name, capital, population, languages }) => {
      return `<div> <div class="country"><img src="${flags.svg}" style="width:50px">
    <h1>${name.official}</h1></div>
     <p><b>Capital:</b> ${capital}</p>
     <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)[0]}</p></div>`;
    })
    .join('');
}
function createMarkupListCountry(data = []) {
  return data
    .map(({ flags, name }) => {
      return `<div class="container-js"><img src="${flags.svg}" style="width:5vw">
      <h1>${name.official}</h1></div>`;
    })
    .join('');
}