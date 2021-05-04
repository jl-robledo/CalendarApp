/*
    Rutas de Usuarios / Auth
        host + /api/auth
*/

// para poder exportar la ruta 
const { Router } = require('express'); // podemos desestructurarlo sacando el Router
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

// para traernos las rutas
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();




// Ruta de usuario / auth
router.post(
    '/new',
    [   // middlewares para las validaciones 
        check( 'name' , 'El nombre es obligatorio.' ).not().isEmpty(),  // nombre obligatorio y que no este vacio
        check( 'email' , 'El email es obligatorio.' ).isEmail(),
        check( 'password' , 'El password debe de ser de 6 caracteres.' ).isLength( { min: 6 } ),
        validarCampos   // lo ponemos aqui para que se haga 
    ],
    crearUsuario
); 

router.post(
    '/',
    [ // middlewares para las validaciones
        check( 'email' , 'El email es obligatorio.' ).isEmail(),
        check( 'password' , 'El password debe de ser de 6 caracteres.' ).isLength( { min: 6 } ),
        validarCampos
    ],
    loginUsuario 
); 

router.get('/renew' , validarJWT , revalidarToken ); // para prolongar el token mientras navegen








// exportacion en node
module.exports = router;


