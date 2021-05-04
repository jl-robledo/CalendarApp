
const { Schema , model } = require('mongoose');

const EventoSchema = Schema({  // configuracion del objeto para guardar en base de datos, definicion
                                // agregamos los campos que queremos 
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { // quien grabo el registro
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// especificar como queremos los campos de la BBDD y personalizarla
EventoSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();   // extraemos la version y el id
    object.id = _id;   // editamos los nombres
    return object;
});


module.exports = model( 'Evento' , EventoSchema );