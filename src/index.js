import './css/styles.css';

import axios from 'axios';
import getImages from './fetchImages';
import imagesCard from './imagesCard.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('input', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const imgg = form.elements.searchQuery.value;

  getImages(immg).then(showResult);
}

function showResult(images) {
  imagesCard(images);
}
