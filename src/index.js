import { debounce } from 'lodash';
// import fetchCountries from './js/fetchCountries';
import countryCard from './templates/countryCard.hbs';
import countriesList from './templates/countriesList.hbs';

import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;
defaults.closer = true;

const countriesListEl = document.querySelector('#countries-list');
const inputField = document.querySelector('#country-search');

inputField.addEventListener(
  'input',
  debounce(() => {
    const searchQuery = inputField.value.trim();
    fetchCountries(searchQuery);
  }, 1000),
);

function fetchCountries(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(result => {
      if (name == 0) {
        error({
          title: 'Ошибка',
          text: 'Повторите запрос',
        });
      }
      return result.json();
    })
    .then(data => markUp(data))
    .finally(clearResults());
}

function markUp(countries) {
  if (countries.length > 10) {
    error({
      title: 'Слишком длинный список',
      text: 'Конкретизируйте запрос',
    });
  } else if (countries.length >= 2 && countries.length <= 10) {
    countriesListEl.insertAdjacentHTML('beforeend', countriesList(countries));
  } else {
    countriesListEl.insertAdjacentHTML('beforeend', countryCard(countries));
  }
  // else {
  //   error({
  //     title: 'Ошибка',
  //     text: 'Ничего не найдено',
  //   });
  // }
}

function clearResults() {
  inputField.value = '';
  countriesListEl.innerHTML = '';
}
