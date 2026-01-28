const UsuarioModelo = require('../Modelos/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
const registrarUsuario = async (peticion, respuesta) => {
    const { email, password, nombre } = peticion.body;

    try {
        // Existe el correo?
        let usuarioExistente = await UsuarioModelo.findOne({ email });
        if (usuarioExistente) {
            return respuesta.status(400).json({ ok: false, mensaje: 'El correo ya está registrado' });
        }

        // NUEVO usuario
        const nuevoUsuario = new UsuarioModelo(peticion.body);

        // Seguridad de contraseña con hash
        const sal = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password, sal);

        // Guardado en la base
        await nuevoUsuario.save();

        respuesta.status(201).json({
            ok: true,
            mensaje: 'Usuario creado con éxito',
            uid: nuevoUsuario.id
        });

    } catch (error) {
        console.error("ERROR EN REGISTRO:", error);
        respuesta.status(500).json({ ok: false, mensaje: 'Error al registrar el usuario' });
    }
};

// El login
const loginUsuario = async (peticion, respuesta) => {
    const { email, password } = peticion.body;

    try {
        const usuarioEncontrado = await UsuarioModelo.findOne({ email });
        if (!usuarioEncontrado) {
            return respuesta.status(400).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
        }

        const contrasenaValida = bcrypt.compareSync(password, usuarioEncontrado.password);
        if (!contrasenaValida) {
            return respuesta.status(400).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
        }

        // TOKEN
        const tokenToken = jwt.sign(
            { uidUsuario: usuarioEncontrado.id, nombre: usuarioEncontrado.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        respuesta.json({
            ok: true,
            uid: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            token: tokenToken
        });

    } catch (error) {
        console.error("ERROR EN LOGIN:", error);
        respuesta.status(500).json({ ok: false, mensaje: 'Error interno en el servidor' });
    }
};


module.exports = {
    registrarUsuario,
    loginUsuario
};
