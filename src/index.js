import './css/styles.css';

import imagesCard from './imagesCard.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const el = refs.form.elements.searchQuery.value;

  if (!el) {
    refs.gallery.innerHTML = '';
    return;
  }

  fetchImg(el).then(showResult);
}

function fetchImg(el) {
  return fetch(
    `https://pixabay.com/api/?key=30725538-60cf17fec7c19eff2b1d4a894&q=${el}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => response.json());
}

function showResult(gallery) {
  if (gallery.hits.length === 0) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.gallery.innerHTML = '';
    return;
  }

  const markup = imagesCard(gallery);
  refs.gallery.innerHTML = markup;
}
