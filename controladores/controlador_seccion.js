
const servicioSeccion = require('../servicios/servicio_seccion');

const registrarSeccion = async (req, res) => {
    try {
        const nuevaSeccion = await servicioSeccion.registrarSeccion(req.body);

        res.status(201).json({
            mensaje: 'Sección registrada correctamente',
            datos: nuevaSeccion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar la sección',
            error: error.message
        });
    }
};

const obtenerSecciones = async (req, res) => {
    try {
        const secciones = await servicioSeccion.obtenerSecciones();

        res.status(200).json({
            mensaje: 'Secciones obtenidas correctamente',
            datos: secciones
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las secciones',
            error: error.message
        });
    }
};

const obtenerSeccionPorId = async (req, res) => {
    try {
        const seccion = await servicioSeccion.obtenerSeccionPorId(req.params.id);

        if (!seccion) {
            return res.status(404).json({
                mensaje: 'Sección no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Sección encontrada correctamente',
            datos: seccion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar la sección',
            error: error.message
        });
    }
};

const actualizarSeccion = async (req, res) => {
    try {
        const seccionActualizada = await servicioSeccion.actualizarSeccion(
            req.params.id,
            req.body
        );

        if (!seccionActualizada) {
            return res.status(404).json({
                mensaje: 'Sección no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Sección actualizada correctamente',
            datos: seccionActualizada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la sección',
            error: error.message
        });
    }
};

const eliminarSeccion = async (req, res) => {
    try {
        const seccionEliminada = await servicioSeccion.eliminarSeccion(req.params.id);

        if (!seccionEliminada) {
            return res.status(404).json({
                mensaje: 'Sección no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Sección desactivada correctamente',
            datos: seccionEliminada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar la sección',
            error: error.message
        });
    }
};

module.exports = {registrarSeccion,obtenerSecciones,obtenerSeccionPorId,actualizarSeccion,eliminarSeccion};
