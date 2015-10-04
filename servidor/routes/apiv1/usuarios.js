/**
 * Created by Piercing on 29/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sha = require('sha256');

// requiero el modelo 'Usuario'
var Usuario = require('../../models/Usuario');
// requiero mensajes de error
var msgError = require('../../datosConfig/mensajesError');


// crea un usuario
// POST /apiv1/usuarios
router.post('/', function (req, res, next) {

    //if (req.body === 'undefined') {

    // Control de errores
    if (req.body.nombre === 'undefined')
        return next({controlError: msgError['usuario_02']});

    if (req.body.email === 'undefined')
        return next({controlError: msgError['usuario_03']});

    if (req.body.clave === 'undefined')
        return next({controlError: msgError['usuario_04']});

    // codificado la clave del usuario que recibo por el body
    var clavesSHA = sha('sha256', req.body.clave);
    // req parámetros del nuevo usuario con clave cifrada del body
    var usuarioCifrado = {nombre: req.body.nombre, email: req.body.email, clave: clavesSHA};

    // crear un registro de usuario
    var usuario = new Usuario(usuarioCifrado);
    // guardo el nuevo usuario
    usuario.save(function (err, guardado) {
        if (err) {
            return next(err);
        }
        // devolver una confirmación
        return res.json({ok: true, usuario: guardado});
    });
    //} else return next({controlError: msgError['usuario_05']});
});


module.exports = router;