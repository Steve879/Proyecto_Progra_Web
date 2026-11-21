const mongoose = require('mongoose');

const asignatura_modelo = new mongoose.Schema({   

    id: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    departamento_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    tipo: {
        type: String,
        enum: ['carrera','general', 'extracurricular'],
        required: true
    },
    carrera_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera'
    }],
    prerequisitos_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura'
    }],
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

const Asignatura = mongoose.model('Asignatura', asignatura_modelo, 'asignaturas');
module.exports = Asignatura;