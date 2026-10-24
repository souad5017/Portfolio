import api from './api.js';

export const sendMessage = (data) => api.post('/messages', data).then((res) => res.data);