import React, { createContext, useState, useEffect } from 'react';

// Funcion carrito contexto
export const CarritoContexto = createContext();

export const CarritoProveedor = ({ children }) => {
    // Local storage, persistencia
    const [articulosCarrito, setArticulosCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('cart');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // Guardado automatico
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(articulosCarrito));
    }, [articulosCarrito]);

    // Agregar carrito
    const agregarAlCarrito = (producto) => {
        setArticulosCarrito((previo) => {
            const existe = previo.find(item => item._id === producto._id);
            if (existe) {
                return previo.map(item =>
                    item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...previo, { ...producto, cantidad: 1 }];
        });
    };

    // Quitar elementos del carrito
    const disminuirCantidad = (id) => {
        setArticulosCarrito(previo => {
            return previo.map(item =>
                item._id === id && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            );
        });
    };

    // Elimina de a un producto
    const eliminarDelCarrito = (id) => {
        setArticulosCarrito(previo => previo.filter(item => item._id !== id));
    };

    // Vaciado carrito
    const vaciarCarrito = () => {
        if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            setArticulosCarrito([]);
        }
    };

    // Calculo del total
    const total = articulosCarrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
    const cuentaCarrito = articulosCarrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);

    return (
        <CarritoContexto.Provider value={{
            articulosCarrito,
            agregarAlCarrito,
            disminuirCantidad,
            eliminarDelCarrito,
            vaciarCarrito,
            total,
            cuentaCarrito
        }}>
            {children}
        </CarritoContexto.Provider>
    );
};
