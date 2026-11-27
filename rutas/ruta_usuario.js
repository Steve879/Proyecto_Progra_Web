
const express = require('express');
const router = express.Router();

const controladorUsuario = require('../controladores/controlador_usuario');


router.post('/', controladorUsuario.registrarUsuario);


router.get('/', controladorUsuario.obtenerUsuarios);


router.get('/:id', controladorUsuario.obtenerUsuarioPorId);


router.put('/:id', controladorUsuario.actualizarUsuario);


router.delete('/:id', controladorUsuario.eliminarUsuario);

module.exports = router;
