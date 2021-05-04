const { response } = require('express');
const Evento = require('../models/Evento');


// obtener eventos -> Leer
const getEventos = async ( req , res = response ) => {

    // pruebas
    // res.json({
    //     ok: true,
    //     msg: 'getEventos'
    // })


    const eventos = await Evento.find()   // traemos todos los eventos
                                .populate( 'user' , 'name' );    // rellenar los datos del usuario y solo cogemos el nombre
    res.json({
        ok: true,
        eventos
    })
}


// crear un nuevo evento
const crearEvento = async ( req , res = response ) => {

    // verificar que tengo el evento
    // console.log( req.body );
    // res.json({
    //     ok: true,
    //     msg: 'crearEvento'
    // })

    const evento = new Evento( req.body );  // para mandar los datos a la BBDD

    try {
        
        evento.user = req.uid;   // para traernos el id del usuario

        const eventoGuardado =  await evento.save();
        
        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
    
}



// actualizar un evento
const actualizarEvento = async ( req , res = response ) => {

    // pruebas 
    // res.json({
    //     ok: true,
    //     eventoId    // paso el id tomado del usuario 
    // })

    // tomar el id del usuario a traves de la url
    const eventoId =  req.params.id;
    const uid = req.uid;

    try {
        
        // verificar si existe en la BBDD
        const evento = await Evento.findById( eventoId );

        // validacion de si el evento existe
        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // comprobar la persona que hace la modificacion es la correcta
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId , nuevoEvento , { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error); // se deberia de aportar mas datos fecha y hora
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}




// borrar un evento
const eliminarEvento = async ( req , res = response ) => {

    // pruebas
    // res.json({
    //     ok: true,
    //     msg: 'eliminarEvento'
    // })

    // tomar el id del usuario a traves de la url
    const eventoId =  req.params.id;
    const uid = req.uid;

    try {
        
        // verificar si existe en la BBDD
        const evento = await Evento.findById( eventoId );

        // validacion de si el evento existe
        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // comprobar la persona que hace la modificacion es la correcta
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error); // se deberia de aportar mas datos fecha y hora
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}