// configuracion para la conexion a la base de datos 
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        //comprobacion de la conexion
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD'); // nuevo error de js con el mensaje
    }
}

// exportacion de la funcion
module.exports = {
    dbConnection
}