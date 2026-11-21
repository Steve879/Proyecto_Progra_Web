
const Carrera = require('../modelos/modelo_carrera');


async function registrarCarrera(datos) {
    const carrera = new Carrera(datos);
    return await carrera.save();
}


async function obtenerCarreras() {
    return await Carrera.find();
}


async function obtenerCarreraPorId(id) {
    return await Carrera.findOne({ id: id });
}


async function actualizarCarrera(id, datos) {
    return await Carrera.findOneAndUpdate(
        { id: id },
        datos,
        {
            new: true,
            runValidators: true
        }
    );
}

// Desactivar una carrera
async function eliminarCarrera(id) {
    return await Carrera.findOneAndUpdate(
        { id: id },
        { estado: 'inactiva' },
        {
            new: true,
            runValidators: true
        }
    );
}

module.exports = {registrarCarrera,obtenerCarreras,obtenerCarreraPorId,actualizarCarrera,eliminarCarrera};
