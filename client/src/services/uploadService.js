import api from './api.js';

export const uploadImage = (file) => {
  const data = new FormData();
  data.append('image', file);
  return api.post('/upload', data).then((res) => res.data.url);
};