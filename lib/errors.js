'use strict';

var _extend = require ( 'util' )._extend;
var lang    = require ( './lang' );

/**
 *
 * @param message
 * @param langid
 * @returns {*}
 */
function translateMessage ( message, langid ) {
    if ( typeof message === 'object' ) {
        return lang.translate ( message.template, langid, message.values );
    } else {
        return lang.translate ( message, langid );
    }
}

/**
 *
 * @param err
 * @param langid
 * @returns {{json: json}}
 */
var errors = function ( err, langid ) {

    var status = 500;
    var json   = { ok: false, error: {} };

    // Si es una instancia de 'Error' lo convertimos
    if ( err instanceof Error ) {
        json.error.code    = 500;
        json.error.message = err.message;
    } else {
        // Extraer status si lo tiene
        if ( err.status ) {
            status = err.status;
            // Eliminar el estatus
            delete err.status;
        }
        // Añadir resto de propiedades => extendemos para heredar
        _extend ( json.error, err );

        // Traducir message
        if ( json.error.message ) {
            json.error.message = translateMessage ( json.error.message, langid );
        }

        // Traducir errores
        if ( json.error.errors ) {
            // Itero por los errores que recibo
            json.error.errors.forEach ( ( error )=> {
                if ( error.message ) {
                    // Si no tiene field se lo pongo o lo traduzco
                    if ( typeof error.message === 'object' ) {
                        error.message.values.field = error.field || lang.translate ( 'the_field', langid );
                        // Traduzco el mensaje de error, le paso un objeto
                        // con el template y los values y el id del idioma
                        error.message = translateMessage ( {
                            template: error.message.template,
                            values  : error.message.values
                        }, langid );
                    } else {
                        error.message = translateMessage ( {
                            template: error.message,
                            values  : {
                                field: error.field || lang.translate ( 'the_field' )
                            }
                        }, langid );
                    }
                }
            } );
        }
    }

    return {
        json: ( res )=> {
            if ( res ) {
                return res.status ( status ).json ( json );
            }
            return json;
        }
    };
};

module.exports = errors;
