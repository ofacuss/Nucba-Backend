import React, { useContext } from 'react'; 
import { CarritoContexto } from '../contexto/CarritoContexto';
import { AutenticacionContexto } from '../contexto/AutenticacionContexto';
import api from '../api/apiConfig';
import Swal from 'sweetalert2';
// Carrito agregar, eliminar, vaciado. 
const Carrito = () => {
    
    const {
        articulosCarrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        total
    } = useContext(CarritoContexto);
    // Autenticar.
    const { usuario } = useContext(AutenticacionContexto);
    // Finalizacion de compra
    const manejarFinalizarCompra = async () => {
        if (!usuario) {
            return Swal.fire('Inicia sesión', 'Debes estar logueado para comprar', 'warning');
        }
        if (articulosCarrito.length === 0) {
            return Swal.fire('Carrito vacío', 'Agrega algunos productos primero', 'info');
        }

        try {
            const datosOrden = {
                articulos: articulosCarrito.map(item => ({
                    producto: item._id,
                    cantidad: item.cantidad,
                    precio: item.precio
                })),
                total: total
            };

            
            const { data } = await api.post('/orders', datosOrden);

            Swal.fire({
                title: '¡Compra exitosa!',
                text: `ID de orden: ${data.orden._id}`,
                icon: 'success',
                confirmButtonColor: '#2e7d32'
            });

            vaciarCarrito();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al procesar la compra', 'error');
        }
    };
    // MApeado
    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', minHeight: '70vh' }}>
            <h2 style={{ color: '#1b5e20' }}>🌿 Tu Carrito</h2>
            <hr />
            {articulosCarrito.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p>No tienes productos en el carrito todavía.</p>
                </div>
            ) : (
                <>
                    {articulosCarrito.map(item => (
                        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0 }}>{item.nombre}</h4>
                                <p style={{ margin: 0, color: '#666' }}>${item.precio} c/u</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => disminuirCantidad(item._id)} style={{ width: '30px', cursor: 'pointer' }}>-</button>
                                    <strong style={{ minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</strong>
                                    <button onClick={() => agregarAlCarrito(item)} style={{ width: '30px', cursor: 'pointer' }}>+</button>
                                </div>
                                <button
                                    onClick={() => eliminarDelCarrito(item._id)}
                                    style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontSize: '0.9rem' }}
                                >
                                    Eliminar
                                </button>
                            </div>
                            <div style={{ fontWeight: 'bold' }}>
                                ${item.precio * item.cantidad}
                            </div>
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', marginTop: '30px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Total: <span style={{ color: '#2e7d32' }}>${total}</span></h3>
                        <button
                            onClick={vaciarCarrito}
                            style={{ background: '#f5f5f5', padding: '10px 20px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Vaciar Carrito
                        </button>
                        <button
                            onClick={manejarFinalizarCompra}
                            style={{ background: '#2e7d32', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(46,125,50,0.3)' }}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Carrito;
