
const express = require('express');
const router = express.Router();

const controladorCarrera = require('../controladores/controlador_carrera');

// Registrar una carrera
router.post('/', controladorCarrera.registrarCarrera);

// Obtener todas las carreras
router.get('/', controladorCarrera.obtenerCarreras);

// Obtener una carrera por su ID
router.get('/:id', controladorCarrera.obtenerCarreraPorId);

// Actualizar una carrera
router.put('/:id', controladorCarrera.actualizarCarrera);

// Desactivar una carrera
router.delete('/:id', controladorCarrera.eliminarCarrera);

module.exports = router;
