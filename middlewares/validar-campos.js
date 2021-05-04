

const { response }= require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req , res = response , next ) => {

    // validaciones con express-validator - manejo de errores
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {   // si hay errores
        return res.status(400).json({   // return para que no se ejecute la otra y cambiamos el status
            ok: false,
            errores: errores.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos
}


