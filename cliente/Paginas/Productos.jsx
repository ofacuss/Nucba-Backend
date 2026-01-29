import React, { useEffect, useState, useContext } from 'react';
import api from '../api/apiConfig'; // Importamos el mismo archivo que en Inicio
import { CarritoContexto } from '../contexto/CarritoContexto';

const Productos = () => {
    const { agregarAlCarrito } = useContext(CarritoContexto);
    const [listaProductos, setListaProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                // Usamos la misma ruta relativa que te funcionó en Inicio
                const { data } = await api.get('/products');
                
                // En Inicio hacías .slice(0,3), acá traemos todos:
                setListaProductos(data.productos);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        cargarProductos();
    }, []);

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
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '15px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ width: '100%', height: '240px', overflow: 'hidden', borderRadius: '10px', marginBottom: '15px' }}>
                            <img
                                src={producto.imagen || 'https://via.placeholder.com'}
                                alt={producto.nombre}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div style={{ flexGrow: 1 }}>
                            <h3 style={{ fontSize: '1.3rem', margin: '10px 0' }}>{producto.nombre}</h3>
                            <p style={{
                                color: '#777',
                                fontSize: '0.9rem',
                                height: '40px',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}>
                                {producto.descripcion}
                            </p>
                        </div>

                        <p style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '1.4rem', margin: '15px 0' }}>
                            ${producto.precio}
                        </p>

                        <button
                            onClick={() => agregarAlCarrito(producto)}
                            style={{
                                backgroundColor: '#20232a',
                                color: 'white',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
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

