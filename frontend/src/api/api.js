import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientiAPI = {
  getAll: () => api.get('/clienti'),
  create: (data) => api.post('/clienti', data),
};

export const dvdAPI = {
  getAll: () => api.get('/dvds'),
};

export const noleggioAPI = {
  getAll: () => api.get('/noleggios'),
  create: (data) => api.post('/noleggios', data),
  update: (id, data) => api.put(`/noleggios/${id}`, data),
};

export default api;