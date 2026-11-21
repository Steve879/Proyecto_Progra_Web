require('dotenv').config();

const express = require('express');
const ConectarBaseDatos = require('./config/database');
//agregrar rutas
const rutaCarrera = require('./rutas/ruta_carrera');


const app = express();

//esto es pa interpretar json a la base de datos
app.use(express.json());

//agregar apps de rutas
app.use('/api/carreras', rutaCarrera);



ConectarBaseDatos();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});