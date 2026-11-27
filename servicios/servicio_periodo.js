
const Periodo = require('../modelos/modelo_periodo');

const registrarPeriodo = async (datosPeriodo) => {

    const periodoExistente = await Periodo.findOne({
        nombre: datosPeriodo.nombre
    });

    if (periodoExistente) {
        throw new Error('Ya existe un período con ese nombre');
    }

    const nuevoPeriodo = await Periodo.create(datosPeriodo);
    return nuevoPeriodo;
};

const obtenerPeriodos = async () => {

    const periodos = await Periodo.find();
    return periodos;

};


const obtenerPeriodoPorId = async (id) => {

    const periodo = await Periodo.findOne({ id: id });
    return periodo;

};


const actualizarPeriodo = async (id, datosPeriodo) => {

    const periodo = await Periodo.findOne({ id: id });

    if (!periodo) {
        return null;
    }

    // con esto evitamos modificar los campos que tenemos protegidos
    delete datosPeriodo.id;
    delete datosPeriodo.creado_en;

    // aqui comprobamos si el nombre pertenece a otro período
    if (datosPeriodo.nombre) {

        const periodoExistente = await Periodo.findOne({
            nombre: datosPeriodo.nombre,
            id: { $ne: id }
        });

        if (periodoExistente) {
            throw new Error('Ya existe otro período con ese nombre');
        }
    }

    // Actualizar los campos enviados
    Object.assign(periodo, datosPeriodo);

    await periodo.save();

    return periodo;

};


const eliminarPeriodo = async (idPeriodo) => {

    const periodoEliminado = await Periodo.findOneAndUpdate(
        { id: idPeriodo },
        { estado: 'inactivo' },
        { new: true, runValidators: true }
    );

    return periodoEliminado;

};


module.exports = {registrarPeriodo,obtenerPeriodos,obtenerPeriodoPorId,actualizarPeriodo,eliminarPeriodo};
