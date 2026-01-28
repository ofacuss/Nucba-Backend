const jwt = require('jsonwebtoken');

const validarJWT = (peticion, respuesta, siguiente) => {
    // Extraccion token
    const token = peticion.header('x-token');

    if (!token) {
        return respuesta.status(401).json({
            ok: false,
            mensaje: 'No hay token en la petición'
        });
    }

    try {
        // Verificacion. Archivo env.
        const { uidUsuario, nombre } = jwt.verify(token, process.env.JWT_SECRET);

        // Inyeccion de datos
        peticion.uidUsuario = uidUsuario;
        peticion.nombreUsuario = nombre;

        siguiente(); 
    } catch (error) {
        // Console log si hay error
        console.log('--- ERROR EN EL MIDDLEWARE DE TOKEN ---');
        console.error(error);

        return respuesta.status(401).json({
            ok: false,
            mensaje: 'Token no válido o expirado'
        });
    }
};

module.exports = { validarJWT };
