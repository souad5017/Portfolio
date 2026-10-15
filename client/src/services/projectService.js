import api from './api.js';

export const getProjects = () =>
  api.get('/projects', { params: { published: true } }).then((res) => res.data);

export const getProject = (id) => api.get(`/projects/${id}`).then((res) => res.data);