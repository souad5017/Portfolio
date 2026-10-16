import api from './api.js';

export const getSkills = () => api.get('/skills').then((res) => res.data);