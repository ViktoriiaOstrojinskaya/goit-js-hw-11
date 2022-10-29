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
  guard: document.querySelector('.guard'),
};

let searchQuery = '';
let page = 1;

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

async function onSearch(event) {
  try {
    event.preventDefault();
    searchQuery = refs.form.elements.searchQuery.value;
    page = 1;

    const response = await API.fetchImages(searchQuery, page);
    cleanGallery();
    createGallery(response);
    lightbox.refresh();

    if (searchQuery.trim() === '') {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.gallery.innerHTML = '';
      return;
    }

    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      window.scrollTo(0, 0);
    }

    if (response.hits.length === 40) {
      refs.loadMore.removeAttribute('hidden');
    } else {
      refs.loadMore.setAttribute('hidden', true);
    }
  } catch (error) {
    console.error(error);
  }
}

function createGallery(response) {
  if (response.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    cleanGallery();
    return;
  }

  const markup = imagesCard(response.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function cleanGallery() {
  refs.gallery.innerHTML = '';
}

function pageScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onLoadMore() {
  try {
    page += 1;
    const response = await API.fetchImages(searchQuery, page);
    const totalPages = Math.ceil(response.totalHits / 40);

    createGallery(response);
    lightbox.refresh();
    pageScroll();

    if (page === totalPages) {
      Notify.info("We're sorry, but you've reached the end of search results");
      refs.loadMore.setAttribute('hidden', true);
    }
  } catch (error) {
    console.error(error);
  }
}
