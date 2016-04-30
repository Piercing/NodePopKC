/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express   = require ( 'express' );
var router    = express.Router ();
var mongoose  = require ( 'mongoose' );
var PushToken = mongoose.model ( 'PushToken' );
var msgError  = require ( '../../lib/errors' );

router.post ( '/', function ( req, res ) {

    console.log ( req.body );

    var newUser = {
        token     : req.body.pushtoken,
        usuario   : req.body.idusuario || undefined,
        plataforma: req.body.plataforma
    };

    PushToken.register ( newUser, ( err, token )=> {
        if ( err ) {
            return msgError ( err, req.lang ).json ( res );
        }
        // Devolver confirmación token creado => Ok
        return res.json ( { ok: true, token: token } );
    } );
} );


module.exports = router;