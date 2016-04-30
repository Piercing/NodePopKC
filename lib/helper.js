'use strict';

// Función helper:  hace llamadas a func, con
// cada elemento del array que recibe => 'arr'
// cuando  acabe  llamará  a ==> 'callbackFin'
var iterateArrays = function ( arr, func, callbackFin ) {
    if ( arr.length > 0 ) {
        // saco el primer elemento del array
        func ( arr.shift (), function ( err ) {
            if ( err ) {
                return callbackFin ( err );
            }
            // cuando  termine  'func', vuelvo a llamarme
            // a mismo 'serie' para procesar el siguiente
            iterateArrays ( arr, func, callbackFin );
        } );
    } else {
        // si arr.length llega a 0 es que he acabado,llamo
        // a la función que pasaron para ello, callbackFin
        callbackFin ();
    }
};

module.exports = {
    iterateArrays: iterateArrays
};
