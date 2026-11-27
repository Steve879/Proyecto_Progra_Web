
const Usuario = require('../modelos/modelo_usuario');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const obtenerUsuarios = async () => {
    const usuarios = await Usuario.find();
    return usuarios;
};

const registrarUsuario = async (datosUsuario) => {

    if (!datosUsuario.contrasena) {
        throw new Error('La contraseña es obligatoria');
    }

    if (datosUsuario.contrasena.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const usuarioExistente = await Usuario.findOne({
        $or: [
            { id: datosUsuario.id },
            { correo: datosUsuario.correo?.toLowerCase() }
        ]
    });

    if (usuarioExistente) {
        throw new Error('El ID o correo electrónico ya está registrado');
    }

    if (datosUsuario.numero_identidad) {
        const identidadExistente = await Usuario.findOne({
            numero_identidad: datosUsuario.numero_identidad
        });

        if (identidadExistente) {
            throw new Error('El número de identidad ya está registrado');
        }
    }

    if (datosUsuario.numero_cuenta) {
        const cuentaExistente = await Usuario.findOne({
            numero_cuenta: datosUsuario.numero_cuenta
        });

        if (cuentaExistente) {
            throw new Error('El número de cuenta ya está registrado');
        }
    }

    if (datosUsuario.numero_empleado) {
        const empleadoExistente = await Usuario.findOne({
            numero_empleado: datosUsuario.numero_empleado
        });

        if (empleadoExistente) {
            throw new Error('El número de empleado ya está registrado');
        }
    }

    if (datosUsuario.rol === 'estudiante') {
        if (!mongoose.Types.ObjectId.isValid(datosUsuario.carrera_id)) {
            throw new Error('El ID de la carrera no es válido');
        }
    }

    const contrasenaHash = await bcrypt.hash(datosUsuario.contrasena, 10);

    datosUsuario.contrasena = contrasenaHash;

    const nuevoUsuario = await Usuario.create(datosUsuario);

    return nuevoUsuario;
};

const obtenerUsuarioPorId = async (id) => {
    const usuario = await Usuario.findOne({ id: id });
    return usuario;
};

const actualizarUsuario = async (id, datosUsuario) => {

    // No permitir modificar identificadores ni roles mediante esta operación
    delete datosUsuario.id;
    delete datosUsuario.rol;
    delete datosUsuario.estado;
    delete datosUsuario.creado_en;

    // Si se proporciona una contraseña nueva, validarla y generar hash
    if (datosUsuario.contrasena) {

        if (datosUsuario.contrasena.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }

        datosUsuario.contrasena = await bcrypt.hash(
            datosUsuario.contrasena,
            10
        );
    }

    // No permitir modificar campos que no correspondan al rol
    const usuarioActual = await Usuario.findOne({ id: id });

    if (!usuarioActual) {
        return null;
    }

    if (usuarioActual.rol !== 'estudiante') {
        delete datosUsuario.numero_cuenta;
        delete datosUsuario.carrera_id;
    }

    if (usuarioActual.rol === 'estudiante') {
        delete datosUsuario.numero_empleado;
    }

    if (usuarioActual.rol === 'administrador') {
        delete datosUsuario.numero_identidad;
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate(
        { id: id },
        datosUsuario,
        {
            new: true,
            runValidators: true
        }
    );

    return usuarioActualizado;
};


const eliminarUsuario = async (idUsuario) => {
    const usuarioEliminado = await Usuario.findOneAndUpdate(
        { id: idUsuario },
        { estado: 'inactivo' },
        {
            new: true,
            runValidators: true
        }
    );

    return usuarioEliminado;
};

module.exports = {obtenerUsuarios,registrarUsuario,obtenerUsuarioPorId,actualizarUsuario,eliminarUsuario};
