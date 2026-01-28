import React, { createContext, useState } from 'react'; 
import api from '../api/apiConfig';

export const AutenticacionContexto = createContext();
// Autentificacion con token
export const AutenticacionProveedor = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        const token = localStorage.getItem('token');
        const nombre = localStorage.getItem('nombre');
        return (token && nombre) ? { nombre, token } : null;
    });
    // Inicio sesion con token
    const iniciarSesion = async (correo, contrasena) => {
        try {
            const { data } = await api.post('/auth/login', { email: correo, password: contrasena });
            localStorage.setItem('token', data.token);
            localStorage.setItem('nombre', data.nombre);
            setUsuario({ nombre: data.nombre, token: data.token });
            return { ok: true };
        } catch (error) {
            return { ok: false, mensaje: error.response?.data?.mensaje || 'Error' }; 
        }
    };
    // Cierre sesion
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        setUsuario(null);
    };

    return (
        <AutenticacionContexto.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AutenticacionContexto.Provider>
    );
};
