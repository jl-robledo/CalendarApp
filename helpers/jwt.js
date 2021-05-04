
// importamos la libreria
const jwt = require('jsonwebtoken');


// funcion de generar jwt
const generarJWT = ( uid , name ) => {

    // retornar una promesa para esperar al await..
    return new Promise( ( resolve , reject ) => {

        const payload = { uid, name };

        jwt.sign( payload , process.env.SECRET_JWT_SEED , {
            expiresIn: '2h' // que dure dos horas
        }, ( err , token ) => {

            if ( err ) {
                console.log(err)
                reject( 'No se pudo generar el TOKEN' )
            }

            resolve( token );
        })

    })

}

module.exports = {
    generarJWT
}
