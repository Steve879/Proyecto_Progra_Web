const servicioPeriodo = require('../servicios/servicio_periodo');

async function registrarPeriodo(req, res) {
    try {
        const periodo = await servicioPeriodo.registrarPeriodo(req.body);
        
        res.status(201).json({
            mensaje: 'Periodo registrado correctamente', 
            datos: periodo});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function obtenerPeriodos(req, res) {
    try {
        const periodos = await servicioPeriodo.obtenerPeriodos();

        res.status(200).json({
            mensaje: 'Periodos obtenidos correctamente',
            datos: periodos
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function obtenerPeriodoPorId(req, res) {
    try {
        const periodo = await servicioPeriodo.obtenerPeriodoPorId(req.params.id);

        res.status(200).json({
            mensaje: 'Periodo obtenido correctamente',
            datos: periodo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function actualizarPeriodo(req, res) {
    try {
        const periodo = await servicioPeriodo.actualizarPeriodo(req.params.id, req.body);

        res.status(200).json({
            mensaje: 'Periodo actualizado correctamente',
            datos: periodo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function eliminarPeriodo(req, res) {
    try {
        const periodo = await servicioPeriodo.eliminarPeriodo(req.params.id);

        res.status(200).json({
            mensaje: 'Periodo eliminado correctamente',
            datos: periodo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {registrarPeriodo, obtenerPeriodos, obtenerPeriodoPorId, actualizarPeriodo, eliminarPeriodo};