'use strict';

var _extend = require ( 'util' )._extend;
var lang    = require ( './lang' );

function translateMessage ( message, langid ) {
    if ( typeof message === 'object' ) {
        return lang.translate ( message.template, langid, message.values );
    } else {
        return lang.translate ( message, langid );
    }
}

var errors = function ( err, langid ) {

    var status = 500;
    var json   = { ok: false, error: {} };

    // Si es del tipo Error convertirlo
    if ( err instanceof Error ) {
        json.error.code    = 500;
        json.error.message = err.message;
    } else {
        // Extraer status si lo tiene
        if ( err.status ) {
            status = err.status;
            delete err.status;
        }
        // Añadir resto de propiedades
        _extend ( json.error, err );

        // Traducir message
        if ( json.error.message ) {
            json.error.message = translateMessage ( json.error.message, langid );
        }

        // Traducir errores
        if ( json.error.errors ) {
            json.error.errors.forEach ( ( error )=> {
                if ( error.message ) {
                    // Si no tiene field se lo pongo
                    if ( typeof error.message === 'object' ) {
                        error.message.values.field = error.field || lang.translate ( 'the_field', langid );
                        error.message              = translateMessage ( {
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
