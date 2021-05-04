
// validacion comun de la fecha

const moment = require('moment');


const isDate = ( value, { req, location, path } ) => {

    // console.log(value);
    // console.log(req, location, path);
    
    if (!value) {   // comporbacion de si existe o no 
        return false;
    }

    const fecha = moment( value );  
    
    if ( fecha.isValid() ) {  // si la fecha no es correcta...
        return true;
    } else {
        return false;
    }
    
}


module.exports = {
    isDate
};
