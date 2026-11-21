
const servicioCarrera = require('../servicios/servicio_carrera');


async function registrarCarrera(req, res) {
    try {
        const carrera = await servicioCarrera.registrarCarrera(req.body);

        res.status(201).json({
            mensaje: 'Carrera registrada correctamente',
            datos: carrera
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar la carrera',
            error: error.message
        });
    }
}

// Obtener todas las carreras
async function obtenerCarreras(req, res) {
    try {
        const carreras = await servicioCarrera.obtenerCarreras();

        res.status(200).json({
            mensaje: 'Carreras obtenidas correctamente',
            datos: carreras
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las carreras',
            error: error.message
        });
    }
}

// Obtener una carrera por su ID
async function obtenerCarreraPorId(req, res) {
    try {
        const carrera = await servicioCarrera.obtenerCarreraPorId(req.params.id);

        if (!carrera) {
            return res.status(404).json({
                mensaje: 'No se encontró la carrera'
            });
        }

        res.status(200).json({
            mensaje: 'Carrera encontrada correctamente',
            datos: carrera
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la carrera',
            error: error.message
        });
    }
}

// Actualizar una carrera
async function actualizarCarrera(req, res) {
    try {
        const carrera = await servicioCarrera.actualizarCarrera(
            req.params.id,
            req.body
        );

        if (!carrera) {
            return res.status(404).json({
                mensaje: 'No se encontró la carrera'
            });
        }

        res.status(200).json({
            mensaje: 'Carrera actualizada correctamente',
            datos: carrera
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la carrera',
            error: error.message
        });
    }
}

// Desactivar una carrera
async function eliminarCarrera(req, res) {
    try {
        const carrera = await servicioCarrera.eliminarCarrera(req.params.id);

        if (!carrera) {
            return res.status(404).json({
                mensaje: 'No se encontró la carrera'
            });
        }

        res.status(200).json({
            mensaje: 'Carrera desactivada correctamente',
            datos: carrera
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar la carrera',
            error: error.message
        });
    }
}

module.exports = {registrarCarrera,obtenerCarreras,obtenerCarreraPorId,actualizarCarrera,eliminarCarrera};
