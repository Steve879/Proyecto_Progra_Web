
const express = require('express');
const router = express.Router();

const controladorCarrera = require('../controladores/controlador_carrera');


router.post('/', controladorCarrera.registrarCarrera);

router.get('/', controladorCarrera.obtenerCarreras);

router.get('/:id', controladorCarrera.obtenerCarreraPorId);

router.put('/:id', controladorCarrera.actualizarCarrera);

router.delete('/:id', controladorCarrera.eliminarCarrera);

module.exports = router;
