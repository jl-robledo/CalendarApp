const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req , res = response , next ) => {

    // lo voy a pedir x-token en los headers
    const token = req.header('x-token');

    // para comprobar que funciona
    // console.log(token);
    
    // validacion para el token
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid , name } /*payload*/ = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        //console.log(payload)
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();

}

module.exports = {
    validarJWT
}

