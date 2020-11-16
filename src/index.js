import { debounce } from 'lodash';
import fetchCountries from './js/fetchCountries';
import buildMarkup from './js/buildMarkup';

import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;

const inputField = document.getElementById('countries-search');
const countriesListEl = document.getElementById('js-countries-markup');

inputField.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery == 0) {
    error({
      title: 'Ошибка',
      text: 'Повторите запрос',
    });
    return;
  }

  fetchCountries(searchQuery)
    .then(result => buildMarkup(result))
    .finally(clearResults());
}

function clearResults() {
  inputField.value = '';
  countriesListEl.innerHTML = '';
}
