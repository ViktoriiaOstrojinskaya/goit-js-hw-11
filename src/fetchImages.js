const URL = 'https://pixabay.com/api/';
const KEY = '30725538-60cf17fec7c19eff2b1d4a894';
const PARAM = '&image_type=photo&orientation=horizontal&safesearch=true';

async function getImages() {
  try {
    const response = await axios.get(`${URL}?key=${KEY}&q=cat&${PARAM}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default { getImages };
