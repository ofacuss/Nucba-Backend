import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig';
import { CarritoContexto } from '../contexto/CarritoContexto';
// Declaracion carrito.
const Inicio = () => {
    const navegar = useNavigate();
    const { agregarAlCarrito } = useContext(CarritoContexto);
    const [destacados, setDestacados] = useState([]);

    useEffect(() => {
        const cargarDestacados = async () => {
            try {
                const { data } = await api.get('/products');
                // Tomamos los primeros 3 para la sección de destacados
                setDestacados(data.productos.slice(0, 3));
            } catch (error) {
                console.error("Error al traer destacados", error);
            }
        };
        cargarDestacados();
    }, []);
    // Estilos HERO. Ajuste de Cards destacadas
    return (
        <div>
            {}
            <section style={{
                height: '75vh',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/Public/Hero2.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', marginBottom: '10px' }}>Vivero Raíces 🌿</h1>
                <p style={{ fontSize: '1.4rem', maxWidth: '650px', marginBottom: '30px', lineHeight: '1.5' }}>
                    Naturaleza y vida en tu hogar desde 2026. <br />
                    Transformá tu espacio en un oasis natural.
                </p>
                <button
                    onClick={() => navegar('/productos')}
                    style={{
                        padding: '18px 45px',
                        fontSize: '1.1rem',
                        backgroundColor: '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Explorar Colección
                </button>
            </section>

            {}
            <section style={{ padding: '80px 20px', backgroundColor: '#f9f9f9' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.2rem', color: '#1b5e20' }}>
                        Selección Especial del Mes
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {destacados.map(producto => (
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
                                {}
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
            </section>
        </div>
    );
};

export default Inicio;
