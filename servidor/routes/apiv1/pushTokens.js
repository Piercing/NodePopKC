/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

// requiero el modelo 'pushToken'
var PushToken = require('../../models/PushToken');
// requiero mensajes de error
var msgError = require('../../datosConfig/mensajesError');

router.post('/', function (req, res, next) {

    // crear ruta pushToken
    console.log(req.body);
    var pushToken = new PushToken(req.body);
    pushToken.save(function (err, Token) {
        if (err) {
            return next({controlError: msgError['errorToken']});
        }
        //devolver confirmación
        res.json({ok: true, token: Token});
    });
});

module.exports = router;