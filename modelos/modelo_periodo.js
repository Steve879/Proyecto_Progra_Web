const mongoose = require('mongoose');

const periodo_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    inicio_matricula: {
        type: Date,
        required: true
    },
    fin_matricula: {
        type: Date,
        required: true
    },
    fecha_limite_retiro: {
        type: Date,
        required: true
    },
    creditos_maximos: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['borrador', 'abierto', 'cerrado'],
        required: true
    }
});

const Periodo = mongoose.model('Periodo', periodo_modelo, 'periodos');

module.exports = Periodo;