import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nucba-backendserver.vercel.app/api'
});

// Envio de TOKEN!!!
api.interceptors.request.use((configuracion) => {
    const token = localStorage.getItem('token');
    if (token) {
        configuracion.headers['x-token'] = token;
    }
    return configuracion;
});

export default api;
