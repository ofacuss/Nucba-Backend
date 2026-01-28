const { Schema, model } = require('mongoose');
// * Ordenes definicion!

// Quien hace la compra? ID
const EsquemaOrden = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    // Que articulos se compraron
    articulos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true
        },
        // Cuantos articulos
        cantidad: { type: Number, required: true },
        // cual es el precio?
        precio: { type: Number, required: true }
    }],
    // TOTAL
    total: { type: Number, required: true },
    // MArca de tiempo
    fecha: { type: Date, default: Date.now },
    estado: { type: String, default: 'Pendiente' }
});

module.exports = model('Order', EsquemaOrden);
