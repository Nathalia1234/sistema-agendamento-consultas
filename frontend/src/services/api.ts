import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Adiciona token automaticamente antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
Rotas CERTAS do backend:
POST   /auth/register
POST   /auth/login
GET    /users/me
POST   /consultas
GET    /consultas
GET    /consultas/:id
PUT    /consultas/:id
DELETE /consultas/:id
PUT    /consultas/cancel/:id
*/

// Tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
