import api from './api.js';

export const getExperiences = () => api.get('/experiences').then((res) => res.data);