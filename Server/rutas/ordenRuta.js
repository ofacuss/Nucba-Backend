const { Router } = require('express');
const { validarJWT } = require('../Middlewares/validar-JWT');
const OrdenModelo = require('../Modelos/ordenes');

const enrutador = Router();

//Nueva orden
enrutador.post('/', validarJWT, async (peticion, respuesta) => {

    // Consologs para hacer seguimiento si hay errores
    console.log("Datos recibidos del carrito:", peticion.body);
    console.log("ID de usuario autenticado:", peticion.uidUsuario);

    try {
        // Validacion
        if (!peticion.body.articulos || peticion.body.articulos.length === 0) {
            return respuesta.status(400).json({
                ok: false,
                mensaje: 'No se puede procesar una compra sin artículos.'
            });
        }

        // Mapeo de datos y orden
        const nuevaOrden = new OrdenModelo({
            usuario: peticion.uidUsuario,   
            articulos: peticion.body.articulos, 
            total: peticion.body.total
        });

        // Save en mongo
        await nuevaOrden.save();

        respuesta.status(201).json({
            ok: true,
            mensaje: 'Orden creada exitosamente',
            orden: nuevaOrden
        });

    } catch (error) {
        // Console log de error
        console.error("ERROR CRÍTICO AL GUARDAR ORDEN:", error);

        respuesta.status(500).json({
            ok: false,
            mensaje: 'Error interno al procesar la orden',
            error: error.message
        });
    }
});

// GET
enrutador.get('/', validarJWT, async (peticion, respuesta) => {
    try {
       
        const listaOrdenes = await OrdenModelo.find({ usuario: peticion.uidUsuario })
            .populate('articulos.producto', 'nombre');

        respuesta.json({
            ok: true,
            ordenes: listaOrdenes
        });
    } catch (error) {
        respuesta.status(500).json({
            ok: false,
            mensaje: 'Error al obtener el historial de órdenes'
        });
    }
});

module.exports = enrutador;
