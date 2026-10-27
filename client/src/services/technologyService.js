import api from './api.js';

export const getTechnologies = () => api.get('/technologies').then((res) => res.data);