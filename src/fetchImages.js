import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '30725538-60cf17fec7c19eff2b1d4a894';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

//${URL}?key=${KEY}&q=${this.searchQuery}&${OPTIONS}&per_page=5&page=${this.page}

export default class NewsApiService {
  constructor(params) {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    axios
      .get(
        `${URL}?key=${KEY}&q=${this.searchQuery}&${OPTIONS}&per_page=5&page=${this.page}`
      )
      .then(function (response) {
        console.log(response);
        this.page += 1;
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get element() {
    return this.searchQuery;
  }

  set element(newQuery) {
    this.searchQuery = newQuery;
  }
}
