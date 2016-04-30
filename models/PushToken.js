/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

var mongoose = require ( 'mongoose' );
var Usuario  = mongoose.model ( 'Usuario' );

// definir esquema de PushToken
var pushTokenSchema = mongoose.Schema ( {
    plataforma: { type: String, enum: [ 'ios', 'android' ], index: true },
    token     : { type: String, index: true },
    usuario   : { type: String, index: true },
    createDate: Date
} );


/**
 *
 * @param user
 * @param cb
 * @returns {*}
 */
pushTokenSchema.statics.register = function ( user, cb ) {

    // Hacemos las validaciones
    var validateErrors = [];
    if ( ! user.token ) {
        validateErrors.push ( { field: 'token', message: 'validation_invalid' } );
    }

    // Obtener la plataforma del usuario
    if ( user.plataforma ) {
        user.plataforma = user.plataforma.toLowerCase ();
        // Error al comprobar plataforma => != iOS o Android
        if ( ! (user.plataforma === 'ios' || user.plataforma === 'android') ) {
            validateErrors.push ( { field: 'plataforma', message: 'validation_invalid' } );
        }
    } else {
        // Error si no se ha podido obtener la plataforma
        validateErrors.push ( { field: 'plataforma', message: 'validation_invalid' } );
    }
    // Si hay algún error devolvemos => code:422 con el array que los contiene
    if ( validateErrors.length > 0 ) {
        return cb ( { code: 422, errors: validateErrors } );
    }

    // Si no tengo usuario le creo el Token directamente
    if ( ! user.usuario ) {
        return create ();
    }

    // Compruebo si existe el usuario
    Usuario.exists ( user.usuario, function ( err, exists ) {
        if ( err ) {
            return cb ( err );
        }
        // Si no existe devolvemos => code:404 con mensaje 'usuario no encontrado'
        if ( ! exists ) {
            return cb ( { code: 404, message: 'users_user_not_found' } );
        }
        // Creo el 'Token' si existe
        return create ();
    } );

    // Función create => almacena nueva fecha y Token
    function create () {
        user.createDate = new Date ();
        new PushToken ( user ).save ( cb );
    }
};


// exportar el modelo creado
var PushToken = mongoose.model ( 'PushToken', pushTokenSchema );

module.exports = PushToken;
