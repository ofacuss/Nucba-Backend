/* IMPORTACIONES*/
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AutenticacionContexto } from './contexto/AutenticacionContexto';
import { CarritoContexto } from './contexto/CarritoContexto';
import Registro from './Paginas/Registro';

import Inicio from './Paginas/Inicio';
import Productos from './Paginas/Productos';
import Contacto from './Paginas/Contacto';
import AcercaDe from './Paginas/Nosotros';
import Ingreso from './Paginas/Ingreso';
import Carrito from './Paginas/Carrito';
import './App.css';
/* NAVBAR*/
const BarraNavegacion = () => {
    const { usuario, cerrarSesion } = useContext(AutenticacionContexto);
    const { cuentaCarrito } = useContext(CarritoContexto);
    const [estaAbierto, setEstaAbierto] = useState(false);

    const cerrarMenu = () => setEstaAbierto(false);

    return (
        <nav className="barra-navegacion">
            <div className="barra-marca">
                <div className="grupo-marca">
                    <img src="/Public/logo.png" alt="Logo Vivero" className="logo-navegacion" />
                    <h2 className="titulo-marca">Raíces</h2>
                </div>

                {}
                <button className="alternador-menu" onClick={() => setEstaAbierto(!estaAbierto)}>
                    {estaAbierto ? '✕' : '☰'}
                </button>
            </div>

            <div className={`enlaces-navegacion ${estaAbierto ? 'abierto' : ''}`}>
                <Link to="/" onClick={cerrarMenu}>Inicio</Link>
                <Link to="/productos" onClick={cerrarMenu}>Tienda</Link>
                <Link to="/nosotros" onClick={cerrarMenu}>Nosotros</Link>
                <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>

                <div className="acciones-navegacion">
                    <Link to="/carrito" className="enlace-carrito" onClick={cerrarMenu}>
                        <span style={{ fontSize: '1.5rem' }}>🛒</span>
                        {cuentaCarrito > 0 && <span className="insignia-carrito">{cuentaCarrito}</span>}
                    </Link>

                    {}
                    {usuario ? (
                        <>
                            <span style={{ color: 'white', marginRight: '10px' }}>Hola, {usuario.nombre}</span>
                            <button onClick={() => { cerrarSesion(); cerrarMenu(); }} className="boton-autenticacion">
                                Salir
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Link to="/login" className="boton-autenticacion" onClick={cerrarMenu}>
                                Ingresar
                            </Link>
                            <Link to="/registro" className="boton-autenticacion" style={{ backgroundColor: 'white', color: '#1b5e20' }} onClick={cerrarMenu}>
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};


// FOOTER
const PieDePagina = () => (
    <footer style={{ backgroundColor: '#20232a', color: 'white', padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
        <p>&copy; 2026 Raíces Vivero - Proyecto BAck End Facundo Arias</p>
    </footer>
);

function App() {
    return (
        <Router>
            <BarraNavegacion />
            <div style={{ minHeight: '80vh' }}>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/nosotros" element={<AcercaDe />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Ingreso />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </div>
            <PieDePagina />
        </Router>
    );
}

export default App;
