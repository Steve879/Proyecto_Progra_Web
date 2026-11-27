
const mongoose = require('mongoose');

// Esquema para identificar quién realizó el movimiento 
const realizado_por_modelo = new mongoose.Schema({
    
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rol: {
        type: String,
        enum: ['estudiante','docente','administrador'],
        required: true
    }
    }, { _id: false });

// y este es el esquema principal del modelo movimiento_matricula
const movimiento_matricula_modelo = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    matricula_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matricula',
        required: true
    },
    estudiante_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    seccion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seccion',
        required: true
    },
    accion: {
        type: String,
        enum: ['MATRICULAR', 'RETIRAR'],
        required: true
    },
    motivo: {
         type: String 
        },
    realizado_por: {
        type: realizado_por_modelo,
        required: true
    },
    creado_en: { 
        type: Date, 
        default: Date.now 
    }
});

const MovimientoMatricula = mongoose.model('MovimientoMatricula', movimiento_matricula_modelo,  'movimientos_matricula');

module.exports = MovimientoMatricula;
