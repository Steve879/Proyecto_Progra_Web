
const Departamento = require('../modelos/modelo_departamento');

const registrarDepartamento = async (datosDepartamento) => {

    const departamentoExistente = await Departamento.findOne({
        codigo: datosDepartamento.codigo
    });

    if (departamentoExistente) {
        throw new Error('Ya existe un departamento con ese código');
    }

    const nuevoDepartamento = await Departamento.create(datosDepartamento);
    return nuevoDepartamento;
};

const obtenerDepartamentos = async () => {

    const departamentos = await Departamento.find();
    return departamentos;

};


const obtenerDepartamentoPorId = async (id) => {

    const departamento = await Departamento.findOne({ id: id });
    return departamento;

};


const actualizarDepartamento = async (id, datosDepartamento) => {

    delete datosDepartamento.id;

    if (datosDepartamento.codigo) {

        const departamentoExistente = await Departamento.findOne({
            codigo: datosDepartamento.codigo,
            id: { $ne: id }
        });

        if (departamentoExistente) {
            throw new Error('Ya existe otro departamento con ese código');
        }
    }

    const departamentoActualizado = await Departamento.findOneAndUpdate(
        { id: id },
        datosDepartamento,
        { new: true, runValidators: true }
    );

    return departamentoActualizado;

};


const eliminarDepartamento = async (idDepartamento) => {

    const departamentoEliminado = await Departamento.findOneAndUpdate(
        { id: idDepartamento },
        { estado: 'inactivo' },
        { new: true, runValidators: true }
    );

    return departamentoEliminado;

};


module.exports = {registrarDepartamento,obtenerDepartamentos,obtenerDepartamentoPorId,actualizarDepartamento,eliminarDepartamento};
