require('dotenv').config();

const express = require('express');
const ConectarBaseDatos = require('./config/database');
const cors = require('cors');
//agregrar rutas
const rutaCarrera = require('./rutas/ruta_carrera');
const rutaDepartamento = require('./rutas/ruta_departamento');
const rutaPeriodo = require('./rutas/ruta_periodo');
const rutaAsignatura = require('./rutas/ruta_asignatura');
const rutaSeccion = require('./rutas/ruta_seccion');
const rutaUsuario = require('./rutas/ruta_usuario');

const app = express();

//Middlewares
app.use(cors());
//esto es pa interpretar json a la base de datos
app.use(express.json());

//agregar apps de rutas
app.use('/api/carreras', rutaCarrera);
app.use('/api/departamentos', rutaDepartamento);
app.use('/api/periodos', rutaPeriodo);
app.use('/api/asignaturas', rutaAsignatura);
app.use('/api/secciones', rutaSeccion);
app.use('/api/usuarios', rutaUsuario);


ConectarBaseDatos();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});