import axios from 'axios'

const KEY = `27513369-b4299cf044d06764b30420eb5`;

axios.defaults.baseURL = `https://pixabay.com/api/`;
export async function fetchImages(query, page = 1) {
    const fetchedData = await axios.get
    (`https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return fetchedData.data.hits
}
