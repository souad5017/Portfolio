import api from './api.js';

export const getCertificates = () => api.get('/certificates').then((res) => res.data);