import api from './api.js';

export default function createResourceService(path) {
  return {
    list: () => api.get(path).then((res) => res.data),
    create: (data) => api.post(path, data).then((res) => res.data),
    update: (id, data) => api.put(`${path}/${id}`, data).then((res) => res.data),
    remove: (id) => api.delete(`${path}/${id}`),
  };
}