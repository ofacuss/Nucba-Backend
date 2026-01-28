import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AutenticacionProveedor } from './contexto/AutenticacionContexto';
import { CarritoProveedor } from './contexto/CarritoContexto';

// RENDER
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AutenticacionProveedor>
            <CarritoProveedor>
                <App />
            </CarritoProveedor>
        </AutenticacionProveedor>
    </React.StrictMode>
);
