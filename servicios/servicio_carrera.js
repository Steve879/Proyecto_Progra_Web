
const Carrera = require('../modelos/modelo_carrera');

const registrarCarrera = async (datosCarrera) => {

    const carreraExistente = await Carrera.findOne({
        codigo: datosCarrera.codigo
    });

    if (carreraExistente) {
        throw new Error('Ya existe una carrera con ese código');
    }

    const nuevaCarrera = await Carrera.create(datosCarrera);
    return nuevaCarrera;
};


const obtenerCarreras = async () => {

    const carreras = await Carrera.find();
    return carreras;

};


const obtenerCarreraPorId = async (id) => {

    const carrera = await Carrera.findOne({ id: id });
    return carrera;

};


const actualizarCarrera = async (id, datosCarrera) => {

    delete datosCarrera.id;

    if (datosCarrera.codigo) {

        const carreraExistente = await Carrera.findOne({
            codigo: datosCarrera.codigo,
            id: { $ne: id }
        });

        if (carreraExistente) {
            throw new Error('Ya existe otra carrera con ese código');
        }
    }

    const carreraActualizada = await Carrera.findOneAndUpdate(
        { id: id },
        datosCarrera,
        { new: true, runValidators: true }
    );

    return carreraActualizada;

};


const eliminarCarrera = async (idCarrera) => {

    const carreraEliminada = await Carrera.findOneAndUpdate(
        { id: idCarrera },
        { estado: 'inactiva' },
        { new: true, runValidators: true }
    );

    return carreraEliminada;

};


module.exports = {obtenerCarreras,registrarCarrera,eliminarCarrera,obtenerCarreraPorId,actualizarCarrera};
