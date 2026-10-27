import api from './api.js';

export const getProjects = () =>
  api.get('/projects', { params: { published: true } }).then((res) => res.data);

export const getProject = (id) => api.get(`/projects/${id}`).then((res) => res.data);
export const getAllProjects = () => api.get('/projects').then((res) => res.data);

export const createProject = (data) => api.post('/projects', data).then((res) => res.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((res) => res.data);