import React, { useState, useContext } from 'react';
import { AutenticacionContexto } from '../contexto/AutenticacionContexto';
import { useNavigate, Link } from 'react-router-dom'; 
// Inicio de sesion
const Ingreso = () => {
    const { iniciarSesion } = useContext(AutenticacionContexto);
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navegar = useNavigate();
    // Sesion Ok o con aviso de error.
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const respuesta = await iniciarSesion(correo, contrasena);
        if (respuesta.ok) {
            navegar('/'); 
        } else {
            
            alert(respuesta.mensaje || 'Error al ingresar');
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', minHeight: '70vh' }}>
            <h2 style={{ color: '#20232a' }}>Iniciar Sesión</h2>

            <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '20px auto', gap: '10px' }}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={evento => setCorreo(evento.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={evento => setContrasena(evento.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '12px',
                        background: '#1b5e20', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}
                >
                    Entrar
                </button>
            </form>

            {}
            <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#666' }}>
                    ¿No tienes cuenta?{' '}
                    <Link
                        to="/registro"
                        style={{
                            color: '#1b5e20',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Ingreso;
