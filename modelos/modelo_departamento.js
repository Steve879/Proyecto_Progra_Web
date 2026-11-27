
const mongoose = require('mongoose');

const departamento_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        minlength: 2,
        maxlength: 15
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 500
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

const Departamento = mongoose.model('Departamento', departamento_modelo, 'departamentos');

module.exports = Departamento;
