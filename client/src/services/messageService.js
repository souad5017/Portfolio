import api from './api.js';

export const sendMessage = (data) => api.post('/messages', data).then((res) => res.data);

export const getMessages = () => api.get('/messages').then((res) => res.data);

export const setMessageRead = (id, isRead) => api.put(`/messages/${id}`, { isRead }).then((res) => res.data);

export const deleteMessage = (id) => api.delete(`/messages/${id}`);