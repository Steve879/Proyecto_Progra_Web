
const mongoose = require('mongoose');

// Esquema para los horarios dentro del detalle
const horario_modelo = new mongoose.Schema({
    dia: { 
        type: Number, 
        required: true,
        min: 1,
        max: 7
    },
    minuto_inicio: {
         type: Number, 
         required: true,
         min: 0,
         max: 1439
        },
    minuto_fin: { type: Number,
         required: true,
         min: 0,
         max: 1440
        }

    }, { _id: false });

// Esquema para cada asignatura o sección matriculada
const detalle_modelo = new mongoose.Schema({
    seccion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seccion',
        required: true
    },
    asignatura_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    departamento_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    departamento_nombre: { 
        type: String,
         required: true
     },
    codigo_asignatura: { 
        type: String, 
        required: true 
    },
    nombre_asignatura: { 
        type: String, 
        required: true 
    },
    codigo_seccion: { 
        type: String, 
        required: true 
    },
    creditos: { 
        type: Number, 
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
        required: true },
    estado: {
        type: String,
        enum: ['activa', 'retirada'],
        required: true
    },
    retirada_en: { type: Date, default: null }
    }, { _id: false });

// Esquema principal de las matrículas
const matricula_modelo = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    codigo: {
         type: String, 
         required: true
         },
    estudiante_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    periodo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Periodo',
        required: true
    },
    estado: {
        type: String,
        enum: ['confirmada', 'parcialmente_retirada', 'cancelada'],
        required: true
    },
    confirmada_en: { 
        type: Date, 
        required: true 
    },
    total_creditos: {
         type: Number, 
         required: true,
         min: 0
        },
    detalle: { 
        type: [detalle_modelo],
         required: true
         }
});

const Matricula = mongoose.model('Matricula', matricula_modelo, 'matriculas');

module.exports = Matricula;
