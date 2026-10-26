import api from './api.js';

export const getStats = () => api.get('/dashboard').then((res) => res.data);