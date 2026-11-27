
const servicioAsignatura = require('../servicios/servicio_asignatura');

const registrarAsignatura = async (req, res) => {
    try {
        const nuevaAsignatura = await servicioAsignatura.registrarAsignatura(req.body);

        res.status(201).json({
            mensaje: 'Asignatura registrada correctamente',
            datos: nuevaAsignatura
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar la asignatura',
            error: error.message
        });
    }
};

const obtenerAsignaturas = async (req, res) => {
    try {
        const asignaturas = await servicioAsignatura.obtenerAsignaturas();

        res.status(200).json({
            mensaje: 'Asignaturas obtenidas correctamente',
            datos: asignaturas
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las asignaturas',
            error: error.message
        });
    }
};

const obtenerAsignaturaPorId = async (req, res) => {
    try {
        const asignatura = await servicioAsignatura.obtenerAsignaturaPorId(req.params.id);

        if (!asignatura) {
            return res.status(404).json({
                mensaje: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Asignatura encontrada correctamente',
            datos: asignatura
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar la asignatura',
            error: error.message
        });
    }
};

const actualizarAsignatura = async (req, res) => {
    try {
        const asignaturaActualizada = await servicioAsignatura.actualizarAsignatura(
            req.params.id,
            req.body
        );

        if (!asignaturaActualizada) {
            return res.status(404).json({
                mensaje: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Asignatura actualizada correctamente',
            datos: asignaturaActualizada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la asignatura',
            error: error.message
        });
    }
};

const eliminarAsignatura = async (req, res) => {
    try {
        const asignaturaEliminada = await servicioAsignatura.eliminarAsignatura(req.params.id);

        if (!asignaturaEliminada) {
            return res.status(404).json({
                mensaje: 'Asignatura no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Asignatura desactivada correctamente',
            datos: asignaturaEliminada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar la asignatura',
            error: error.message
        });
    }
};

module.exports = {registrarAsignatura,obtenerAsignaturas,obtenerAsignaturaPorId,actualizarAsignatura,eliminarAsignatura};
