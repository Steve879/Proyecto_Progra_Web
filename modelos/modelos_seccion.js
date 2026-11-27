
const mongoose = require('mongoose');


const horario_modelo = new mongoose.Schema({

    dia: {
        type: Number,
        required: true,
        min: 1,
        max: 7,
        validate: {
            validator: Number.isInteger,
            message: 'El día debe ser un número entero'
        }
    },

    hora_inicio: {
        type: String,
        required: true,
        match: [
            /^([01]\d|2[0-3]):[0-5]\d$/,
            'La hora de inicio debe tener formato HH:mm'
        ]
    },

    hora_fin: {
        type: String,
        required: true,
        match: [
            /^([01]\d|2[0-3]):[0-5]\d$/,
            'La hora de finalización debe tener formato HH:mm'
        ],
        validate: {
            validator: function(valor) {
                return /^\d{2}:\d{2}$/.test(valor) &&
                    valor > this.hora_inicio;
            },
            message: 'La hora de finalización debe ser posterior a la hora de inicio'
        }
    }

}, { _id: false });



// Modelo principal de secciones
const seccion_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        trim: true
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
        required: true,
        trim: true
    },

    docente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    aula: {
        type: String,
        required: true,
        trim: true
    },

    horario: {
        type: [horario_modelo],
        required: true,
        validate: {
            validator: function(horarios) {
                return horarios.length > 0;
            },
            message: 'La sección debe tener al menos un horario'
        }
    },

    cupo_maximo: {
        type: Number,
        required: true,
        min: [1, 'El cupo máximo debe ser al menos 1'],
        validate: {
            validator: Number.isInteger,
            message: 'El cupo máximo debe ser un número entero'
        }
    },

    matriculados: {
        type: Number,
        default: 0,
        min: [0, 'La cantidad de matriculados no puede ser negativa'],
        validate: {
            validator: function(valor) {
                return Number.isInteger(valor) &&
                    valor <= this.cupo_maximo;
            },
            message: 'Los matriculados no pueden superar el cupo máximo'
        }
    },

    estado: {
        type: String,
        enum: ['activa', 'inactiva'],
        default: 'activa'
    }

});

const Seccion = mongoose.model(
    'Seccion',
    seccion_modelo,
    'secciones'
);

module.exports = Seccion;
