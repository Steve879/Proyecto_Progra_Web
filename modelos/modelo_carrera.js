const mongoose = require('mongoose');

const carrera_modelo = new mongoose.Schema({

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
        enum: ['activa', 'inactiva'],
        default: 'activa'
    }, 
    creado_en: {
        type: Date,
        default: Date.now
    }


});

const Carrera = mongoose.model('Carrera', carrera_modelo, 'carreras');
module.exports = Carrera;