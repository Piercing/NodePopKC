/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express  = require ( 'express' );
var router   = express.Router ();
var mongoose = require ( 'mongoose' );
var Usuario  = mongoose.model ( 'Usuario' );
var errors   = require ( '../../lib/errors' );
var lang = require('../../lib/lang');

// Registar usuario
// POST /apiv1/usuarios/register
router.post ( '/register', function ( req, res ) {

    var newUser = {
        nombre: req.body.nombre,
        email : req.body.email,
        clave : req.body.clave
    };

    Usuario.register ( newUser, function ( err ) {
        if ( err ) {
            return errors ( err, req.lang ).json ( res );
        }
        // Usuario creado
        return res.json ( {
            ok     : true,
            message: lang.translate ( 'users_user_created' )
        } );
    } );
} );


module.exports = router;