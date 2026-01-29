import axios from 'axios'; // Agregá esta importación arriba si no está
import React, { useEffect, useState, useContext } from 'react';

import api from '../api/apiConfig';
import { CarritoContexto } from '../contexto/CarritoContexto';
import { AutenticacionContexto } from '../contexto/AutenticacionContexto';
/**
 * Componente funcional Productos
 * Renderiza la tienda del vivero obteniendo los datos desde la API
 */ 
const Productos = () => {
    // Estado local para almacenar los productos que vienen de la base de datos
    const [listaProductos, setListaProductos] = useState([]);
    //(Carrito y Autenticación)
    const { agregarAlCarrito } = useContext(CarritoContexto);
    const { usuario } = useContext(AutenticacionContexto);
    // useEffect
    useEffect(() => {
     // ... dentro del useEffect:
const obtenerProductos = async () => {
    try {
        // Usamos axios pelado con la URL completa que SÍ funciona
        const { data } = await axios.get('https://nucba-backendserver.vercel.app/api');
        setListaProductos(data.productos);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};
        obtenerProductos();
    }, []);
    // Estilos cards y mapeado
    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#1b5e20', fontSize: '2.5rem' }}>
                Nuestra Colección 🌿
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px'
            }}>
                {listaProductos.map((producto) => (
                    <div key={producto._id} style={{
                        border: '1px solid #eee',
                        borderRadius: '16px',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s'
                    }}
                        className="tarjeta-producto"
                    >
                        {}
                        <div style={{
                            width: '100%',
                            height: '250px',
                            overflow: 'hidden',
                            borderRadius: '12px',
                            marginBottom: '15px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <img
                                src={producto.imagen || 'https://via.placeholder.com'}
                                alt={producto.nombre}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', 
                                    objectPosition: 'center'
                                }}
                            />
                        </div>

                        {}
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ margin: '10px 0', fontSize: '1.4rem', color: '#2c3e50' }}>
                                {producto.nombre}
                            </h3>

                            <p style={{
                                color: '#666',
                                fontSize: '0.95rem',
                                height: '45px', 
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2, 
                                WebkitBoxOrient: 'vertical',
                                marginBottom: '15px'
                            }}>
                                {producto.descripcion}
                            </p>
                        </div>

                        {}
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32', marginBottom: '15px' }}>
                            ${producto.precio}
                        </p>

                        <button
                            onClick={() => agregarAlCarrito(producto)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#20232a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'background 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1b5e20'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#20232a'}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;
