const express = require('express');
const router = express.Router();

const controladorAsignatura = require('../controladores/controlador_asignatura');

router.post('/', controladorAsignatura.registrarAsignatura);

router.get('/', controladorAsignatura.obtenerAsignaturas);

router.get('/:id', controladorAsignatura.obtenerAsignaturaPorId);

router.put('/:id', controladorAsignatura.actualizarAsignatura);

router.delete('/:id', controladorAsignatura.eliminarAsignatura);

module.exports = router;