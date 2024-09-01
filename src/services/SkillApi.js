import axios from 'axios';

// Configuração global do Axios para incluir o token JWT
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado ou não autorizado
      // Redirecionar para a página de login ou mostrar uma mensagem de erro
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
