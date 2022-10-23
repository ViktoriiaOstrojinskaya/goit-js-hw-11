import axios from 'axios';

async function fetchImages(searchQuery, page) {
  try {
    const URL = 'https://pixabay.com/api/';
    const KEY = '30725538-60cf17fec7c19eff2b1d4a894';
    const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

    return await axios
      .get(
        `${URL}?key=${KEY}&q=${searchQuery}&${OPTIONS}&per_page=10&page=${page}`
      )
      .then(response => response.data);
  } catch (error) {
    console.error(error);
  }
}

export default { fetchImages };
