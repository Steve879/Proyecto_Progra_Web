
const mongoose = require('mongoose');


const historial_academico_modelo = new mongoose.Schema({
    id: { type: String,
         required: true 
        },
    estudiante_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    asignatura_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    periodo_nombre: { 
        type: String, 
        required: true 
    },
    nota: {
         type: Number, 
         required: true,
         min: 0,
         max: 100 
        },
    estado: {
        type: String,
        enum: ['aprobada', 'reprobada'],
        required: true
    }
});

const HistorialAcademico = mongoose.model('HistorialAcademico', historial_academico_modelo,'historial_academico');

module.exports = HistorialAcademico;
