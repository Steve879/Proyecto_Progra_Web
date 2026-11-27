
const Asignatura = require('../modelos/modelo_asignatura');

const registrarAsignatura = async (datosAsignatura) => {
    const nuevaAsignatura = await Asignatura.create(datosAsignatura);
    return nuevaAsignatura;
};

const obtenerAsignaturas = async () => {
    const asignaturas = await Asignatura.find();
    return asignaturas;
};

const obtenerAsignaturaPorId = async (id) => {
    const asignatura = await Asignatura.findOne({ id: id });
    return asignatura;
};

const actualizarAsignatura = async (id, datosAsignatura) => {
    const asignaturaActualizada = await Asignatura.findOneAndUpdate(
        { id: id },
        datosAsignatura,
        { new: true, runValidators: true }
    );

    return asignaturaActualizada;
};

const eliminarAsignatura = async (idAsignatura) => {
    const asignaturaEliminada = await Asignatura.findOneAndUpdate(
        { id: idAsignatura },
        { estado: 'inactiva' },
        { new: true, runValidators: true }
    );

    return asignaturaEliminada;
};

module.exports = {obtenerAsignaturas,registrarAsignatura,eliminarAsignatura,obtenerAsignaturaPorId,actualizarAsignatura};
