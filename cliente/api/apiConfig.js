import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nucba-backendserver.vercel.app/api'
});

// Este interceptor ayudará a enviar el token automáticamente en el futuro
api.interceptors.request.use((configuracion) => {
    const token = localStorage.getItem('token');
    if (token) {
        configuracion.headers['x-token'] = token;
    }
    return configuracion;
});

export default api;
