/**
 * Created by Piercing on 2/10/15.
 */
"use strict";

var express  = require ( 'express' );
var router   = express.Router ();
var mongoose = require ( 'mongoose' );
var Usuario  = mongoose.model ( 'Usuario' );
var jwt      = require ( 'jsonwebtoken' );
var config   = require ( '../../config' );
var hash     = require ( 'hash.js' );
var errors   = require ( '../../lib/errors' );

// Autenticar credenciales usuario
// POST /apiv1/authenticate
router.post ( '/', function ( req, res ) {

    var validatePass = req.body.clave;
    var email        = req.body.email;

    // Busco un usuario por su e-mail
    Usuario.findOne ( { email: email }, function ( err, user ) {
        // Si hay error, devolver error
        if ( err ) {
            return errors ( err, req.lang ).json ( res );
        }
        // Si el usuario no se encuntra, res: error => 401, no encontrado
        if ( ! user ) {
            return errors ( { code: 401, message: 'users_user_not_found' }, req.lang ).json ( res );
        }
        // Si se encuentra el usuario:
        else if ( user ) {
            // codificar la clave candidata y comparar los hashes
            validatePass = hash.sha256 ().update ( validatePass ).digest ( 'hex' );

            // compruebo clave candidata con clave de la BBDD del usuario encontrado
            if ( user.clave !== validatePass ) {
                return errors ( { code: 401, message: 'users_wrong_password' }, req.lang ).json ( res );
            }
            // compruebo el email
            if ( user.email !== email ) {
                return errors ( { code: 401, message: 'user_email_duplicated' }, req.lang ).json ( res );
            }
            else {
                // Si encuetro el user y su clave y email son correctos creo el token
                var token = jwt.sign ( { user: user }, config.jwt.secret, {
                    expiresInMinutes: config.jwt.expiresInMinutes
                } );

                // Devuelvo la información del token en formato JSON
                return res.json ( {
                    ok     : true,
                    message: 'Enjoy your token!',
                    token  : token
                } );
            }
        }
    } );
} );

module.exports = router;