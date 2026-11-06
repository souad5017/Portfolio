import api from './api.js';

const upload = (path, field) => (file) => {
  const data = new FormData();
  data.append(field, file);
  return api.post(path, data).then((res) => res.data.url);
};

export const uploadImage = upload('/upload', 'image');
export const uploadCv = upload('/upload/cv', 'cv');