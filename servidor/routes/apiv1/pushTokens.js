/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

let express = require('express');
let router = express.Router();

// requiero el modelo 'pushToken'
let PushToken = require('../../models/PushToken');
// requiero mensajes de error
var msgError = require('../../datosConfig/mensajesError');

router.post('/', function (req, res, next) {

    // crear ruta pushToken
    console.log(req.body);
    let pushToken = new PushToken(req.body);
    pushToken.save(function (err, Token) {
        if (err) {
            return next({controlError: msgError['errorToken']});
        }
        //devolver confirmación
        res.json({ok: true, token: Token});
    });
});

module.exports = router;