import countryCard from '../templates/countryCard.hbs';
import countriesList from '../templates/countriesList.hbs';

import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;

const countriesListEl = document.getElementById('js-countries-markup');

export default function buildMarkup(list) {
  if (list.length > 10) {
    error({
      title: 'Слишком длинный список',
      text: 'Конкретизируйте запрос',
    });
  } else if (list.length >= 2 && list.length <= 10) {
    makeCountriesList(list);
  } else if (list.length == 1) {
    makeCountryCard(list);
  } else {
    error({
      title: 'Ошибка',
      text: 'Ничего не найдено',
    });
  }
}

function makeCountriesList(countries) {
  countriesListEl.insertAdjacentHTML('beforeend', countriesList(countries));
}

function makeCountryCard(countries) {
  countriesListEl.insertAdjacentHTML('beforeend', countryCard(countries));
}
