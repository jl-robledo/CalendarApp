// para requerir el intellisense
const express = require('express'); // se puede desestructurar solo el response { reponse }
// const { validationResult } = require('express-validator');
// para la encriptacion de la contraseña
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');   // importamos el modelo del objeto para guardar en la BD
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async ( req, res = express.response ) => {

    // como las validaciones se van a ir repitiendo mejor usar un middleware

    // validaciones sin express-validator
    //  if ( name.length < 5 ) {
    //     return res.status(400).json({ // se pone el return para que no continue, se debe de poner en todos lo res.
    //         ok: 'false',
    //         msg: 'El nombre debe de ser de 5 letras'
    //     });
    // }

    // validaciones con express-validator - manejo de errores
    // const errores = validationResult( req );
    // if ( !errores.isEmpty() ) {   // si hay errores
    //     return res.status(400).json({   // return para que no se ejecute la otra y cambiamos el status
    //         ok: false,
    //         errores: errores.mapped()
    //     });
    // }

    //console.log(req);
    const { email , password } = req.body;

    try {       // cuando se trabaja con BD mejor trycatch

        // validacion del nuevo usuario si el correo existe no se graba 
        let usuario = await Usuario.findOne( { email } );

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }

        usuario = new Usuario( req.body );   // instancia le pasamos lo que hay en el body despues de hacer la comprobacion de que no existe
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(  ); // especificamos el numero de vueltas que queramos por defecto 10
        usuario.password = bcrypt.hashSync( password , salt );
        
        await usuario.save(); // lo grabamos en la BD

        // TODO: Generar nuestro JWT cuando ya esta autenticado 
        const token = await generarJWT( usuario.id, usuario.name );


        
        res.status(201).json({  // cambiamos el status 201 cada vez que se graba informacion
            ok: true,
            uid: usuario.id,        // pasamos el id
            name: usuario.name,     // pasamos el nombre 
            token                   // el token: token
            // msg: 'registro',
            // name,    // los quitamos para pasarlo a la base de datos 
            // email,
            // password
        });

    } catch (error) {       // por si falla y esta comprobando a la vez la KEY
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const loginUsuario = async ( req, res = express.response ) => {

    const { email , password } = req.body;


    try {

        const  usuario = await Usuario.findOne( { email } );  // no la vamos a reutilizar

        if ( !usuario ) {   // si no existe el email del usuario
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos.'
            });
        }

        // confirmar los passwords - esta encriptado
        const validPassword = bcrypt.compareSync( password , usuario.password );

        if ( !validPassword ) { // si no es valido el password
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos.' // se pone un mensaje que no especifique si es la contraseña o el email
            });
        }


        // TODO: Generar nuestro JWT cuando ya esta autenticado 
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

    // res.json({       lo eliminamos des pues de las pruebas porque ya lo tenemos implementado
    //     ok: true,
    //     msg: 'login',
    //     email,
    //     password
    // })
}



const revalidarToken = async ( req, res = express.response ) => {

    // const uid = req.uid;
    // const name = req.name; // lo mismo aqui abajo pero mas elegante
    const { uid , name } = req;

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        // uid: uid, // se especifica asi o como en la siguiente linea
        // name
        token
    });
}




module.exports = {
    crearUsuario , 
    loginUsuario,
    revalidarToken
}


