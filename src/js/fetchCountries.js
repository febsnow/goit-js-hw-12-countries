export default function fetchCountries(name, render, reset) {
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
    .then(data => {
      render(data);
    })
    .finally(reset);
}
