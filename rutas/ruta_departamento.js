
const express = require('express');
const router = express.Router();

const controladorDepartamento = require('../controladores/controlador_departamento');


router.post('/', controladorDepartamento.registrarDepartamento);

router.get('/', controladorDepartamento.obtenerDepartamentos);

router.get('/:id', controladorDepartamento.obtenerDepartamentoPorId);

router.put('/:id', controladorDepartamento.actualizarDepartamento);

router.delete('/:id', controladorDepartamento.eliminarDepartamento);

module.exports = router;
