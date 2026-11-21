const mongoose = require('mongoose');

const departamento_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
  
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
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