
const mongoose = require('mongoose');

const usuario_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        trim: true
    },

    numero_identidad: {
        type: String,
        required: function() {
            return this.rol === 'estudiante' || this.rol === 'docente';
        },
        trim: true
    },

    nombre_completo: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    fecha_nacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function(fecha) {
                return fecha instanceof Date && fecha <= new Date();
            },
            message: 'La fecha de nacimiento no puede ser futura'
        }
    },

    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'El correo electrónico no tiene un formato válido'
        ]
    },

    numero_cuenta: {
        type: String,
        required: function() {
            return this.rol === 'estudiante';
        },
        trim: true
    },

    contrasena: {
        type: String,
        required: true,
        select: false
    },

    carrera_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
        required: function() {
            return this.rol === 'estudiante';
        }
    },


    rol: {
        type: String,
        enum: ['estudiante', 'docente', 'administrador'],
        required: true
    },

    numero_empleado: {
        type: String,
        required: function() {
            return this.rol === 'docente' || this.rol === 'administrador';
        },
        trim: true
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

const Usuario = mongoose.model('Usuario', usuario_modelo, 'usuario');

module.exports = Usuario;
