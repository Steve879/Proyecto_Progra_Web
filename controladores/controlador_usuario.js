
const servicioUsuario = require('../servicios/servicio_usuario');


const registrarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await servicioUsuario.registrarUsuario(req.body);

        // Evitar enviar la contraseña en la respuesta
        const usuarioSeguro = nuevoUsuario.toObject();
        delete usuarioSeguro.contrasena;

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            datos: usuarioSeguro
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: 'Ya existe un usuario con esos datos'
            });
        }

        res.status(400).json({
            mensaje: error.message
        });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await servicioUsuario.obtenerUsuarios();

        res.status(200).json({
            mensaje: 'Usuarios obtenidos correctamente',
            datos: usuarios
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

// Obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await servicioUsuario.obtenerUsuarioPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Usuario encontrado correctamente',
            datos: usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar el usuario',
            error: error.message
        });
    }
};


const actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await servicioUsuario.actualizarUsuario(
            req.params.id,
            req.body
        );

        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuarioSeguro = usuarioActualizado.toObject();
        delete usuarioSeguro.contrasena;

        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            datos: usuarioSeguro
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: 'Los datos proporcionados ya están registrados'
            });
        }

        res.status(400).json({
            mensaje: error.message
        });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await servicioUsuario.eliminarUsuario(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Usuario desactivado correctamente',
            datos: usuarioEliminado
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar el usuario',
            error: error.message
        });
    }
};

module.exports = {registrarUsuario,obtenerUsuarios,obtenerUsuarioPorId,actualizarUsuario,eliminarUsuario};
