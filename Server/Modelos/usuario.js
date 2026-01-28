const { Schema, model } = require('mongoose');
// usuarios en database
const EsquemaUsuario = Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    rol: { 
        type: String, 
        enum: ['USER_ROLE', 'ADMIN_ROLE'], 
        default: 'USER_ROLE' 
    },
    estado: { 
        type: Boolean, 
        default: true 
    }
});


module.exports = model('User', EsquemaUsuario);
