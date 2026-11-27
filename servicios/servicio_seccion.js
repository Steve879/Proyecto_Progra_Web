
const Seccion = require('../modelos/modelos_seccion');

const registrarSeccion = async (datosSeccion) => {
    const nuevaSeccion = await Seccion.create(datosSeccion);
    return nuevaSeccion;
};

const obtenerSecciones = async () => {
    const secciones = await Seccion.find();
    return secciones;
};

const obtenerSeccionPorId = async (id) => {
    const seccion = await Seccion.findOne({ id: id });
    return seccion;
};

const actualizarSeccion = async (id, datosSeccion) => {
    const seccionActualizada = await Seccion.findOneAndUpdate(
        { id: id },
        datosSeccion,
        { new: true, runValidators: true }
    );

    return seccionActualizada;
};

const eliminarSeccion = async (idSeccion) => {
    const seccionEliminada = await Seccion.findOneAndUpdate(
        { id: idSeccion },
        { estado: 'inactiva' },
        { new: true, runValidators: true }
    );

    return seccionEliminada;
};


module.exports = {obtenerSecciones,registrarSeccion,eliminarSeccion,obtenerSeccionPorId,actualizarSeccion};
