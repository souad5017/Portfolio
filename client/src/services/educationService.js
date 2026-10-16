import api from './api.js';

export const getEducation = () => api.get('/education').then((res) => res.data);