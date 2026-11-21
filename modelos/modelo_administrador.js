const mongoose = require('mongoose');

const administrador_modelo = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    numero_empleado: {
        type: String,
        required: true,
        unique: true
    },
    nombre_completo: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    creado_en: {
        type: Date,
        default: Date.now
    }
});

const Administrador = mongoose.model('Administrador', administrador_modelo, 'administradores');

module.exports = Administrador;