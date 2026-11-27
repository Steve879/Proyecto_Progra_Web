
const mongoose = require('mongoose');

const periodo_modelo = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
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
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: 'Los créditos máximos deben ser un número entero'
        }
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
        required: true
    }
}, {
    validateBeforeSave: true
});

// Validación de las fechas del período para que no sean incoherentes
periodo_modelo.pre('validate', function() {

    if (
        this.inicio_matricula &&
        this.fin_matricula &&
        this.inicio_matricula >= this.fin_matricula
    ) {
        this.invalidate(
            'fin_matricula',
            'El fin de matrícula debe ser posterior al inicio de matrícula'
        );
    }

    if (
        this.fin_matricula &&
        this.fecha_inicio &&
        this.fin_matricula > this.fecha_inicio
    ) {
        this.invalidate(
            'fin_matricula',
            'La matrícula debe finalizar antes del inicio del período académico'
        );
    }

    if (
        this.fecha_limite_retiro &&
        this.fecha_inicio &&
        this.fecha_limite_retiro < this.fecha_inicio
    ) {
        this.invalidate(
            'fecha_limite_retiro',
            'La fecha límite de retiro no puede ser anterior al inicio del período'
        );
    }

});

const Periodo = mongoose.model('Periodo', periodo_modelo, 'periodos');

module.exports = Periodo;
