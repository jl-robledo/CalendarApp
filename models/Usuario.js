
const { Schema , model } = require('mongoose');

const UsuarioSchema = Schema({  // configuracion del objeto para guardar en base de datos, definicion
                                // agregamos los campos que queremos 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    // que no pueda haber dos iguales KEY
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = model( 'Usuario' , UsuarioSchema );


