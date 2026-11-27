
const servicioDepartamento = require('../servicios/servicio_departamento');


async function registrarDepartamento(req, res) {
    try {
        const departamento = await servicioDepartamento.registrarDepartamento(req.body);

        res.status(201).json({
            mensaje: 'Departamento registrado correctamente',
            datos: departamento
        });

    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}


async function obtenerDepartamentos(req, res) {
    try {
        const departamentos = await servicioDepartamento.obtenerDepartamentos();

        res.status(200).json({
            mensaje: 'Departamentos obtenidos correctamente',
            datos: departamentos
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


async function obtenerDepartamentoPorId(req, res) {
    try {
        const departamento = await servicioDepartamento.obtenerDepartamentoPorId(req.params.id);

        if (!departamento) {
            return res.status(404).json({
                mensaje: 'Departamento no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Departamento encontrado correctamente',
            datos: departamento
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


async function actualizarDepartamento(req, res) {
    try {
        const departamento = await servicioDepartamento.actualizarDepartamento(
            req.params.id,
            req.body
        );

        if (!departamento) {
            return res.status(404).json({
                mensaje: 'Departamento no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Departamento actualizado correctamente',
            datos: departamento
        });

    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}


async function eliminarDepartamento(req, res) {
    try {
        const departamento = await servicioDepartamento.eliminarDepartamento(req.params.id);

        if (!departamento) {
            return res.status(404).json({
                mensaje: 'Departamento no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Departamento desactivado correctamente',
            datos: departamento
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {registrarDepartamento,obtenerDepartamentos,obtenerDepartamentoPorId,actualizarDepartamento,eliminarDepartamento};
