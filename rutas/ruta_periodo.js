const express = require('express');
const router = express.Router();

const controladorPeriodo = require('../controladores/controlador_periodo');

router.post('/', controladorPeriodo.registrarPeriodo);

router.get('/', controladorPeriodo.obtenerPeriodos);

router.get('/:id', controladorPeriodo.obtenerPeriodoPorId);

router.put('/:id', controladorPeriodo.actualizarPeriodo);

router.delete('/:id', controladorPeriodo.eliminarPeriodo);

module.exports = router;

