import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import imagesCard from './imagesCard.hbs';
import API from './fetchImages';

const lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.loadMore.hidden = true;

let page = 1;
let searchQuery = '';
let currentHits = 0;

async function onSearch(event) {
  event.preventDefault();
  searchQuery = refs.form.elements.searchQuery.value;
  page = 1;

  const response = await API.fetchImages(searchQuery, page);

  if (searchQuery.trim() === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    // refs.loadMore.hidden = true;
    refs.gallery.innerHTML = '';
    return;
  }

  if (response.totalHits > 0) {
    Notify.success(`Hooray! We found ${response.totalHits} images.`);
  }

  refs.gallery.innerHTML = '';
  createGallery(response);
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function createGallery(response) {
  if (response.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMore.hidden = true;
    refs.gallery.innerHTML = '';
    return;
  }

  const markup = imagesCard(response.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

async function onLoadMore() {
  page += 1;
  const response = await API.fetchImages(searchQuery, page);

  if (response.hits.length > 40) {
    refs.loadMore.hidden = false;
  }

  // refs.loadMore.hidden = true;

  createGallery(response);
  lightbox.refresh();
  currentHits += response.hits.length;

  console.log(`${currentHits} ${response.totalHits}`);

  if (currentHits >= response.totalHits) {
    refs.loadMore.hidden = true;
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
