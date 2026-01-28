const { Schema, model } = require('mongoose');
// Productos en mongo database
const EsquemaProducto = Schema({
    nombre: { 
        type: String, 
        required: true, 
        unique: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    precio: { 
        type: Number, 
        default: 0 
    },
    imagen: { 
        type: String, 
        required: true 
    },
    categoria: { 
        type: String, 
        required: true 
    },
    existencias: { 
        type: Number, 
        default: 0 
    }
});


module.exports = model('Product', EsquemaProducto);
