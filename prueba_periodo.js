
require('dotenv').config();

const mongoose = require('mongoose');
const Periodo = require('./modelos/modelo_periodo');

async function guardarPeriodo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');

        const periodo = new Periodo({
         id: 'PER-2027-II',
nombre: '2027-II',
fecha_inicio: new Date('2027-08-03'),
inicio_matricula: new Date('2027-07-15'),
fin_matricula: new Date('2027-08-07'),
fecha_limite_retiro: new Date('2027-09-15'),
creditos_maximos: 18,
estado: 'abierto'
        });

        await periodo.save();

        console.log('Período guardado correctamente');

    } catch (error) {
        console.error('Error:', error.message);

    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    }
}

guardarPeriodo();
