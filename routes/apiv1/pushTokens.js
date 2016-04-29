/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express = require ( 'express' );
var router  = express.Router ();

let mongoose = require ( 'mongoose' );
// requiero el modelo 'pushToken'
var PushToken = mongoose.model ( 'PushToken' );
// requiero mensajes de error
var msgError = require ( '../../lib/errors' );

router.post ( '/', function ( req, res ) {

    // crear ruta pushToken
    console.log ( req.body );

    var nuevo = {
        token     : req.body.pushtoken,
        usuario   : req.body.idusuario || undefined,
        plataforma: req.body.plataforma
    };

    PushToken.save ( nuevo, ( err, token )=> {
        if ( err ) {
            return errors ( err, req.lang ).json ( res );
        }
        // Devolver confirmación
        return res.json ( { ok: true, token: token } );
    } );
} );


module.exports = router;