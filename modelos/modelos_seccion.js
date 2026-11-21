
const mongoose = require('mongoose');

// Este es el arreglo que recibe los horarios de la seccion
const horario_modelo = new mongoose.Schema({

    dia: {
        type: Number,
        required: true
    },

    minuto_inicio: {
        type: Number,
        required: true
    },

    minuto_fin: {
        type: Number,
        required: true
    }
}, { _id: false });


// esta es la maqueta del modelo seccion
const seccion_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },

    asignatura_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },

    periodo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Periodo',
        required: true
    },

    codigo_seccion: {
        type: String,
        required: true
    },

    docente: {
        type: String,
        required: true
    },

    aula: {
        type: String,
        required: true
    },

    horario: {
        type: [horario_modelo],
        required: true
    },

    cupo_maximo: {
        type: Number,
        required: true
    },

    matriculados: {
        type: Number,
        default: 0
    },

    estado: {
        type: String,
        enum: ['activa', 'inactiva'],
        default: 'activa'
    }

});

const Seccion = mongoose.model('Seccion', seccion_modelo, 'secciones');

module.exports = Seccion;
