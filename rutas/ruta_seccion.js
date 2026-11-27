const express = require('express');
const router = express.Router();

const controladorAsignatura = require('../controladores/controlador_asignatura');

router.post('/asignaturas', controladorAsignatura.registrarAsignatura);

router.get('/asignaturas', controladorAsignatura.obtenerAsignaturas);

router.get('/asignaturas/:id', controladorAsignatura.obtenerAsignaturaPorId);

router.put('/asignaturas/:id', controladorAsignatura.actualizarAsignatura);

router.delete('/asignaturas/:id', controladorAsignatura.eliminarAsignatura);

module.exports = router;