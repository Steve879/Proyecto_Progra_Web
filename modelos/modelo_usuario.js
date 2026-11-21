
const mongoose = require('mongoose');

const usuario_modelo = new mongoose.Schema({
    id: {
        type: String,
        required: true,
       
    },
    numero_identidad: {
        type: String,
        required: function() {
            return this.rol === 'estudiante' || this.rol === 'docente';
        },
    },
    nombre_completo: {
        type: String,
        required: true,
        trim: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    numero_cuenta:{
        type: String,
        required: function() {
            return this.rol === 'estudiante';
        },
    },
    contrasena: {
        type: String,
        required: true
    },
    carrera_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
        required: function() {
            return this.rol === 'estudiante';
        }
    },
    rol:{
        type: String,
        enum: ['estudiante', 'docente', 'administrador'],
        required: true
    },
    numero_empleado: {
        type: String,
        required: function() {
            return this.rol === 'docente' || this.rol === 'administrador';
        },
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