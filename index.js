
// configuracion de express
const express = require('express');
require('dotenv').config(); // para tener las variables de entonrno despues de "npm i dotenv"
const cors =  require('cors');
const { dbConnection } = require('./database/config');  // conexion a la BD


// ver todos los procesos que estan corriendo y ver en que puerto esta corriendo
// console.log( process.env ); asi los pasamos a una variable process.env.PORT
// si se actualizara el puerto e a traves del archivo .env habria que recargar la app


// crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

//aplicacion del cors  -> capa de seguridad
app.use( cors() );


// Directorio Publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );


// definicion de las RUTAS
// TODO: auth // crear, login, renew
app.use( '/api/auth', require('./routes/auth') );

// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events') );



// escuchar peticiones
app.listen( process.env.PORT , () => {  // cambiamos el numero de puerto por la variable de entorno 
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
} );