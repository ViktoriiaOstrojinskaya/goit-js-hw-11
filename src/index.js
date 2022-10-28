import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import imagesCard from './imagesCard.hbs';
import API from './fetchImages';
import fetchImages from './fetchImages';

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

let searchQuery = '';

async function onSearch(event) {
  try {
    event.preventDefault();
    searchQuery = refs.form.elements.searchQuery.value;
    page = 1;

    const response = await API.fetchImages(searchQuery, page);

    if (searchQuery.trim() === '') {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.gallery.innerHTML = '';
      return;
    }

    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }

    /* ------------- Button "LoadMore"-------------- */
    // if (response.hits.length === 40) {
    //   refs.loadMore.removeAttribute('hidden');
    // } else {
    //   refs.loadMore.setAttribute('hidden', true);
    // }

    observer.observe(guard);
    cleanGallery();
    createGallery(response);
    lightbox.refresh();
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

/* ------------- Button "LoadMore"-------------- */

// refs.loadMore.addEventListener('click', onLoadMore);
// let page = 1;

// async function onLoadMore() {
//   try {
//     page += 1;
//     const response = await API.fetchImages(searchQuery, page);

//     createGallery(response);
//     lightbox.refresh();

//     const totalPages = Math.ceil(response.totalHits / 40);

//     if (page === totalPages) {
//       Notify.info("We're sorry, but you've reached the end of search results");
//       refs.loadMore.setAttribute('hidden', true);
//     }

//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 1,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

/* ------------- Intersection Observer -------------- */

const guard = document.querySelector('.guard');

const options = {
  root: null,
  rootMargin: '50px',
  threshold: 1,
};

const observer = new IntersectionObserver(onScroll, options);

let page = 1;

function onScroll(entries) {
  const totalPages = Math.ceil(response.totalHits / 40);

  entries.forEach(entry => {
    console.dir(entry);
    if (entry.isIntersecting) {
      page += 1;
      API.fetchImages(searchQuery, page).createGallery(response);
    }
    if (page === totalPages) {
      Notify.info("We're sorry, but you've reached the end of search results");
      observer.unobserve(guard);
    }
  });
}
