import './css/styles.css';

import imagesCard from './imagesCard.hbs';
import NewsApiService from './fetchImages';

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  const el = refs.form.elements.searchQuery.value;
  newsApiService.resetPage();

  if (!newsApiService.searchQuery.trim()) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.gallery.innerHTML = '';
    return;
  }

  newsApiService.fetchImg().then(showResult);
  clearGallery();
}

function showResult(gallery) {
  if (!gallery.total) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.gallery.innerHTML = '';
    return;
  }

  const markup = imagesCard(gallery);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
  newsApiService.fetchImg().then(showResult);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
