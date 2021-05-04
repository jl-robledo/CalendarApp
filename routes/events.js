// crear el CRUD

/* 
    Event Routes 
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt'); 
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();



//todas tienen que pasar la validacion del JWT
router.use( validarJWT );   // desde aqui todo esta protegido, si hay algo publico hay que ponerlo antes




// obtener eventos
router.get( '/' , getEventos );




// crear un nuevo evento
router.post( 
    '/' ,
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(), //que siempre tenga informacion
        check('start', 'Fecha de inicio obligatoria').custom( isDate ), // fecha de inicio obligatoria
        check('end', 'Fecha de fin obligatoria').custom( isDate ),  //fecha de fin obligatoria
        validarCampos // detenemos todo si encuentra un error con este middleware
    ],
    crearEvento 
);




// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(), //que siempre tenga informacion
        check('start', 'Fecha de inicio obligatoria').custom( isDate ), // fecha de inicio obligatoria
        check('end', 'Fecha de fin obligatoria').custom( isDate ),  //fecha de fin obligatoria
        validarCampos // detenemos todo si encuentra un error con este middleware
    ],
    actualizarEvento);




// borrar evento
router.delete( '/:id' , eliminarEvento );


module.exports = router;