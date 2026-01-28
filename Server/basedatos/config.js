const mongoose = require('mongoose');
/* Conexion a la base de datos MONGO con posibles errores*/
const conectarBaseDeDatos = async () => {
    try {
        
        console.log('--- Verificando variables de entorno ---');
        console.log('URI cargada:', process.env.MONGO_URI ? 'SÍ (cadena detectada)' : 'NO (undefined)');

        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('La variable MONGO_URI no está llegando al proceso. Revisa la ubicación del archivo .env');
        }

        await mongoose.connect(uri);
        console.log('Base de datos conectada exitosamente (2026) 🚀');
    } catch (error) {
        console.error('Error detallado:', error.message);
        process.exit(1); 
    }
};

module.exports = { conectarBaseDeDatos };
