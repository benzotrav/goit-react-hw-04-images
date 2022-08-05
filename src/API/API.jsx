import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = `27695920-aa8882011fbc25a0de57751fe`;

export const params = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  page: 1,
  safesearch: 'true',
};

const customAxios = axios.create({
  baseURL: URL,
  params: {
    key: KEY,
  },
});

export const getData = async params => {

    const { data } = await customAxios.get('', {
      params,
    });

    return data;
  
};