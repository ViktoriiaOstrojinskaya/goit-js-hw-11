// const URL = 'pixabay.com/api/';
// const KEY = '30725538-60cf17fec7c19eff2b1d4a894';

// const axios = require('axios');

// axios(
//   'https://pixabay.com/api/?key=30725538-60cf17fec7c19eff2b1d4a894&q=dog&image_type=photo&orientation=horizontal&safesearch=true'
// ).then(response => console.log(response));

//   .then(function (response) {
//     // обробка успішного запиту
//     console.log(response);
//   })
//   .catch(function (error) {
//     // обробка помилки
//     console.log(error);

function fetchCountries(img) {
  return fetch(
    `'https://pixabay.com/api/?key=30725538-60cf17fec7c19eff2b1d4a894&q=dog&image_type=photo&orientation=horizontal&safesearch=true'`
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}
