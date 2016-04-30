/**
 * Created by Piercing on 29/9/15.
 */

"use strict";

var mongoose  = require ( 'mongoose' );
var hash      = require ( 'hash.js' );
var validator = require ( 'validator' );

// definir esquema de Usuario
var usuarioSchema = mongoose.Schema ( {
    nombre: { type: String, index: true },
    email : { type: String, index: true },
    clave : String
} );

/**
 * Return true if user exists
 * @param iduser
 * @param cb
 */
usuarioSchema.statics.exists = function ( iduser, cb ) {
    Usuario.findById ( iduser, function ( err, user ) {
        if ( err ) {
            return cb ( err );
        }
        // Si el usuario no existe => error
        if ( ! user ) {
            return cb ( null, false );
        }
        // Si existe => true
        return cb ( null, true );
    } );
};

/**
 *
 * @param user
 * @param cb
 * @returns {*}
 */
usuarioSchema.statics.register = function ( user, cb ) {

    var validateErrors = [];

    // Hacemos las validaciones //

    // Error en el nombre, máximo dos parametros y comprueba el 'locale' => 'locale = locale || 'en-US';'
    if ( ! (validator.isAlpha ( user.nombre ) && validator.isLength ( user.nombre, 2 )) ) {
        validateErrors.push ( { field: 'nombre', message: 'validation_invalid' } );
    }
    // Error en el email
    if ( ! validator.isEmail ( user.email ) ) {
        validateErrors.push ( { field: 'email', message: 'validation_invalid' } );
    }
    // Error logitud clave, mínimo 6 caracteres
    if ( ! validator.isLength ( user.clave, 6 ) ) {
        validateErrors.push ( {
            field  : 'clave',
            message: { template: 'validation_mininchars', values: { num: '6' } }
        } );
    }
    // Si hay algún error devolvemos => code:402 con el array que los contiene
    if ( validateErrors.length > 0 ) {
        return cb ( { code: 422, errors: validateErrors } );
    }

    // Buscamos usuarios por el email y comprobamos si hay duplicidades
    Usuario.findOne ( { email: user.email }, function ( err, shearchUsers ) {
        // Si hay error lo devolvemos
        if ( err ) {
            return cb ( err );
        }
        // Si el usuario existe devolvemos => code: 409 => 'email usuario duplicado'
        if ( shearchUsers ) {
            return cb ( { code: 409, message: 'user_email_duplicated' } );

            // Si no hay error y el usuario no existe:
        } else {
            // Codifico la clave mediante 'hash'
            user.clave = hash.sha256 ().update ( user.clave ).digest ( 'hex' );

            // Por último almaceno el nuevo usuario
            new Usuario ( user ).save ( cb );
        }
    } );
};

// exportar el modelo creado
var Usuario    = mongoose.model ( 'Usuario', usuarioSchema );
module.exports = Usuario;