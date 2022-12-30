import axios from 'axios';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/',
});

const API_KEY = '31108822-76837894c66e615f3880fb969';
export const PER_PAGE = 12;

export const getImages = async (params = {}) => {
  const { data } = await imagesApi.get('api/', {
    params: {
      key: API_KEY,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      ...params,
      // page,
      // q: searchQuery,
    },
  });

  return data;
};
